"use client";
// Notion-style horizontal-scroll image carousel.
// - Fixed tile height; tiles size to their natural aspect ratio.
// - Snap-to-image scrolling, keyboard arrows, peek of next/prev image.
// - Counter (01 / 12), prev/next buttons, caption + progress bar below.

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import type { Photo } from "@/lib/content";

interface Props {
  photos: Photo[];
}

export default function PhotoCarousel({ photos }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || photos.length === 0) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : photos.length <= 1 ? 1 : 0);

      // Pick the tile whose left edge is closest to the current scrollLeft
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

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [photos.length]);

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const target = el.querySelectorAll<HTMLElement>("[data-tile]")[i];
    if (target) el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  };

  const go = (dir: 1 | -1) => {
    scrollToIndex(Math.max(0, Math.min(photos.length - 1, index + dir)));
  };

  // Keyboard navigation while the carousel is focused
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  // ─── Empty state ──────────────────────────────────────────────────────────
  if (photos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 bg-paper px-6 py-14 text-center">
        <ImageOff size={20} className="mx-auto text-muted mb-3" strokeWidth={1.5} />
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Photos coming soon
        </p>
        <p className="mt-2 text-[13px] text-muted max-w-sm mx-auto leading-relaxed">
          Drop image files into{" "}
          <code className="font-mono text-ink/70 bg-ink/5 px-1.5 py-0.5 rounded">
            /public/photos/
          </code>{" "}
          then list them in{" "}
          <code className="font-mono text-ink/70 bg-ink/5 px-1.5 py-0.5 rounded">
            lib/content.ts → PHOTOS
          </code>
          .
        </p>
      </div>
    );
  }

  const current = photos[index];

  return (
    <div
      tabIndex={0}
      onKeyDown={onKey}
      className="focus:outline-none"
      aria-roledescription="carousel"
      aria-label="Photos of Rob and Miri"
    >
      {/* Header row: counter + arrows */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted tabular-nums">
          {String(index + 1).padStart(2, "0")}{" "}
          <span className="text-ink/25">/ {String(photos.length).padStart(2, "0")}</span>
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous photo"
            className="w-9 h-9 rounded-full border border-ink/15 text-ink/70 hover:text-ink hover:border-ink/40 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={16} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === photos.length - 1}
            aria-label="Next photo"
            className="w-9 h-9 rounded-full border border-ink/15 text-ink/70 hover:text-ink hover:border-ink/40 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <ChevronRight size={16} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Scroller — bleeds to viewport edges on mobile so tiles peek in */}
      <div
        ref={scrollerRef}
        className="scrollbar-hide flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 md:-mx-8 px-5 md:px-8 pb-1"
      >
        {photos.map((p, i) => (
          <div
            key={`${p.src}-${i}`}
            data-tile
            className="relative snap-start shrink-0 h-[20rem] sm:h-[24rem] md:h-[30rem] rounded-xl overflow-hidden bg-ink/[0.04] border border-ink/8"
          >
            {/* Fixed-height tile, natural-width image — mixed aspects render cleanly. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.alt}
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
              className="block h-full w-auto max-w-none object-cover"
            />
          </div>
        ))}
      </div>

      {/* Caption + progress bar */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-3">
        <div className="min-w-0">
          {current?.caption && (
            <p className="text-[15px] text-ink/85 leading-snug">{current.caption}</p>
          )}
          {current?.meta && (
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mt-1">
              {current.meta}
            </p>
          )}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:text-right">
          Drag · scroll · or use ← →
        </p>
      </div>

      <div className="mt-4 h-px bg-ink/10 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-ink"
          style={{
            width: `${Math.max(progress * 100, 100 / photos.length)}%`,
            transition: "width 0.18s ease",
          }}
        />
      </div>
    </div>
  );
}
