// Live scoreboard storage.
//
// Production: Vercel Blob — a single JSON document at `campdalto/scores.json`.
// Writes use put() with allowOverwrite + addRandomSuffix:false so the pathname
// stays stable. Reads cache-bust the URL to defeat CDN edge caching after a
// write. After every write we return the just-written state directly instead
// of re-reading, so the admin response is always the truth even if the CDN
// hasn't picked up the new object yet.
//
// Local dev (or when BLOB_READ_WRITE_TOKEN is unset): falls back to an
// in-memory store. Per-process state, resets on restart.

import { TEAMS } from "@/lib/content";

type Scores = Record<string, number>;

const BLOB_PATH = "campdalto/scores.json";
const hasBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const memory: Scores = {};

function withDefaults(partial: Scores): Scores {
  const out: Scores = {};
  for (const team of TEAMS) out[team.id] = partial[team.id] ?? 0;
  return out;
}

async function readFromBlob(): Promise<Scores> {
  const { list } = await import("@vercel/blob");
  const { blobs } = await list({ prefix: BLOB_PATH });
  const entry = blobs.find((b) => b.pathname === BLOB_PATH);
  if (!entry) return {};
  // Cache-bust the CDN URL — Blob's public URL is edge-cached and can return
  // stale JSON for a few seconds after an overwrite.
  const bustedUrl = `${entry.url}?_=${Date.now()}`;
  const res = await fetch(bustedUrl, { cache: "no-store" });
  if (!res.ok) return {};
  try {
    const data = (await res.json()) as Scores;
    const normalized: Scores = {};
    for (const k of Object.keys(data)) normalized[k] = Number(data[k]) || 0;
    return normalized;
  } catch {
    return {};
  }
}

async function writeToBlob(scores: Scores): Promise<void> {
  const { put } = await import("@vercel/blob");
  await put(BLOB_PATH, JSON.stringify(scores), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

export async function getScores(): Promise<Scores> {
  if (hasBlob) return withDefaults(await readFromBlob());
  return withDefaults(memory);
}

export async function adjustScore(teamId: string, delta: number): Promise<Scores> {
  const d = Math.round(delta);
  if (hasBlob) {
    const current = await readFromBlob();
    const next = withDefaults({ ...current, [teamId]: (current[teamId] ?? 0) + d });
    await writeToBlob(next);
    return next;
  }
  memory[teamId] = (memory[teamId] ?? 0) + d;
  return withDefaults(memory);
}

export async function setScore(teamId: string, value: number): Promise<Scores> {
  const v = Math.round(value);
  if (hasBlob) {
    const current = await readFromBlob();
    const next = withDefaults({ ...current, [teamId]: v });
    await writeToBlob(next);
    return next;
  }
  memory[teamId] = v;
  return withDefaults(memory);
}

export async function resetScores(): Promise<Scores> {
  const zeroed = withDefaults({});
  if (hasBlob) {
    await writeToBlob(zeroed);
    return zeroed;
  }
  for (const t of TEAMS) memory[t.id] = 0;
  return withDefaults(memory);
}
