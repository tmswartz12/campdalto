"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { EVENT_INFO, TEAMS } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col bg-forest text-bone overflow-hidden"
    >
      {/* Topographic line texture — calm, modern, outdoors-y without being twee. */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.13]"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 800"
      >
        <defs>
          <pattern id="topo" x="0" y="0" width="1200" height="800" patternUnits="userSpaceOnUse">
            {Array.from({ length: 14 }).map((_, i) => (
              <path
                key={i}
                d={`M -50 ${80 + i * 55} Q 300 ${40 + i * 55}, 600 ${100 + i * 55} T 1250 ${70 + i * 55}`}
                fill="none"
                stroke="#F4F1EA"
                strokeWidth="1"
              />
            ))}
          </pattern>
        </defs>
        <rect width="1200" height="800" fill="url(#topo)" />
      </svg>

      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 60%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Top metadata bar */}
        <div className="pt-24 md:pt-28 px-5 md:px-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-bone/55">
            <span>N 41.7° / W 74.2°</span>
            <span className="hidden sm:inline">{EVENT_INFO.shortDates}</span>
            <span>Vol. {EVENT_INFO.year - 2025} · Edition 01</span>
          </div>
          <div className="mt-3 h-px bg-bone/15" />
        </div>

        {/* Wordmark */}
        <div className="flex-1 flex items-center px-5 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
              className="mb-6 md:mb-8"
            >
              <Image
                src="/logo.png"
                alt="Camp Dalto"
                width={520}
                height={520}
                priority
                className="w-[220px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-auto -ml-2 md:-ml-3 drop-shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-clay mb-4"
            >
              The Bachelor Olympics · Vol. 01
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 max-w-xl"
            >
              <p className="text-bone/75 text-lg md:text-xl leading-snug">
                Two days. Four tribes. One king. Zero mercy. A weekend in the woods
                in honor of {EVENT_INFO.honoree} — cleats on, game faces up, dignity
                left on the bus.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#schedule"
                className="group inline-flex items-center gap-2 bg-bone text-ink font-body text-sm font-semibold px-5 py-3 rounded-full hover:bg-clay hover:text-bone transition-colors"
              >
                View the itinerary
                <ArrowDown
                  size={16}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </a>
              <a
                href="#scoreboard"
                className="group inline-flex items-center gap-2 border border-bone/30 text-bone font-body text-sm font-medium px-5 py-3 rounded-full hover:border-bone/70 transition-colors"
              >
                Live scoreboard
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom rail — four team swatches as quiet brand color */}
        <div className="px-5 md:px-8 pb-10 max-w-7xl mx-auto w-full">
          <div className="h-px bg-bone/15 mb-5" />
          <div className="flex items-center justify-between gap-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/55">
              {EVENT_INFO.dates}
            </p>
            <div className="flex items-center gap-3">
              {TEAMS.map((t, i) => (
                <div key={t.id} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: t.color }}
                    aria-hidden="true"
                  />
                  <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.18em] text-bone/55">
                    0{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
