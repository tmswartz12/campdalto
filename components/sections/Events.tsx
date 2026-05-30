"use client";
// Consolidated "events" section — replaces the old cards grid + Matchups list.
// Every event in EVENTS renders as a collapsible row. Events that have a
// matchup entry (bracket / rounds) expand to show their full bracket; simpler
// events (Beer Mile, Free Throws, Long Run, etc.) expand to show format +
// tier points. The shared `matchup-{eventId}` anchor id is preserved so the
// Schedule page's "View matchups" deep links still resolve.

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";
import { RecapModal, resolveRecap, useRecaps } from "@/components/ui/RecapModal";
import {
  EVENTS,
  MATCHUPS,
  TEAMS,
  TIER_POINTS,
  PLACEMENT_KEYS,
  PLACE_LABELS,
  pointsForEvent,
  type CampEvent,
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
const MATCHUP_BY_EVENT_ID = new Map(
  MATCHUPS.map((m) => [m.id.replace(/^matchup-/, ""), m] as const),
);

function isFinal(label: string) {
  return /final/i.test(label) && !/semi/i.test(label);
}

function isBronze(label: string) {
  return /bronze|3rd/i.test(label);
}

function anchorIdFor(event: CampEvent): string {
  // Stable anchor — matches the existing Schedule "View matchups" links
  // (`/#matchup-{eventId}`) so those deep links keep working.
  return `matchup-${event.id}`;
}

// Shareable-link query param: `/?recap={eventId}` opens that recap on load.
const RECAP_QUERY_PARAM = "recap";

function readRecapParam(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(RECAP_QUERY_PARAM);
}

function syncRecapParam(eventId: string | null) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (eventId) {
    url.searchParams.set(RECAP_QUERY_PARAM, eventId);
  } else {
    url.searchParams.delete(RECAP_QUERY_PARAM);
  }
  // replaceState: no new history entry, just a clean shareable URL.
  window.history.replaceState({}, "", url);
}

