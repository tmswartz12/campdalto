"use client";
// ESPN-style live ticker. Polls /api/scores every 15s, sorts teams by points,
// and scrolls them endlessly across the top. Click anywhere on the ticker to
// jump to the full scoreboard.

import Link from "next/link";
import { useEffect, useState } from "react";
import { TEAMS } from "@/lib/content";

const POLL_MS = 15000;
type Scores = Record<string, number>;

const POSITION_GLYPHS = ["🥇", "🥈", "🥉", "4️⃣"];

export default function ScoreTicker() {
  const [scores, setScores] = useState<Scores>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/scores", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Scores;
        if (!cancelled) {
          setScores(data);
          setReady(true);
        }
      } catch {
        // Keep the last good snapshot on the wire.
      }
    }
    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Sort teams by current points (desc); break ties on the canonical TEAMS order.
  const ranked = [...TEAMS]
    .map((team, originalIdx) => ({
      team,
      originalIdx,
      points: scores[team.id] ?? 0,
    }))
    .sort((a, b) => b.points - a.points || a.originalIdx - b.originalIdx);

  // Duplicate the chip list so the marquee can loop seamlessly (translateX -50%).
  const trackChips = [...ranked, ...ranked];

  return (
    <Link
      href="/#scoreboard"
      aria-label="Jump to live scoreboard"
      className="block group relative bg-ink text-bone border-b border-bone/10 overflow-hidden"
    >
      <div className="flex items-stretch">
        {/* Left "LIVE" badge — anchors the ticker visually, ESPN-style. */}
        <div className="shrink-0 flex items-center gap-2 px-3 md:px-4 py-1.5 bg-clay text-bone">
          <span className="w-1.5 h-1.5 rounded-full bg-bone animate-pulseSoft" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold">
            Live
          </span>
        </div>

        {/* Scrolling track. Pause on hover so it's readable. */}
        <div className="relative flex-1 overflow-hidden">
          {/* Edge fades so chips don't snap in/out abruptly. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-ink to-transparent z-10" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ink to-transparent z-10" aria-hidden="true" />

          {ready ? (
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
              {trackChips.map(({ team, points }, i) => {
                // Original rank position (0..3), not the duplicated index.
                const rankIdx = i % ranked.length;
                return (
                  <span
                    key={`${team.id}-${i}`}
                    className="inline-flex items-center gap-2 px-4 py-1.5 border-r border-bone/10 whitespace-nowrap"
                  >
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/55 tabular-nums"
                      aria-hidden="true"
                    >
                      {POSITION_GLYPHS[rankIdx] ?? `#${rankIdx + 1}`}
                    </span>
                    <span aria-hidden="true">{team.emoji}</span>
                    <span className="font-display text-[13px] font-semibold text-bone tracking-editorial">
                      {team.name}
                    </span>
                    <span className="font-mono text-[13px] tabular-nums font-semibold text-bone">
                      {points}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/45">
                      PTS
                    </span>
                  </span>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/55">
              Loading scores…
            </div>
          )}
        </div>

        {/* Right-side cue → makes the click affordance explicit. */}
        <div className="hidden sm:flex shrink-0 items-center gap-1 px-3 md:px-4 py-1.5 border-l border-bone/10 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/65 group-hover:text-bone transition-colors">
          Scoreboard
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </Link>
  );
}
