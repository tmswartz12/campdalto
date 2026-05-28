"use client";
// Commissioner's control panel — only accessible with the admin password.
// Set points, adjust by delta, or reset. The scoreboard on the main site
// auto-refreshes and will pick up any changes within 15 seconds.

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Plus, Minus, RotateCcw, LogOut } from "lucide-react";
import { TEAMS, SCORING, SCORING_BONUSES } from "@/lib/content";
import { useRouter } from "next/navigation";

type Scores = Record<string, number>;

export default function AdminPage() {
  const router = useRouter();
  const [scores, setScores] = useState<Scores>(() =>
    Object.fromEntries(TEAMS.map((t) => [t.id, 0]))
  );
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const flash = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2500);
  };

  const fetchScores = useCallback(async () => {
    const res = await fetch("/api/scores", { cache: "no-store" });
    if (res.ok) setScores(await res.json());
  }, []);

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  async function patch(body: object) {
    setLoading(true);
    try {
      const res = await fetch("/api/scores", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setScores(await res.json());
        flash("Saved");
      } else {
        flash("Error — check the console.");
      }
    } finally {
      setLoading(false);
    }
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
              Changes propagate to the live board within 15 seconds.
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
              onClick={() => {
                if (confirm("Reset ALL scores to 0? This cannot be undone.")) {
                  patch({ reset: true });
                }
              }}
              className="flex items-center gap-1.5 text-clay hover:text-clay/80 text-[12px] font-body font-medium transition-colors border border-clay/40 hover:border-clay px-3 py-2 rounded-lg"
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
        {msg && (
          <div className="mb-6 inline-flex items-center gap-2 bg-ink text-bone px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulseSoft" />
            {msg}
          </div>
        )}

        {/* Team score cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {TEAMS.map((team, i) => (
            <div
              key={team.id}
              className="bg-paper border border-ink/8 rounded-2xl overflow-hidden"
            >
              <div className="h-1 w-full" style={{ background: team.color }} aria-hidden="true" />
              <div className="p-5">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                      Team 0{i + 1}
                    </p>
                    <h2 className="display text-xl font-semibold text-ink tracking-editorial leading-tight">
                      {team.name}
                    </h2>
                  </div>
                  <span className="display text-5xl font-semibold text-ink tabular-nums leading-none">
                    {scores[team.id] ?? 0}
                  </span>
                </div>

                {/* Quick-adjust chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {quickDeltas.map((d) => (
                    <button
                      key={d}
                      disabled={loading}
                      onClick={() => patch({ teamId: team.id, delta: d })}
                      className="text-[11px] font-mono uppercase tracking-[0.1em] px-2.5 py-1 rounded-md border border-ink/15 text-ink/80 hover:bg-ink hover:text-bone hover:border-ink transition-colors disabled:opacity-40"
                    >
                      +{d}
                    </button>
                  ))}
                </div>

                {/* +/- and set */}
                <div className="flex gap-2">
                  <button
                    disabled={loading}
                    onClick={() => patch({ teamId: team.id, delta: -10 })}
                    className="flex items-center gap-1 px-3 py-2 bg-bone border border-ink/15 hover:border-ink/40 text-ink/80 rounded-lg text-[12px] font-body font-medium transition-colors disabled:opacity-40"
                  >
                    <Minus size={12} /> 10
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => patch({ teamId: team.id, delta: 10 })}
                    className="flex items-center gap-1 px-3 py-2 bg-bone border border-ink/15 hover:border-ink/40 text-ink/80 rounded-lg text-[12px] font-body font-medium transition-colors disabled:opacity-40"
                  >
                    <Plus size={12} /> 10
                  </button>
                  <SetScoreInput
                    teamId={team.id}
                    current={scores[team.id] ?? 0}
                    onSet={(v) => patch({ teamId: team.id, value: v })}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

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
                <p className="font-mono text-[12px] text-ink/70 tabular-nums">
                  +{b.points}
                </p>
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
  useEffect(() => setVal(String(current)), [current]);

  return (
    <div className="flex gap-1 flex-1">
      <input
        type="number"
        value={val}
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