export default function EventsSection() {
  const [results, setResults] = useState<ResultsMap>({});
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const [openRecapId, setOpenRecapIdState] = useState<string | null>(null);
  const recapOverrides = useRecaps();

  // Wrap setter so opening / closing always keeps the URL in sync.
  const setOpenRecapId = (eventId: string | null) => {
    setOpenRecapIdState(eventId);
    syncRecapParam(eventId);
  };

  // On mount, honor `?recap=<id>` so shared links land directly on the modal.
  useEffect(() => {
    const initial = readRecapParam();
    if (initial) setOpenRecapIdState(initial);
  }, []);

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

  function toggle(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const expandAll = () => setExpandedIds(new Set(EVENTS.map((e) => e.id)));
  const collapseAll = () => setExpandedIds(new Set());

  const openRecapData = useMemo(() => {
    if (!openRecapId) return null;
    const event = EVENTS.find((e) => e.id === openRecapId);
    if (!event) return null;
    const recap = resolveRecap(event, recapOverrides);
    if (!recap) return null;
    return { event, recap };
  }, [openRecapId, recapOverrides]);

  // If the URL points at a recap that no longer exists (typo, recap cleared from
  // admin), drop the stale param so the URL bar stops lying.
  useEffect(() => {
    if (openRecapId && !openRecapData) syncRecapParam(null);
  }, [openRecapId, openRecapData]);

  const expandedCount = expandedIds.size;

  return (
    <section id="events" className="py-24 md:py-32 bg-bone">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="05 — The Events"
          title="Every event. Every bracket. One king crowned."
        />

        <p className="max-w-2xl text-ink/70 text-base md:text-lg leading-relaxed mb-8 -mt-4">
          {EVENTS.length} disciplines, scored across four tiers. Click any to see format
          and bracket — and the recap once it's posted. Friday Flip Cup seeded the
          Saturday brackets: 🎓 Clowns finished 6-0, 🔥 Burn Unit 0-6.
        </p>

        <div className="flex items-center justify-between gap-3 flex-wrap mb-6 pb-4 border-b border-ink/8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {EVENTS.length} events · {expandedCount} open
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={expandAll}
              disabled={expandedCount === EVENTS.length}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70 hover:text-ink border border-ink/15 hover:border-ink/40 px-2.5 py-1.5 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Expand all
            </button>
            <button
              type="button"
              onClick={collapseAll}
              disabled={expandedCount === 0}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70 hover:text-ink border border-ink/15 hover:border-ink/40 px-2.5 py-1.5 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Collapse all
            </button>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          {EVENTS.map((event, idx) => {
            const matchup = MATCHUP_BY_EVENT_ID.get(event.id);
            const hasRecap = !!resolveRecap(event, recapOverrides);
            return (
              <EventRow
                key={event.id}
                event={event}
                matchup={matchup}
                index={idx}
                placements={results[event.id]}
                isOpen={expandedIds.has(event.id)}
                onToggle={() => toggle(event.id)}
                hasRecap={hasRecap}
                onOpenRecap={hasRecap ? () => setOpenRecapId(event.id) : undefined}
              />
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {openRecapData && (
          <RecapModal
            event={openRecapData.event}
            recap={openRecapData.recap}
            onClose={() => setOpenRecapId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function EventRow({
  event,
  matchup,
  index,
  placements,
  isOpen,
  onToggle,
  hasRecap,
  onOpenRecap,
}: {
  event: CampEvent;
  matchup?: EventMatchup;
  index: number;
  placements?: EventPlacements;
  isOpen: boolean;
  onToggle: () => void;
  hasRecap: boolean;
  onOpenRecap?: () => void;
}) {
  const tierPoints = TIER_POINTS[event.tier];
  const hasResults = placements && Object.keys(placements).length > 0;
  const points = pointsForEvent(event);
  const isBonus = event.tier === "Bonus";
  const winnerTeam = placements?.first ? TEAM_BY_ID.get(placements.first) : undefined;

  return (
    <motion.div
      id={anchorIdFor(event)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.12) }}
      className="scroll-mt-24 border border-ink/10 rounded-2xl bg-paper overflow-hidden"
    >
      {/* Collapsible header */}
      <div className="flex items-stretch">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${anchorIdFor(event)}-body`}
          className="flex-1 flex items-center justify-between gap-3 px-4 md:px-6 py-4 text-left hover:bg-ink/[0.02] transition-colors min-w-0"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Icon name={event.icon} size={20} strokeWidth={1.5} className="text-ink/70 shrink-0" />
            <h3 className="display text-lg md:text-xl font-semibold text-ink tracking-editorial leading-none truncate">
              {event.name}
            </h3>
            <span
              className={`hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] shrink-0 ${TIER_LABEL[event.tier]}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${TIER_DOT[event.tier]}`} aria-hidden="true" />
              {event.tier}
            </span>
            {winnerTeam && (
              <span
                className="inline-flex items-center gap-1.5 bg-sun/15 border border-sun/40 rounded-full pl-1.5 pr-2.5 py-0.5 min-w-0"
                title={`${winnerTeam.name} won ${event.name}`}
              >
                <span className="text-[13px] leading-none" aria-hidden="true">🥇</span>
                <span aria-hidden="true">{winnerTeam.emoji}</span>
                <span className="font-display text-[12px] md:text-[13px] font-semibold text-ink leading-none truncate max-w-[8rem] md:max-w-none">
                  {winnerTeam.name}
                </span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {matchup && (
              <>
                <span
                  className={`hidden md:inline-flex items-center font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded border ${DAY_BADGE[matchup.day]}`}
                >
                  {matchup.day}
                </span>
                <span className="hidden lg:inline font-mono text-[10px] uppercase tracking-[0.18em] text-muted tabular-nums">
                  {matchup.window}
                </span>
              </>
            )}
            <ChevronDown
              size={16}
              className={`text-ink/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {hasRecap && onOpenRecap && (
          <button
            type="button"
            onClick={onOpenRecap}
            className="shrink-0 flex items-center gap-1.5 px-3 md:px-4 border-l border-ink/10 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/75 hover:text-ink hover:bg-ink/[0.03] transition-colors"
            aria-label={`Read ${event.name} recap`}
          >
            <BookOpen size={13} />
            <span className="hidden sm:inline">Read recap</span>
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${anchorIdFor(event)}-body`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-ink/8"
          >
            <div className="px-4 md:px-6 py-5 md:py-6">
              {/* Final standings — appears once the Commissioner records placements */}
              {hasResults && tierPoints && (
                <div className="mb-6 rounded-xl border border-ink/10 bg-bone px-5 py-4">
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

              {/* Mobile-only meta row (day + window are hidden in the collapsed header on small screens) */}
              {matchup && (
                <div className="flex items-center gap-2 mb-5 md:hidden">
                  <span
                    className={`inline-flex items-center font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded border ${DAY_BADGE[matchup.day]}`}
                  >
                    {matchup.day}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted tabular-nums">
                    {matchup.window}
                  </span>
                </div>
              )}

              {/* Format + scoring summary */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2">
                  <p className="text-ink/80 text-[15px] md:text-base leading-relaxed">
                    {matchup?.format ?? event.format}
                  </p>
                  {matchup?.seedingNote && (
                    <p className="mt-2 text-muted text-[13px] leading-relaxed italic">
                      {matchup.seedingNote}
                    </p>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                      Scoring
                    </p>
                    {isBonus && points ? (
                      <p className="font-mono text-[13px] tabular-nums text-ink">
                        Bonus · +{points[0]} to winner
                      </p>
                    ) : tierPoints ? (
                      <p className="font-mono text-[13px] tabular-nums text-ink">
                        {event.tier} · {tierPoints.join(" / ")}
                      </p>
                    ) : null}
                  </div>
                  {matchup?.notes && matchup.notes.length > 0 && (
                    <ul className="space-y-1.5">
                      {matchup.notes.map((note, i) => (
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
              </div>

              {/* Rounds — only for events with a bracket */}
              {matchup ? (
                <div className="space-y-8">
                  {matchup.rounds.map((round) => (
                    <div key={round.name}>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-3">
                        {round.name}
                      </p>
                      <ul className="space-y-2">
                        {round.matches.map((m, i) => {
                          const finalish = isFinal(m.label);
                          const bronzish = isBronze(m.label);
                          const result = m.result;
                          const homeWon = result?.winner === "home";
                          const awayWon = result?.winner === "away";
                          const hasScores =
                            result &&
                            typeof result.homeScore === "number" &&
                            typeof result.awayScore === "number";
                          return (
                            <li
                              key={`${m.label}-${i}`}
                              className={`grid grid-cols-[88px_72px_1fr] md:grid-cols-[110px_96px_1fr_auto] gap-3 md:gap-5 items-center px-4 md:px-5 py-3.5 rounded-xl border transition-colors ${
                                finalish
                                  ? "border-clay/35 bg-clay/[0.06] hover:bg-clay/[0.09]"
                                  : bronzish
                                    ? "border-sun/30 bg-sun/[0.05] hover:bg-sun/[0.08]"
                                    : result
                                      ? "border-ink/15 bg-paper hover:border-ink/30"
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
                              <div className="font-display text-[15px] md:text-[16px] text-ink leading-snug flex flex-wrap items-center gap-x-2 gap-y-1">
                                {m.away ? (
                                  <>
                                    <span
                                      className={
                                        result
                                          ? homeWon
                                            ? "font-semibold text-ink"
                                            : "font-medium text-ink/50 line-through decoration-ink/20"
                                          : "font-semibold"
                                      }
                                    >
                                      {m.home}
                                    </span>
                                    {hasScores ? (
                                      <span className="font-mono text-[13px] tabular-nums text-ink/85">
                                        <span className={homeWon ? "font-semibold" : ""}>
                                          {result!.homeScore}
                                        </span>
                                        <span className="text-ink/35 mx-1">–</span>
                                        <span className={awayWon ? "font-semibold" : ""}>
                                          {result!.awayScore}
                                        </span>
                                      </span>
                                    ) : (
                                      <span className="text-muted mx-1 font-mono text-[12px]">vs</span>
                                    )}
                                    <span
                                      className={
                                        result
                                          ? awayWon
                                            ? "font-semibold text-ink"
                                            : "font-medium text-ink/50 line-through decoration-ink/20"
                                          : "font-semibold"
                                      }
                                    >
                                      {m.away}
                                    </span>
                                    {result?.note && (
                                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted border border-ink/10 rounded-md px-1.5 py-0.5">
                                        {result.note}
                                      </span>
                                    )}
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
              ) : (
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted/70">
                  No bracket — straight scoring.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
