"use client";
// Live scoreboard — polls /api/scores every 15s. Guests see read-only.
// Commissioner goes to /admin to update points.

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { TEAMS } from "@/lib/content";

type Scores = Record<string, number>;

export default function Scoreboard() {
  const [scores, setScores] = useState<Scores>(() =>
    Object.fromEntries(TEAMS.map((t) => [t.id, 0]))
  );
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [spinning, setSpinning] = useState(false);

  const fetchScores = useCallback(async () => {
    try {
      const res = await fetch("/api/scores", { cache: "no-store" });
      if (res.ok) {
        const data: Scores = await res.json();
        setScores(data);
        setLastUpdated(new Date());
      }
    } catch {
      // silently retry on next tick
    }
  }, []);

  useEffect(() => {
    fetchScores();
    const id = setInterval(fetchScores, 15_000);
    return () => clearInterval(id);
  }, [fetchScores]);

  const handleRefresh = async () => {
    setSpinning(true);
    await fetchScores();
    setTimeout(() => setSpinning(false), 600);
  };

  const ranked = [...TEAMS].sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0));
  const topScore = scores[ranked[0]?.id] ?? 0;

  return (
    <section id="scoreboard" className="py-24 md:py-32 bg-ink text-bone">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <SectionHeader
            eyebrow="09 — Live Scoreboard"
            title="Updated in real time by the Commissioner."
            light
          />
          <div className="flex items-center gap-3 pb-2">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/55">
              <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulseSoft" />
              Live
            </span>
            {lastUpdated && (
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/40 tabular-nums">
                {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
            <button
              onClick={handleRefresh}
              className="ml-1 text-bone/50 hover:text-bone transition-colors p-1.5 rounded-md hover:bg-bone/5"
              aria-label="Refresh scores"
            >
              <RefreshCw size={14} className={spinning ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-2.5">
          <AnimatePresence>
            {ranked.map((team, rank) => {
              const pts = scores[team.id] ?? 0;
              const pct = topScore > 0 ? Math.round((pts / topScore) * 100) : 0;
              const isLeader = rank === 0 && pts > 0;

              return (
                <motion.div
                  key={team.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: rank * 0.05 }}
                  className={`relative overflow-hidden rounded-xl border ${
                    isLeader ? "border-bone/30 bg-bone/[0.05]" : "border-bone/10 bg-bone/[0.025]"
                  }`}
                >
                  {/* Progress fill (subtle background bar) */}
                  <motion.div
                    className="absolute inset-y-0 left-0 opacity-15"
                    style={{ background: team.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    aria-hidden="true"
                  />

                  <div className="relative px-5 md:px-6 py-5 flex items-center gap-4 md:gap-6">
                    {/* Rank */}
                    <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-bone/55 tabular-nums w-6 shrink-0">
                      0{rank + 1}
                    </span>

                    {/* Color dot + name */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: team.color }}
                        aria-hidden="true"
                      />
                      <span className="display text-lg md:text-2xl font-semibold text-bone tracking-editorial truncate">
                        {team.name}
                      </span>
                      {isLeader && (
                        <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] text-clay shrink-0">
                          · Leading
                        </span>
                      )}
                    </div>

                    {/* Points */}
                    <span className="font-display text-2xl md:text-3xl font-semibold text-bone tabular-nums shrink-0">
                      {pts}
                      <span className="text-bone/40 text-sm font-mono uppercase tracking-[0.15em] ml-1.5">
                        pts
                      </span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-bone/35 mt-8">
          Auto-refreshes every 15 seconds
        </p>
      </div>
    </section>
  );
}
