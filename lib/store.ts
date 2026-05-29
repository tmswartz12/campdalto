// Live scoreboard storage.
//
// Production: Vercel Blob — JSON documents under `campdalto/`:
//   - scores.json   : team totals (driven by manual +/- and by results deltas)
//   - results.json  : per-event placements (1st/2nd/3rd/4th by team id)
// Writes use put() with allowOverwrite + addRandomSuffix:false so pathnames
// stay stable. Reads cache-bust the URL to defeat CDN edge caching after a
// write. After every write we return the just-written state directly instead
// of re-reading, so the admin response is always the truth even if the CDN
// hasn't picked up the new object yet.
//
// Local dev (or when BLOB_READ_WRITE_TOKEN is unset): falls back to an
// in-memory store. Per-process state, resets on restart.

import {
  TEAMS,
  PLACEMENT_KEYS,
  SCOREABLE_EVENTS,
  CIG_CHALLENGE,
  pointsForEvent,
  type EventPlacements,
  type ResultsMap,
} from "@/lib/content";

type Scores = Record<string, number>;
/** Cigs remaining per team. Missing entry = "not tracked yet" (no penalty). */
export type CigsRemaining = Record<string, number>;

const SCORES_PATH = "campdalto/scores.json";
const RESULTS_PATH = "campdalto/results.json";
const CIGS_PATH = "campdalto/cigs.json";
const hasBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const memoryScores: Scores = {};
let memoryResults: ResultsMap = {};
let memoryCigs: CigsRemaining = {};

function withDefaults(partial: Scores): Scores {
  const out: Scores = {};
  for (const team of TEAMS) out[team.id] = partial[team.id] ?? 0;
  return out;
}

// -- generic blob helpers ----------------------------------------------------

