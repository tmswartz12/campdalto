"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  BEER_MILE,
  LONG_RUN_BONUS,
  CLOSING_TOAST,
  CHUG_OFF,
} from "@/lib/content";

const SIDEQUESTS = [
  { label: "Chug-Off", points: CHUG_OFF.points, when: "After every event", note: "Winning team picks. Loser wears The Wig." },
  { label: LONG_RUN_BONUS.label, points: LONG_RUN_BONUS.points, when: "Sat 6:30 AM", note: LONG_RUN_BONUS.note },
  { label: CLOSING_TOAST.label, points: CLOSING_TOAST.points, when: "Sat 8:45 PM", note: CLOSING_TOAST.note },
];

export default function BeerMile() {
  return (
    <section id="beermile" className="py-24 md:py-32 bg-paper border-y border-ink/8">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="08 — The Beer Mile"
          title="Four laps. Four beers. A Major event."
        />

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Spotlight: blurb + +50 callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-6 space-y-6"
          >
            <p className="text-lg md:text-xl text-ink/75 leading-relaxed">
              {BEER_MILE.blurb}
            </p>

            <div className="rounded-2xl border border-forest/40 bg-forest/10 px-5 md:px-7 py-5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
                    {BEER_MILE.when}
                  </p>
                </div>
                <p className="text-[13px] md:text-[14px] text-ink/70 leading-relaxed">
                  Major-event scoring · 100 / 70 / 40 / 20.
                </p>
              </div>
              <span className="font-display text-3xl md:text-4xl font-semibold text-ink tabular-nums shrink-0">
                +{BEER_MILE.points}
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
            <div className="rounded-2xl bg-bone border border-ink/8 shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-ink/8 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Beer Mile Code · v.{new Date().getFullYear()}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulseSoft" />
              </div>
              <ol className="divide-y divide-ink/8">
                {BEER_MILE.rules.map((rule, i) => (
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

        {/* Sidequest bonuses — Long Run, Closing Toast, Photo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 md:mt-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Other +Pt Sidequests
            </span>
            <span className="flex-1 h-px bg-ink/10" />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {SIDEQUESTS.map((q) => (
              <div
                key={q.label}
                className="rounded-2xl border border-ink/10 bg-bone px-5 py-5 flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                    {q.when}
                  </p>
                  <p className="font-display text-lg font-semibold text-ink tracking-editorial mb-1">
                    {q.label}
                  </p>
                  <p className="text-[13px] text-ink/65 leading-snug">{q.note}</p>
                </div>
                <span className="font-display text-2xl font-semibold text-ink tabular-nums shrink-0">
                  +{q.points}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
