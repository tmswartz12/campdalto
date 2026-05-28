"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CHUG_OFF } from "@/lib/content";

export default function ChugOff() {
  return (
    <section id="chugoff" className="py-24 md:py-32 bg-bone">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="07 — The Chug-Off"
          title="Win the event. Pick the chuggers. Take the wig home."
        />

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Blurb + points callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-6 space-y-6"
          >
            <p className="text-lg md:text-xl text-ink/75 leading-relaxed">
              {CHUG_OFF.blurb}
            </p>

            <div className="rounded-2xl border border-clay/40 bg-clay/10 px-5 md:px-7 py-5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
                    Chug-Off Bounty
                  </p>
                </div>
                <p className="text-[13px] md:text-[14px] text-ink/70 leading-relaxed">
                  Per round. Awarded the second the last drop hits the cup.
                </p>
              </div>
              <span className="font-display text-3xl md:text-4xl font-semibold text-ink tabular-nums shrink-0">
                +{CHUG_OFF.points}
              </span>
            </div>
          </motion.div>

          {/* Rules card */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-6"
          >
            <div className="rounded-2xl bg-paper border border-ink/8 shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-ink/8 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Chug-Off Code · v.{new Date().getFullYear()}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulseSoft" />
              </div>
              <ol className="divide-y divide-ink/8">
                {CHUG_OFF.rules.map((rule, i) => (
                  <li
                    key={i}
                    className="px-6 py-4 flex items-start gap-4 group hover:bg-ink/[0.02] transition-colors"
                  >
                    <span className="font-mono text-[11px] text-muted tabular-nums pt-1 w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink text-[15px] leading-snug">{rule}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
