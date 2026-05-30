"use client";
// Public "Wig of Shame" — horizontal-scroll carousel of every chug-off loser
// who's been crowned with the wig. Newest leads. Data flows in from
// /api/wig (polled every 15s like scoreboard / recaps) so additions go live
// without a deploy.

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { WigWearer } from "@/lib/store";

const WIG_POLL_MS = 15000;

export default function Wig() {
  const [wig, setWig] = useState<WigWearer[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/wig", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as WigWearer[];
        if (!cancelled) setWig(data);
      } catch {
        // keep the last good list
      }
    }
    load();
    const id = setInterval(load, WIG_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || wig.length === 0) return;

    const onScroll = () => {
      const tiles = Array.from(el.querySelectorAll<HTMLElement>("[data-tile]"));
      let nearest = 0;
      let best = Infinity;
      tiles.forEach((tile, i) => {
        const diff = Math.abs(tile.offsetLeft - el.scrollLeft);
        if (diff < best) {
          best = diff;
          nearest = i;
        }
      });
      setIndex(nearest);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [wig.length]);

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const target = el.querySelectorAll<HTMLElement>("[data-tile]")[i];
    if (target) el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  };

  const go = (dir: 1 | -1) => {
    scrollToIndex(Math.max(0, Math.min(wig.length - 1, index + dir)));
  };

  return (
    <section id="wig" className="py-24 md:py-32 bg-ink text-bone">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="08 — The Wig"
          title="The wig finds a head every chug-off. The portrait outlives the hangover."
          light
        />

        {wig.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-bone/20 px-6 py-16 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/55">
              The Wig hasn&apos;t been worn yet
            </p>
            <p className="mt-2 text-[13px] text-bone/50 max-w-md mx-auto leading-relaxed">
              First chug-off loser earns the honor. Commissioner posts the portrait
              from the admin panel — no redeploy needed.
            </p>
          </div>
        ) : (
          <div>
            {/* Header row: counter + arrows */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/55 tabular-nums">
                {String(index + 1).padStart(2, "0")}{" "}
                <span className="text-bone/25">/ {String(wig.length).padStart(2, "0")}</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={index === 0}
                  aria-label="Previous wig wearer"
                  className="w-9 h-9 rounded-full border border-bone/25 text-bone/70 hover:text-bone hover:border-bone/60 disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={16} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  disabled={index === wig.length - 1}
                  aria-label="Next wig wearer"
                  className="w-9 h-9 rounded-full border border-bone/25 text-bone/70 hover:text-bone hover:border-bone/60 disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={16} strokeWidth={1.75} />
                </button>
              </div>
            </div>

            {/* Scroller */}
            <div
              ref={scrollerRef}
              className="scrollbar-hide flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 md:-mx-8 px-5 md:px-8 pb-1"
            >
              {wig.map((w, i) => (
                <figure
                  key={w.id}
                  data-tile
                  className="relative snap-start shrink-0 w-[78%] sm:w-[55%] md:w-[42%] lg:w-[34%] rounded-xl overflow-hidden bg-bone/[0.04] border border-bone/15"
                >
                  <div className="relative aspect-[3/4] bg-ink/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.imageSrc}
                      alt={w.imageAlt ?? `${w.name} wearing the wig`}
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/55 to-transparent pt-12 pb-4 px-5">
                      <p className="display text-2xl md:text-3xl font-semibold text-bone tracking-editorial leading-tight">
                        {w.name}
                      </p>
                      {w.occasion && (
                        <p className="mt-1 text-[13px] text-bone/75 leading-snug italic">
                          {w.occasion}
                        </p>
                      )}
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/55">
                        {new Date(w.addedAt).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </figure>
              ))}
            </div>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45 text-right">
              Drag · scroll · or use ← →
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
