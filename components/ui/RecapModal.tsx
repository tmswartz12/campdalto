"use client";
// Shared recap modal — used by both the Events grid (commemorative cards) and
// the Matchups section (per-event "Read recap" button). Also exports a polling
// hook for admin-authored recap overrides so both call sites stay in sync.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Icon from "@/components/ui/Icon";
import type { CampEvent, EventRecap, Tier } from "@/lib/content";

export type RecapsMap = Record<string, EventRecap>;
const RECAPS_POLL_MS = 15000;

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

/** Polls the recaps endpoint and returns the latest override map. */
export function useRecaps(): RecapsMap {
  const [recaps, setRecaps] = useState<RecapsMap>({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/recaps", { cache: "no-store" });
        if (!res.ok) return;
        const data: RecapsMap = await res.json();
        if (!cancelled) setRecaps(data);
      } catch {
        // Network blip — keep the last known good map.
      }
    }
    load();
    const id = setInterval(load, RECAPS_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return recaps;
}

/** Admin override wins over the static recap baked into content.ts. */
export function resolveRecap(event: CampEvent, overrides: RecapsMap): EventRecap | undefined {
  return overrides[event.id] ?? event.recap;
}

interface RecapModalProps {
  event: CampEvent;
  recap: EventRecap;
  onClose: () => void;
}

export function RecapModal({ event, recap, onClose }: RecapModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${event.name} recap`}
    >
      <button
        type="button"
        aria-label="Close recap"
        onClick={onClose}
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative bg-paper rounded-2xl shadow-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto border border-ink/10"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 md:px-8 py-4 bg-paper/95 backdrop-blur border-b border-ink/8">
          <div className="flex items-center gap-2.5 min-w-0">
            <Icon name={event.icon} size={18} strokeWidth={1.5} className="text-ink/70 shrink-0" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted truncate">
              {event.name} · Recap
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${TIER_DOT[event.tier]} shrink-0`} aria-hidden="true" />
            <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${TIER_LABEL[event.tier]} shrink-0`}>
              {event.tier}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 p-1.5 rounded-md text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <article className="px-6 md:px-8 py-6 md:py-8">
          {recap.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={recap.image.src}
              alt={recap.image.alt}
              className="w-full rounded-lg mb-6 border border-ink/8"
            />
          )}

          <h2 className="display text-2xl md:text-3xl font-semibold text-ink tracking-editorial leading-tight">
            {recap.headline}
          </h2>
          <p className="mt-2 text-base md:text-lg text-ink/80 leading-snug italic">
            {recap.subhead}
          </p>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink/85">
            {recap.body.map((para, idx) => (
              <p key={idx}>
                {idx === 0 && recap.dateline && (
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink mr-2">
                    {recap.dateline} —
                  </span>
                )}
                {para}
              </p>
            ))}
          </div>

          {recap.standings && recap.standings.length > 0 && (
            <div className="mt-8 border-t border-ink/8 pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-3">
                🏆 Final Standings
              </p>
              <ul className="space-y-2">
                {recap.standings.map((s, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between gap-3 bg-bone border border-ink/8 rounded-lg px-4 py-2.5"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span className="text-lg leading-none">{s.medal}</span>
                      <span
                        className={`display font-semibold tracking-editorial truncate ${
                          idx === 0 ? "text-ink uppercase" : "text-ink"
                        }`}
                      >
                        {s.team}
                      </span>
                    </span>
                    <span className="font-mono text-[12px] tabular-nums text-ink/80">
                      {s.points} pts
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recap.closing && (
            <p className="mt-6 pt-6 border-t border-ink/8 text-[14px] text-ink/80 leading-relaxed italic">
              {recap.closing}
            </p>
          )}
        </article>
      </motion.div>
    </motion.div>
  );
}
