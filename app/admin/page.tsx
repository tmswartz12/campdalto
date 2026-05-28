"use client";
// Commissioner's control panel — only accessible with the admin password.
// Set points, adjust by delta, or reset. The scoreboard on the main site
// auto-refreshes and will pick up any changes within 15 seconds.

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Plus, Minus, RotateCcw, LogOut } from "lucide-react";
import { TEAMS, SCORING, PHOTO_BONUS } from "@/lib/content";
import { useRouter } from "next/navigation";

type Scores = Record<string, number>;

export default function AdminPage() {
  const router = useRouter();
  const [scores, setScores] = useState<Scores>(
    () => Object.fromEntries(TEAMS.map((t) => [t.id, 0]))
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

  useEffect(() => { fetchScores(); }, [fetchScores]);

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
        flash("✓ Saved");
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
    <main
      className="min-h-screen p-6 md:p-10"
      style={{ background: "linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-mustard text-3xl md:text-4xl uppercase tracking-widest">
              Commissioner Panel
            </h1>
            <p className="font-marker text-cream/40 text-sm mt-1">Camp Dalto Scoreboard Control</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchScores}
              className="flex items-center gap-1.5 text-cream/50 hover:text-cream text-xs font-body uppercase tracking-wide transition-colors border border-cream/10 px-3 py-2 rounded"
            >
              <RefreshCw size={13} /> Refresh
            </button>
            <button
              onClick={() => {
                if (confirm("Reset ALL scores to 0? This cannot be undone.")) {
                  patch({ reset: true });
                }
              }}
              className="flex items-center gap-1.5 text-burnt hover:text-red-400 text-xs font-body uppercase tracking-wide transition-colors border border-burnt/30 px-3 py-2 rounded"
            >
              <RotateCcw size={13} /> Reset All
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-cream/40 hover:text-cream text-xs font-body uppercase tracking-wide transition-colors border border-cream/10 px-3 py-2 rounded"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>

        {/* Status flash */}
        {msg && (
          <div className="mb-6 text-center font-marker text-mustard text-base animate-bounce">
            {msg}
          </div>
        )}

        {/* Team score cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {TEAMS.map((team) => (
            <div
              key={team.id}
              className="bg-white/5 border border-cream/8 rounded-sm p-5"
            >
              {/* Team header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{team.emoji}</span>
                  <h2 className="font-display text-cream text-base uppercase tracking-wide">
                    {team.name}
                  </h2>
                </div>
                <span
                  className="font-display text-3xl"
                  style={{ color: team.color }}
                >
                  {scores[team.id] ?? 0}
                </span>
              </div>

              {/* Quick-adjust buttons */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {quickDeltas.map((d) => (
                  <button
                    key={d}
                    disabled={loading}
                    onClick={() => patch({ teamId: team.id, delta: d })}
                    className="text-xs font-display uppercase tracking-wide px-2.5 py-1 rounded transition-all hover:scale-105 active:scale-95"
                    style={{ background: `${team.color}55`, color: "#f4ead5", border: `1px solid ${team.color}80` }}
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
                  className="flex items-center gap-1 px-3 py-2 bg-white/5 hover:bg-white/10 text-cream/70 rounded text-xs font-body transition-colors border border-cream/10"
                >
                  <Minus size={12} /> 10
                </button>
                <button
                  disabled={loading}
                  onClick={() => patch({ teamId: team.id, delta: 10 })}
                  className="flex items-center gap-1 px-3 py-2 bg-white/5 hover:bg-white/10 text-cream/70 rounded text-xs font-body transition-colors border border-cream/10"
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
          ))}
        </div>

        {/* Quick reference: scoring chart */}
        <div className="bg-white/4 border border-cream/8 rounded-sm p-6">
          <h3 className="font-display text-cream/60 text-sm uppercase tracking-widest mb-4">
            Scoring Reference
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-body text-cream/50">
            {SCORING.map((tier) => (
              <div key={tier.id}>
                <p className="font-display text-cream/70 text-xs uppercase tracking-wide mb-1">
                  {tier.label}
                </p>
                <p className="text-cream/40">{tier.points.join(" / ")} pts</p>
                <p className="text-cream/30 text-xs">{tier.note}</p>
              </div>
            ))}
            <div>
              <p className="font-display text-mustard/70 text-xs uppercase tracking-wide mb-1">
                {PHOTO_BONUS.label}
              </p>
              <p className="text-cream/40">+{PHOTO_BONUS.points} per item</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Small inline input for "set score to exact value".
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
        className="flex-1 min-w-0 bg-black/20 border border-cream/15 rounded text-cream text-xs font-body px-2 py-2 focus:outline-none focus:border-mustard/50"
        aria-label={`Set score for ${teamId}`}
      />
      <button
        disabled={disabled}
        onClick={() => {
          const n = parseInt(val, 10);
          if (!isNaN(n)) onSet(n);
        }}
        className="px-3 py-2 bg-mustard/80 hover:bg-mustard text-charcoal rounded text-xs font-display uppercase tracking-wide transition-colors"
      >
        Set
      </button>
    </div>
  );
}
