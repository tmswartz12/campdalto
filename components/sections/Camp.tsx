"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CAMP } from "@/lib/content";

export default function Camp() {
  return (
    <section id="camp" className="py-24 md:py-32 bg-paper border-y border-ink/8">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="10 — The Camp"
          title={`${CAMP.name} · Est. ${CAMP.established}`}
          subtitle={`${CAMP.tagline} · ${CAMP.location}`}
        />

        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">
          {/* Map */}
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7"
          >
            <div className="rounded-2xl border border-ink/10 bg-bone shadow-card overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CAMP.mapSrc}
                alt={CAMP.mapAlt}
                loading="lazy"
                decoding="async"
                className="block w-full h-auto"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {CAMP.name} grounds · 1/1/2021 edition
            </figcaption>
          </motion.figure>

          {/* Blurb + battlegrounds */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 space-y-7"
          >
            <p className="text-base md:text-lg text-ink/75 leading-relaxed">
              {CAMP.blurb}
            </p>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  The Battlegrounds
                </span>
                <span className="flex-1 h-px bg-ink/10" />
              </div>
              <ul className="divide-y divide-ink/8 rounded-2xl border border-ink/8 bg-bone overflow-hidden">
                {CAMP.battlegrounds.map((b, i) => (
                  <li
                    key={b.spot}
                    className="px-5 py-4 grid grid-cols-[24px_1fr] gap-3 items-start group hover:bg-ink/[0.02] transition-colors"
                  >
                    <span className="font-mono text-[11px] text-muted tabular-nums pt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-[15px] font-semibold text-ink tracking-editorial">
                        {b.spot}
                      </p>
                      <p className="text-[13px] text-ink/65 leading-snug mt-0.5">
                        {b.use}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
