"use client";
// Commissioner's control panel — only accessible with the admin password.
// Set points, adjust by delta, or reset. Optimistic UI: the number bumps the
// instant you click, then settles with whatever the server confirmed. On
// failure we revert and flash the error. The public scoreboard polls every
// 15s and will pick up the change.

import { useState, useEffect, useCallback, useRef } from "react";
import { RefreshCw, Plus, Minus, RotateCcw, LogOut, Loader2 } from "lucide-react";
import { TEAMS, SCORING, SCORING_BONUSES } from "@/lib/content";
import { useRouter } from "next/navigation";
import EventResultsPanel from "./EventResultsPanel";
import CigChallengePanel from "./CigChallengePanel";

type Scores = Record<string, number>;
type FlashKind = "ok" | "err" | null;

const ZERO_SCORES: Scores = Object.fromEntries(TEAMS.map((t) => [t.id, 0]));

interface Props {
  cigChallengeEnabled: boolean;
}

export default function AdminClient({ cigChallengeEnabled }: Props) {
  const router = useRouter();
  const [scores, setScores] = useState<Scores>(ZERO_SCORES);
  const [pendingTeam, setPendingTeam] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);
  const [flash, setFlash] = useState<{ text: string; kind: FlashKind }>({ text: "", kind: null });
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showFlash = useCallback((text: string, kind: FlashKind) => {
    if (flashTimer.current) clearTimeout(flashTimer.current);
    setFlash({ text, kind });
    flashTimer.current = setTimeout(() => setFlash({ text: "", kind: null }), 2500);
  }, []);

  const fetchScores = useCallback(async () => {
    const res = await fetch("/api/scores", { cache: "no-store" });
    if (res.ok) setScores(await res.json());
  }, []);

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  // Single source of truth for sending a score change. Optimistically updates
  // local state, then reconciles with the server response. Reverts on error.
  async function patch(
    body: { teamId?: string; delta?: number; value?: number; reset?: boolean },
    optimistic: Scores,
  ) {
    const previous = scores;
    setScores(optimistic);
    if (body.teamId) setPendingTeam(body.teamId);
    if (body.reset) setResetting(true);

    try {
      const res = await fetch("/api/scores", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const confirmed: Scores = await res.json();
      setScores(confirmed);
      showFlash(body.reset ? "All scores reset" : "Saved", "ok");
    } catch (err) {
      setScores(previous);
      showFlash("Failed to save — try again", "err");
      console.error("Score update failed", err);
    } finally {
      setPendingTeam(null);
      setResetting(false);
    }
  }

  function bump(teamId: string, delta: number) {
    const next = { ...scores, [teamId]: (scores[teamId] ?? 0) + delta };
    patch({ teamId, delta }, next);
  }

  function setTo(teamId: string, value: number) {
    const next = { ...scores, [teamId]: value };
    patch({ teamId, value }, next);
  }

  function resetAll() {
    if (!confirm("Reset ALL scores to 0? This cannot be undone.")) return;
    patch({ reset: true }, ZERO_SCORES);
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const quickDeltas = [5, 10, 15, 20, 25, 30, 40, 60, 70, 100];

  return (
    <main className="min-h-screen bg-bone text-ink p-5 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex items-start justify-between gap-6 flex-wrap mb-10 pb-6 border-b border-ink/8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-clay mb-2">
              Commissioner Panel
            </p>
            <h1 className="display text-3xl md:text-4xl font-semibold text-ink tracking-editorial">
              Scoreboard control
            </h1>
            <p className="mt-2 text-sm text-muted">
              Changes save instantly to the Blob store. The public board polls every 15s.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchScores}
              className="flex items-center gap-1.5 text-ink/70 hover:text-ink text-[12px] font-body font-medium transition-colors border border-ink/15 hover:border-ink/40 px-3 py-2 rounded-lg"
            >
              <RefreshCw size={13} /> Refresh
            </button>
            <button
              onClick={resetAll}
              disabled={resetting}
              className="flex items-center gap-1.5 text-clay hover:text-clay/80 text-[12px] font-body font-medium transition-colors border border-clay/40 hover:border-clay px-3 py-2 rounded-lg disabled:opacity-40"
            >
              <RotateCcw size={13} /> Reset all
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-ink/70 hover:text-ink text-[12px] font-body font-medium transition-colors border border-ink/15 hover:border-ink/40 px-3 py-2 rounded-lg"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </header>

        {/* Status flash */}
        {flash.kind && (
          <div
            className={`mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.2em] ${
              flash.kind === "ok"
                ? "bg-ink text-bone"
                : "bg-clay text-bone"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                flash.kind === "ok" ? "bg-clay animate-pulseSoft" : "bg-bone"
              }`}
            />
            {flash.text}
          </div>
        )}

        {/* Team score cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {TEAMS.map((team, i) => {
            const isPending = pendingTeam === team.id;
            return (
              <div
                key={team.id}
                className={`bg-paper border rounded-2xl overflow-hidden transition-colors ${
                  isPending ? "border-ink/40" : "border-ink/8"
                }`}
              >
                <div className="h-1 w-full" style={{ background: team.color }} aria-hidden="true" />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1 flex items-center gap-2">
                        <span>{team.emoji}</span> Team 0{i + 1}
                        {isPending && (
                          <Loader2 size={11} className="animate-spin text-ink/40" />
                        )}
                      </p>
                      <h2 className="display text-xl font-semibold text-ink tracking-editorial leading-tight">
                        {team.name}
                      </h2>
                    </div>
                    <span
                      className={`display text-5xl font-semibold tabular-nums leading-none transition-colors ${
                        isPending ? "text-clay" : "text-ink"
                      }`}
                    >
                      {scores[team.id] ?? 0}
                    </span>
                  </div>

                  {/* Quick-adjust chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {quickDeltas.map((d) => (
                      <button
                        key={d}
                        disabled={isPending}
                        onClick={() => bump(team.id, d)}
                        className="text-[11px] font-mono uppercase tracking-[0.1em] px-2.5 py-1 rounded-md border border-ink/15 text-ink/80 hover:bg-ink hover:text-bone hover:border-ink transition-colors disabled:opacity-40"
                      >
                        +{d}
                      </button>
                    ))}
                  </div>

                  {/* +/- and set */}
                  <div className="flex gap-2">
                    <button
                      disabled={isPending}
                      onClick={() => bump(team.id, -10)}
                      className="flex items-center gap-1 px-3 py-2 bg-bone border border-ink/15 hover:border-ink/40 text-ink/80 rounded-lg text-[12px] font-body font-medium transition-colors disabled:opacity-40"
                    >
                      <Minus size={12} /> 10
                    </button>
                    <button
                      disabled={isPending}
                      onClick={() => bump(team.id, 10)}
                      className="flex items-center gap-1 px-3 py-2 bg-bone border border-ink/15 hover:border-ink/40 text-ink/80 rounded-lg text-[12px] font-body font-medium transition-colors disabled:opacity-40"
                    >
                      <Plus size={12} /> 10
                    </button>
                    <SetScoreInput
                      teamId={team.id}
                      current={scores[team.id] ?? 0}
                      onSet={(v) => setTo(team.id, v)}
                      disabled={isPending}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Event results — pick 1st/2nd/3rd/4th, auto-applies tier points */}
        <EventResultsPanel onScoresChange={setScores} onFlash={showFlash} />

        {/* Cig Challenge — feature-flagged via CIG_CHALLENGE_ENABLED */}
        {cigChallengeEnabled && (
          <CigChallengePanel onScoresChange={setScores} onFlash={showFlash} />
        )}

        {/* Scoring reference */}
        <div className="bg-paper border border-ink/8 rounded-2xl p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-4">
            Scoring reference
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {SCORING.map((tier) => (
              <div key={tier.id}>
                <p className="display text-base font-semibold text-ink mb-1">{tier.label}</p>
                <p className="font-mono text-[12px] text-ink/70 tabular-nums">
                  {tier.points.join(" · ")}
                </p>
                <p className="text-[12px] text-muted mt-1 leading-snug">{tier.note}</p>
              </div>
            ))}
            {SCORING_BONUSES.map((b) => (
              <div key={b.id}>
                <p className="display text-base font-semibold text-ink mb-1">{b.label}</p>
                <p className="font-mono text-[12px] text-ink/70 tabular-nums">+{b.points}</p>
                <p className="text-[12px] text-muted mt-1 leading-snug">{b.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function SetScoreInput({
  teamId,
  current,
  onSet,
  disabled,
}: {
  teamId: string;
  current: number;
  onSet: (v: number) => void;
  disabled: boolean;
}) {
  const [val, setVal] = useState(String(current));
  // Sync the input when the server-confirmed score changes, unless the user
  // is currently editing (focus held).
  const isFocused = useRef(false);
  useEffect(() => {
    if (!isFocused.current) setVal(String(current));
  }, [current]);

  return (
    <div className="flex gap-1 flex-1">
      <input
        type="number"
        value={val}
        onFocus={() => (isFocused.current = true)}
        onBlur={() => (isFocused.current = false)}
        onChange={(e) => setVal(e.target.value)}
        className="flex-1 min-w-0 bg-bone border border-ink/15 rounded-lg text-ink text-[13px] font-mono tabular-nums px-3 py-2 focus:outline-none focus:border-ink/50"
        aria-label={`Set score for ${teamId}`}
      />
      <button
        disabled={disabled}
        onClick={() => {
          const n = parseInt(val, 10);
          if (!isNaN(n)) onSet(n);
        }}
        className="px-3 py-2 bg-ink hover:bg-forest text-bone rounded-lg text-[12px] font-body font-semibold transition-colors disabled:opacity-40"
      >
        Set
      </button>
    </div>
  );
}