async function readBlobJson<T>(path: string, fallback: T): Promise<T> {
  const { list } = await import("@vercel/blob");
  const { blobs } = await list({ prefix: path });
  const entry = blobs.find((b) => b.pathname === path);
  if (!entry) return fallback;
  // Cache-bust the CDN URL — Blob's public URL is edge-cached and can return
  // stale JSON for a few seconds after an overwrite.
  const bustedUrl = `${entry.url}?_=${Date.now()}`;
  const res = await fetch(bustedUrl, { cache: "no-store" });
  if (!res.ok) return fallback;
  try {
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

async function writeBlobJson(path: string, data: unknown): Promise<void> {
  const { put } = await import("@vercel/blob");
  await put(path, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

// -- scores ------------------------------------------------------------------

async function readScores(): Promise<Scores> {
  if (!hasBlob) return { ...memoryScores };
  const raw = await readBlobJson<Scores>(SCORES_PATH, {});
  const normalized: Scores = {};
  for (const k of Object.keys(raw)) normalized[k] = Number(raw[k]) || 0;
  return normalized;
}

async function writeScores(scores: Scores): Promise<void> {
  if (!hasBlob) {
    for (const k of Object.keys(scores)) memoryScores[k] = scores[k];
    return;
  }
  await writeBlobJson(SCORES_PATH, scores);
}

export async function getScores(): Promise<Scores> {
  return withDefaults(await readScores());
}

export async function adjustScore(teamId: string, delta: number): Promise<Scores> {
  const d = Math.round(delta);
  const current = await readScores();
  const next = withDefaults({ ...current, [teamId]: (current[teamId] ?? 0) + d });
  await writeScores(next);
  return next;
}

export async function setScore(teamId: string, value: number): Promise<Scores> {
  const v = Math.round(value);
  const current = await readScores();
  const next = withDefaults({ ...current, [teamId]: v });
  await writeScores(next);
  return next;
}

export async function resetScores(): Promise<Scores> {
  const zeroed = withDefaults({});
  await writeScores(zeroed);
  // Wipe results + cigs too — totals and their backing state should never drift on a reset.
  await Promise.all([writeResults({}), writeCigs({})]);
  return zeroed;
}

// -- results -----------------------------------------------------------------

async function readResults(): Promise<ResultsMap> {
  if (!hasBlob) return { ...memoryResults };
  return await readBlobJson<ResultsMap>(RESULTS_PATH, {});
}

async function writeResults(results: ResultsMap): Promise<void> {
  if (!hasBlob) {
    memoryResults = { ...results };
    return;
  }
  await writeBlobJson(RESULTS_PATH, results);
}

export async function getResults(): Promise<ResultsMap> {
  return await readResults();
}

/**
 * Compute the per-team point delta a placement set is worth, given a points array.
 * Returns an object mapping teamId → points (negative when subtracting a prior result).
 * For bonuses, `points` is [bonusPoints, 0, 0, 0] so only the winning tribe scores.
 */
function placementDelta(
  placements: EventPlacements,
  points: readonly [number, number, number, number],
  sign: 1 | -1,
): Record<string, number> {
  const out: Record<string, number> = {};
  PLACEMENT_KEYS.forEach((key, idx) => {
    const teamId = placements[key];
    if (!teamId) return;
    const pts = points[idx];
    if (!pts) return;
    out[teamId] = (out[teamId] ?? 0) + sign * pts;
  });
  return out;
}

function sanitizePlacements(p: EventPlacements): EventPlacements {
  const validTeamIds = new Set(TEAMS.map((t) => t.id));
  const clean: EventPlacements = {};
  for (const key of PLACEMENT_KEYS) {
    const v = p[key];
    if (typeof v === "string" && validTeamIds.has(v)) clean[key] = v;
  }
  return clean;
}

export interface PlacementsResult {
  scores: Scores;
  results: ResultsMap;
}

/**
 * Save placements for an event. Computes the delta against any prior placements
 * for the same event and rolls it into team totals atomically. Re-saving with
 * the same teams is a no-op; swapping teams correctly subtracts the old award
 * and adds the new one.
 */
export async function setPlacements(
  eventId: string,
  placements: EventPlacements,
): Promise<PlacementsResult> {
  const event = SCOREABLE_EVENTS.find((e) => e.id === eventId);
  if (!event) throw new Error(`Unknown scoreable event: ${eventId}`);
  const points = pointsForEvent(event);
  if (!points) throw new Error(`Event ${eventId} has no points configured`);

  const clean = sanitizePlacements(placements);
  const [currentScores, currentResults] = await Promise.all([readScores(), readResults()]);

  const previous = currentResults[eventId] ?? {};
  const subtract = placementDelta(previous, points, -1);
  const add = placementDelta(clean, points, +1);

  const nextScores: Scores = { ...currentScores };
  for (const [teamId, pts] of Object.entries(subtract)) {
    nextScores[teamId] = (nextScores[teamId] ?? 0) + pts;
  }
  for (const [teamId, pts] of Object.entries(add)) {
    nextScores[teamId] = (nextScores[teamId] ?? 0) + pts;
  }

  const nextResults: ResultsMap = { ...currentResults };
  if (Object.keys(clean).length === 0) {
    delete nextResults[eventId];
  } else {
    nextResults[eventId] = clean;
  }

  const normalized = withDefaults(nextScores);
  await Promise.all([writeScores(normalized), writeResults(nextResults)]);
  return { scores: normalized, results: nextResults };
}

/** Clear all placements for one event and refund the points it awarded. */
export async function clearPlacements(eventId: string): Promise<PlacementsResult> {
  return setPlacements(eventId, {});
}

// -- cig challenge -----------------------------------------------------------

async function readCigs(): Promise<CigsRemaining> {
  if (!hasBlob) return { ...memoryCigs };
  const raw = await readBlobJson<CigsRemaining>(CIGS_PATH, {});
  const normalized: CigsRemaining = {};
  for (const k of Object.keys(raw)) {
    const n = Number(raw[k]);
    if (Number.isFinite(n)) normalized[k] = clampCigs(n);
  }
  return normalized;
}

async function writeCigs(cigs: CigsRemaining): Promise<void> {
  if (!hasBlob) {
    memoryCigs = { ...cigs };
    return;
  }
  await writeBlobJson(CIGS_PATH, cigs);
}

function clampCigs(n: number): number {
  const r = Math.round(n);
  if (r < 0) return 0;
  if (r > CIG_CHALLENGE.packSize) return CIG_CHALLENGE.packSize;
  return r;
}

export async function getCigs(): Promise<CigsRemaining> {
  return await readCigs();
}

export interface CigsResult {
  scores: Scores;
  cigs: CigsRemaining;
}

/**
 * Record a team's cigs remaining and roll the penalty delta into team totals.
 * Re-saving is safe — only the difference between the new and prior penalty
 * is applied, so the same team can be edited any number of times.
 */
export async function setCigsForTeam(teamId: string, remaining: number): Promise<CigsResult> {
  const validTeamIds = new Set(TEAMS.map((t) => t.id));
  if (!validTeamIds.has(teamId)) throw new Error(`Unknown team: ${teamId}`);
  const next = clampCigs(remaining);

  const [currentScores, currentCigs] = await Promise.all([readScores(), readCigs()]);
  const prior = currentCigs[teamId];
  const priorPenalty = (prior ?? 0) * CIG_CHALLENGE.penaltyPerCig;
  const nextPenalty = next * CIG_CHALLENGE.penaltyPerCig;
  // Penalty subtracts from the team's score; applying the delta means
  // ADDING back the prior penalty (refund) and SUBTRACTING the new one.
  const scoreDelta = priorPenalty - nextPenalty;

  const nextScores: Scores = { ...currentScores };
  nextScores[teamId] = (nextScores[teamId] ?? 0) + scoreDelta;
  const normalized = withDefaults(nextScores);

  const nextCigs: CigsRemaining = { ...currentCigs, [teamId]: next };
  await Promise.all([writeScores(normalized), writeCigs(nextCigs)]);
  return { scores: normalized, cigs: nextCigs };
}

/** Forget a team's cig entry and refund any penalty already applied. */
export async function clearCigsForTeam(teamId: string): Promise<CigsResult> {
  const [currentScores, currentCigs] = await Promise.all([readScores(), readCigs()]);
  if (!(teamId in currentCigs)) {
    return { scores: withDefaults(currentScores), cigs: currentCigs };
  }
  const priorPenalty = currentCigs[teamId] * CIG_CHALLENGE.penaltyPerCig;

  const nextScores: Scores = { ...currentScores };
  nextScores[teamId] = (nextScores[teamId] ?? 0) + priorPenalty;
  const normalized = withDefaults(nextScores);

  const nextCigs: CigsRemaining = { ...currentCigs };
  delete nextCigs[teamId];
  await Promise.all([writeScores(normalized), writeCigs(nextCigs)]);
  return { scores: normalized, cigs: nextCigs };
}
