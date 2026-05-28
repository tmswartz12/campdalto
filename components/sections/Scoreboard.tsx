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

  // Sort teams by score descending for display.
  const ranked = [...TEAMS].sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0));
  const topScore = scores[ranked[0]?.id] ?? 0;

  return (
    <section
      id="scoreboard"
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)" }}
    >
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <SectionHeader title="Scoreboard" subtitle="Updated live by the Commissioner" light />

        {/* Refresh button + last updated */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 text-cream/50 hover:text-cream text-xs font-body uppercase tracking-wide transition-colors"
            aria-label="Refresh scores"
          >
            <RefreshCw size={14} className={spinning ? "animate-spin" : ""} />
            Refresh
          </button>
          {lastUpdated && (
            <span className="text-cream/30 font-body text-xs">
              as of {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>

        {/* Score bars */}
        <div className="space-y-4">
          <AnimatePresence>
            {ranked.map((team, rank) => {
              const pts = scores[team.id] ?? 0;
              const pct = topScore > 0 ? Math.round((pts / topScore) * 100) : 0;
              const isLeader = rank === 0;

              return (
                <motion.div
                  key={team.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: rank * 0.07 }}
                  className={`rounded-sm overflow-hidden ${isLeader ? "ring-2 ring-mustard/60" : ""}`}
                >
                  <div className="bg-white/5 px-5 py-4 flex items-center gap-4">
                    {/* Rank */}
                    <span
                      className="font-display text-2xl w-8 text-right shrink-0"
                      style={{ color: rank === 0 ? "#d4a017" : rank === 1 ? "#9ca3af" : "#c8553d" }}
                    >
                      {rank + 1}
                    </span>

                    {/* Emoji + name */}
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <span className="text-xl">{team.emoji}</span>
                      <span
                        className="font-display text-sm md:text-base uppercase tracking-wide text-cream truncate"
                      >
                        {team.name}
                      </span>
                      {isLeader && pts > 0 && (
                        <span className="hidden sm:inline font-marker text-mustard text-xs ml-1 animate-flicker">
                          👑 Leading
                        </span>
                      )}
                    </div>

                    {/* Points */}
                    <span
                      className="font-display text-2xl md:text-3xl shrink-0"
                      style={{ color: team.color }}
                    >
                      {pts}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 bg-white/5">
                    <motion.div
                      className="h-full"
                      style={{ background: team.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <p className="text-center font-marker text-cream/25 text-xs mt-8">
          Auto-refreshes every 15 seconds
        </p>
      </div>
    </section>
  );
}
