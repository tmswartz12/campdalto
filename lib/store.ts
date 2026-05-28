// Live scoreboard storage.
//
// In production on Vercel: add a KV (Upstash Redis) store and connect it to the
// project — Vercel injects KV_REST_API_URL / KV_REST_API_TOKEN automatically and
// scores become shared + real-time across every device.
//
// In local dev (or before KV is connected): falls back to an in-memory store so
// everything still works. Note: in-memory state is per-process, so it resets on
// restart and won't sync across serverless instances — that's why KV matters in prod.

import { TEAMS } from "@/lib/content";

type Scores = Record<string, number>;

const KEY = "campdalto:scores";
const hasKV = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// Lazy-load @vercel/kv only when configured, so local dev doesn't need it.
let kvClient: typeof import("@vercel/kv").kv | null = null;
async function getKV() {
  if (!hasKV) return null;
  if (!kvClient) kvClient = (await import("@vercel/kv")).kv;
  return kvClient;
}

// In-memory fallback for local dev.
const memory: Scores = {};

function withDefaults(partial: Scores): Scores {
  const out: Scores = {};
  for (const team of TEAMS) out[team.id] = partial[team.id] ?? 0;
  return out;
}

export async function getScores(): Promise<Scores> {
  const kv = await getKV();
  if (kv) {
    const stored = (await kv.hgetall<Scores>(KEY)) ?? {};
    const normalized: Scores = {};
    for (const k of Object.keys(stored)) normalized[k] = Number(stored[k]) || 0;
    return withDefaults(normalized);
  }
  return withDefaults(memory);
}

export async function adjustScore(teamId: string, delta: number): Promise<Scores> {
  const d = Math.round(delta);
  const kv = await getKV();
  if (kv) await kv.hincrby(KEY, teamId, d);
  else memory[teamId] = (memory[teamId] ?? 0) + d;
  return getScores();
}

export async function setScore(teamId: string, value: number): Promise<Scores> {
  const v = Math.round(value);
  const kv = await getKV();
  if (kv) await kv.hset(KEY, { [teamId]: v });
  else memory[teamId] = v;
  return getScores();
}

export async function resetScores(): Promise<Scores> {
  const kv = await getKV();
  if (kv) await kv.hset(KEY, Object.fromEntries(TEAMS.map((t) => [t.id, 0])));
  else for (const t of TEAMS) memory[t.id] = 0;
  return getScores();
}
