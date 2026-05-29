"use client";
// Commissioner picks 1st/2nd/3rd/4th per event. Saving applies tier points
// to team totals atomically — the existing scoreboard polling picks them up
// within 15s, and the Matchups section also reflects the standings.

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Save, X } from "lucide-react";
import {
  TEAMS,
  SCOREABLE_EVENTS,
  TIER_POINTS,
  PLACEMENT_KEYS,
  PLACE_LABELS,
  type EventPlacements,
  type PlacementKey,
  type ResultsMap,
  type Tier,
} from "@/lib/content";

interface Props {
  /** Called whenever the server returns a new scores snapshot so the parent
   *  can sync its optimistic state. */
  onScoresChange: (scores: Record<string, number>) => void;
  /** Called when the panel surfaces a status message — parent renders the flash. */
  onFlash: (text: string, kind: "ok" | "err") => void;
}

const TIER_DOT: Record<Tier, string> = {
  Major: "bg-clay",
  Minor: "bg-slate",
  Side: "bg-moss",
  Bonus: "bg-sun",
};

export default function EventResultsPanel({ onScoresChange, onFlash }: Props) {
  const [results, setResults] = useState<ResultsMap>({});
  const [drafts, setDrafts] = useState<ResultsMap>({});
  const [pendingEvent, setPendingEvent] = useState<string | null>(null);
  const initialLoad = useRef(false);

  const fetchResults = useCallback(async () => {
    const res = await fetch("/api/results", { cache: "no-store" });
    if (!res.ok) return;
    const data: ResultsMap = await res.json();
    setResults(data);
    setDrafts(data);
  }, []);

  useEffect(() => {
    if (initialLoad.current) return;
    initialLoad.current = true;
    fetchResults();
  }, [fetchResults]);

  function updateDraft(eventId: string, key: PlacementKey, teamId: string | "") {
    setDrafts((prev) => {
      const next = { ...(prev[eventId] ?? {}) };
      if (teamId === "") {
        delete next[key];
      } else {
        next[key] = teamId;
      }
      return { ...prev, [eventId]: next };
    });
  }

  async function save(eventId: string) {
    const placements = drafts[eventId] ?? {};
    // Reject duplicate team ids — a tribe can't take two podium spots.
    const picked = Object.values(placements).filter(Boolean) as string[];
    if (picked.length !== new Set(picked).size) {
      onFlash("Same tribe picked twice — fix before saving", "err");
      return;
    }

    setPendingEvent(eventId);
    try {
      const res = await fetch("/api/results", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, placements }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { scores: Record<string, number>; results: ResultsMap };
      setResults(data.results);
      setDrafts(data.results);
      onScoresChange(data.scores);
      onFlash("Result saved", "ok");
    } catch (err) {
      onFlash("Failed to save result", "err");
      console.error("Save placements failed", err);
    } finally {
      setPendingEvent(null);
    }
  }

  async function clearEvent(eventId: string) {
    if (!confirm("Clear placements for this event? Awarded points will be refunded.")) return;
    setPendingEvent(eventId);
    try {
      const res = await fetch("/api/results", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, placements: {} }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { scores: Record<string, number>; results: ResultsMap };
      setResults(data.results);
      setDrafts(data.results);
      onScoresChange(data.scores);
      onFlash("Result cleared", "ok");
    } catch (err) {
      onFlash("Failed to clear result", "err");
      console.error("Clear placements failed", err);
    } finally {
      setPendingEvent(null);
    }
  }

  return (
    <div className="bg-paper border border-ink/8 rounded-2xl p-6 mb-12">
      <div className="flex items-baseline justify-between mb-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Event results
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {Object.keys(results).length}/{SCOREABLE_EVENTS.length} scored
        </p>
      </div>
      <p className="text-[13px] text-muted mb-6 leading-relaxed">
        Pick 1st–4th per event. Saving applies the tier points to team totals automatically and
        updates the public Matchups section. Change a placement to re-balance — only the delta
        is applied.
      </p>

      <div className="space-y-3">
        {SCOREABLE_EVENTS.map((event) => {
          const draft = drafts[event.id] ?? {};
          const saved = results[event.id] ?? {};
          const points = TIER_POINTS[event.tier]!;
          const isPending = pendingEvent === event.id;
          const isDirty = !placementsEqual(draft, saved);
          const isComplete = PLACEMENT_KEYS.every((k) => draft[k]);

          return (
            <div
              key={event.id}
              className={`border rounded-xl p-4 transition-colors ${
                isComplete
                  ? "border-ink/15 bg-bone"
                  : Object.keys(draft).length > 0
                    ? "border-sun/40 bg-sun/[0.04]"
                    : "border-ink/8 bg-bone/60"
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${TIER_DOT[event.tier]}`}
                    aria-hidden="true"
                  />
                  <h3 className="display text-base font-semibold text-ink tracking-editorial">
                    {event.name}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {event.tier} · {points.join("/")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {Object.keys(saved).length > 0 && (
                    <button
                      onClick={() => clearEvent(event.id)}
                      disabled={isPending}
                      className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-[0.15em] text-muted hover:text-clay border border-ink/10 hover:border-clay/40 px-2.5 py-1.5 rounded-md transition-colors disabled:opacity-40"
                    >
                      <X size={11} /> Clear
                    </button>
                  )}
                  <button
                    onClick={() => save(event.id)}
                    disabled={isPending || !isDirty}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em] font-semibold bg-ink hover:bg-forest text-bone px-3 py-1.5 rounded-md transition-colors disabled:opacity-40"
                  >
                    {isPending ? (
                      <Loader2 size={11} className="animate-spin" />
                    ) : (
                      <Save size={11} />
                    )}
                    Save
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {PLACEMENT_KEYS.map((key, idx) => (
                  <PlacementPicker
                    key={key}
                    label={PLACE_LABELS[idx]}
                    points={points[idx]}
                    value={draft[key] ?? ""}
                    disabled={isPending}
                    excluded={Object.entries(draft)
                      .filter(([k, v]) => k !== key && !!v)
                      .map(([, v]) => v as string)}
                    onChange={(teamId) => updateDraft(event.id, key, teamId)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function placementsEqual(a: EventPlacements, b: EventPlacements): boolean {
  for (const key of PLACEMENT_KEYS) {
    if ((a[key] ?? "") !== (b[key] ?? "")) return false;
  }
  return true;
}

function PlacementPicker({
  label,
  points,
  value,
  excluded,
  disabled,
  onChange,
}: {
  label: string;
  points: number;
  value: string;
  excluded: string[];
  disabled: boolean;
  onChange: (teamId: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted flex items-center justify-between">
        <span>{label}</span>
        <span className="text-ink/55 tabular-nums">+{points}</span>
      </span>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="bg-bone border border-ink/15 rounded-lg text-ink text-[13px] px-2 py-2 focus:outline-none focus:border-ink/50 disabled:opacity-40"
      >
        <option value="">—</option>
        {TEAMS.map((team) => {
          const isExcluded = excluded.includes(team.id);
          return (
            <option key={team.id} value={team.id} disabled={isExcluded}>
              {team.emoji} {team.name}
              {isExcluded ? " (picked)" : ""}
            </option>
          );
        })}
      </select>
    </label>
  );
}
