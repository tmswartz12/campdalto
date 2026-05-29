"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";
import {
  MATCHUPS,
  TEAMS,
  TIER_POINTS,
  PLACEMENT_KEYS,
  PLACE_LABELS,
  type EventMatchup,
  type EventPlacements,
  type ResultsMap,
  type Tier,
} from "@/lib/content";

const TIER_DOT: Record<Tier, string> = {
  Major: "bg-clay",
  Minor: "bg-slate",
  Side: "bg-moss",
  Bonus: "bg-sun",
};

const TIER_LABEL: Record<Tier, string> = {
  Major: "text-clay",
  Minor: "text-slate",
  Side: "text-moss",
  Bonus: "text-sun",
};

const DAY_BADGE: Record<EventMatchup["day"], string> = {
  Friday: "bg-moss/15 text-moss border-moss/30",
  Saturday: "bg-clay/15 text-clay border-clay/30",
};

const PLACE_ACCENT = [
  "text-clay border-clay/40 bg-clay/[0.08]", // 1st
  "text-ink border-ink/20 bg-ink/[0.04]", // 2nd
  "text-sun border-sun/40 bg-sun/[0.08]", // 3rd
  "text-muted border-ink/10 bg-paper", // 4th
];

const TEAM_BY_ID = new Map(TEAMS.map((t) => [t.id, t]));

/** Matchup ids are namespaced `matchup-{eventId}`; the suffix is the scoreable event id. */
function eventIdFor(matchup: EventMatchup): string {
  return matchup.id.replace(/^matchup-/, "");
}

function isFinal(label: string) {
  return /final/i.test(label) && !/semi/i.test(label);
}

function isBronze(label: string) {
  return /bronze|3rd/i.test(label);
}

export default function Matchups() {
  const [results, setResults] = useState<ResultsMap>({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/results", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as ResultsMap;
        if (!cancelled) setResults(data);
      } catch {
        // silently retry on next tick
      }
    }
    load();
    const id = setInterval(load, 15_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <section id="matchups" className="py-24 md:py-32 bg-bone">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="06 — The Matchups"
          title="Who plays who. When. And on what dirt."
        />

        <p className="max-w-2xl text-ink/70 text-base md:text-lg leading-relaxed mb-12 -mt-4">
          Brackets, round-robins, and timed runs for every competition. Friday-night
          Flip Cup sets the seeds for every Saturday event — finish 1st and you draw
          the 4-seed all day.
        </p>

        <div className="space-y-16 md:space-y-20">
          {MATCHUPS.map((event, idx) => (
            <MatchupCard
              key={event.id}
              event={event}
              index={idx}
              placements={results[eventIdFor(event)]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MatchupCard({
  event,
  index,
  placements,
}: {
  event: EventMatchup;
  index: number;
  placements?: EventPlacements;
}) {
  const tierPoints = TIER_POINTS[event.tier];
  const hasResults = placements && Object.keys(placements).length > 0;

  return (
    <motion.div
      id={event.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.18) }}
      className="scroll-mt-24"
    >
      {/* Header strip */}
      <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6 pb-4 border-b border-ink/10">
        <div className="flex items-center gap-3">
          <Icon name={event.icon} size={20} strokeWidth={1.5} className="text-ink/70" />
          <h3 className="display text-2xl md:text-3xl font-semibold text-ink tracking-editorial leading-none">
            {event.name}
          </h3>
          <span
            className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] ${TIER_LABEL[event.tier]}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${TIER_DOT[event.tier]}`} aria-hidden="true" />
            {event.tier}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded border ${DAY_BADGE[event.day]}`}
          >
            {event.day}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted tabular-nums">
            {event.window}
          </span>
        </div>
      </div>

      {/* Final standings — appears once the Commissioner records placements */}
      {hasResults && tierPoints && (
        <div className="mb-6 rounded-xl border border-ink/10 bg-paper px-5 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-3">
            Final standings
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {PLACEMENT_KEYS.map((key, idx) => {
              const teamId = placements![key];
              const team = teamId ? TEAM_BY_ID.get(teamId) : undefined;
              return (
                <div
                  key={key}
                  className={`rounded-lg border px-3 py-2.5 ${PLACE_ACCENT[idx]}`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] flex items-center justify-between mb-1">
                    <span>{PLACE_LABELS[idx]}</span>
                    <span className="tabular-nums opacity-70">+{tierPoints[idx]}</span>
                  </p>
                  {team ? (
                    <p className="font-display text-[15px] font-semibold text-ink leading-snug">
                      {team.emoji} {team.name}
                    </p>
                  ) : (
                    <p className="font-display text-[13px] text-muted italic">— pending —</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Format + seeding */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <p className="text-ink/80 text-[15px] md:text-base leading-relaxed">{event.format}</p>
          {event.seedingNote && (
            <p className="mt-2 text-muted text-[13px] leading-relaxed italic">
              {event.seedingNote}
            </p>
          )}
        </div>
        {event.notes && event.notes.length > 0 && (
          <ul className="md:col-span-1 space-y-1.5">
            {event.notes.map((note, i) => (
              <li
                key={i}
                className="text-[13px] text-ink/70 leading-snug pl-3 border-l-2 border-ink/15"
              >
                {note}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Rounds */}
      <div className="space-y-8">
        {event.rounds.map((round) => (
          <div key={round.name}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-3">
              {round.name}
            </p>
            <ul className="space-y-2">
              {round.matches.map((m, i) => {
                const finalish = isFinal(m.label);
                const bronzish = isBronze(m.label);
                return (
                  <li
                    key={`${m.label}-${i}`}
                    className={`grid grid-cols-[88px_72px_1fr] md:grid-cols-[110px_96px_1fr_auto] gap-3 md:gap-5 items-center px-4 md:px-5 py-3.5 rounded-xl border transition-colors ${
                      finalish
                        ? "border-clay/35 bg-clay/[0.06] hover:bg-clay/[0.09]"
                        : bronzish
                          ? "border-sun/30 bg-sun/[0.05] hover:bg-sun/[0.08]"
                          : "border-ink/8 bg-paper hover:border-ink/20"
                    }`}
                  >
                    <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-ink/65 tabular-nums">
                      {m.time}
                    </span>
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                        finalish ? "text-clay font-semibold" : bronzish ? "text-sun" : "text-muted"
                      }`}
                    >
                      {m.label}
                    </span>
                    <div className="font-display text-[15px] md:text-[16px] text-ink leading-snug">
                      {m.away ? (
                        <>
                          <span className="font-semibold">{m.home}</span>
                          <span className="text-muted mx-2 font-mono text-[12px]">vs</span>
                          <span className="font-semibold">{m.away}</span>
                        </>
                      ) : (
                        <span className="font-semibold">{m.home}</span>
                      )}
                    </div>
                    {m.venue && (
                      <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {m.venue}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
