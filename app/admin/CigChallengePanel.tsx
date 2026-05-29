"use client";
// Per-team cigs-remaining input. Saving applies (remaining × penaltyPerCig)
// as a negative delta to the team's total — the existing scoreboard polling
// reflects it within 15s. Re-saving safely computes the delta against the
// prior value, so the Commissioner can adjust at will.

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Save, X, Cigarette } from "lucide-react";
import { TEAMS, CIG_CHALLENGE } from "@/lib/content";

interface Props {
  onScoresChange: (scores: Record<string, number>) => void;
  onFlash: (text: string, kind: "ok" | "err") => void;
}

type CigsMap = Record<string, number>;

export default function CigChallengePanel({ onScoresChange, onFlash }: Props) {
  const [cigs, setCigs] = useState<CigsMap>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [pendingTeam, setPendingTeam] = useState<string | null>(null);
  const initialLoad = useRef(false);

  const fetchCigs = useCallback(async () => {
    const res = await fetch("/api/cigs", { cache: "no-store" });
    if (!res.ok) return;
    const data: CigsMap = await res.json();
    setCigs(data);
    setDrafts(
      Object.fromEntries(
        TEAMS.map((t) => [t.id, t.id in data ? String(data[t.id]) : ""]),
      ),
    );
  }, []);

  useEffect(() => {
    if (initialLoad.current) return;
    initialLoad.current = true;
    fetchCigs();
  }, [fetchCigs]);

  async function save(teamId: string) {
    const raw = drafts[teamId];
    if (raw === undefined || raw === "") {
      onFlash("Enter a number first", "err");
      return;
    }
    const remaining = parseInt(raw, 10);
    if (!Number.isFinite(remaining) || remaining < 0 || remaining > CIG_CHALLENGE.packSize) {
      onFlash(`Must be 0–${CIG_CHALLENGE.packSize}`, "err");
      return;
    }

    setPendingTeam(teamId);
    try {
      const res = await fetch("/api/cigs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId, remaining }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { scores: Record<string, number>; cigs: CigsMap };
      setCigs(data.cigs);
      onScoresChange(data.scores);
      onFlash("Cig count saved", "ok");
    } catch (err) {
      onFlash("Failed to save cig count", "err");
      console.error("Save cigs failed", err);
    } finally {
      setPendingTeam(null);
    }
  }

  async function clearTeam(teamId: string) {
    if (!confirm("Clear this tribe's cig count? Penalty will be refunded.")) return;
    setPendingTeam(teamId);
    try {
      const res = await fetch("/api/cigs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId, clear: true }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { scores: Record<string, number>; cigs: CigsMap };
      setCigs(data.cigs);
      setDrafts((prev) => ({ ...prev, [teamId]: "" }));
      onScoresChange(data.scores);
      onFlash("Cig count cleared", "ok");
    } catch (err) {
      onFlash("Failed to clear", "err");
      console.error("Clear cigs failed", err);
    } finally {
      setPendingTeam(null);
    }
  }

  const tracked = Object.keys(cigs).length;
  const totalPenalty = Object.values(cigs).reduce(
    (sum, n) => sum + n * CIG_CHALLENGE.penaltyPerCig,
    0,
  );

  return (
    <div className="bg-paper border border-ink/8 rounded-2xl p-6 mb-12">
      <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted flex items-center gap-2">
          <Cigarette size={13} /> Cig Challenge
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {tracked}/{TEAMS.length} tribes audited · −{totalPenalty} applied
        </p>
      </div>
      <p className="text-[13px] text-muted mb-6 leading-relaxed">
        Count what's left in each tribe's pack at closing ceremony. Saving applies{" "}
        <span className="font-mono text-ink/80">remaining × −{CIG_CHALLENGE.penaltyPerCig}</span>{" "}
        as a penalty. Re-saving updates the delta — only the difference is applied.
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        {TEAMS.map((team) => {
          const draft = drafts[team.id] ?? "";
          const saved = team.id in cigs ? String(cigs[team.id]) : "";
          const isPending = pendingTeam === team.id;
          const isDirty = draft !== saved;
          const previewRemaining = parseInt(draft, 10);
          const previewPenalty =
            Number.isFinite(previewRemaining) && previewRemaining >= 0
              ? previewRemaining * CIG_CHALLENGE.penaltyPerCig
              : null;

          return (
            <div
              key={team.id}
              className="border border-ink/10 rounded-xl p-4 bg-bone transition-colors"
            >
              <div className="h-1 w-12 mb-3 rounded-full" style={{ background: team.color }} />
              <div className="flex items-center justify-between mb-3 gap-2">
                <h3 className="display text-base font-semibold text-ink tracking-editorial truncate">
                  {team.emoji} {team.name}
                </h3>
                {saved !== "" && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-clay tabular-nums shrink-0">
                    −{Number(saved) * CIG_CHALLENGE.penaltyPerCig} applied
                  </span>
                )}
              </div>

              <label className="flex items-end gap-2">
                <div className="flex-1">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-1">
                    Cigs remaining / {CIG_CHALLENGE.packSize}
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={CIG_CHALLENGE.packSize}
                    value={draft}
                    disabled={isPending}
                    placeholder="—"
                    onChange={(e) =>
                      setDrafts((prev) => ({ ...prev, [team.id]: e.target.value }))
                    }
                    className="w-full bg-paper border border-ink/15 rounded-lg text-ink text-[14px] font-mono tabular-nums px-3 py-2 focus:outline-none focus:border-ink/50 disabled:opacity-40"
                  />
                </div>
                <button
                  onClick={() => save(team.id)}
                  disabled={isPending || !isDirty}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em] font-semibold bg-ink hover:bg-forest text-bone px-3 py-2 rounded-md transition-colors disabled:opacity-40"
                >
                  {isPending ? (
                    <Loader2 size={11} className="animate-spin" />
                  ) : (
                    <Save size={11} />
                  )}
                  Save
                </button>
                {saved !== "" && (
                  <button
                    onClick={() => clearTeam(team.id)}
                    disabled={isPending}
                    title="Clear and refund"
                    className="inline-flex items-center justify-center text-muted hover:text-clay border border-ink/10 hover:border-clay/40 p-2 rounded-md transition-colors disabled:opacity-40"
                  >
                    <X size={12} />
                  </button>
                )}
              </label>

              {previewPenalty !== null && previewPenalty > 0 && isDirty && (
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-clay/80">
                  Will apply −{previewPenalty} on save
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
