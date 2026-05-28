"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { SCORING, SCORING_BONUSES, PLACE_LABELS } from "@/lib/content";

const PLACE_COLORS = ["#E0B23A", "#B8B5AD", "#D04E2A", "#6E6A62"];

const BONUS_ACCENT: Record<string, { border: string; bg: string; dot: string }> = {
  chug: { border: "border-clay/40", bg: "bg-clay/10", dot: "bg-clay" },
  toast: { border: "border-forest/40", bg: "bg-forest/10", dot: "bg-forest" },
  longrun: { border: "border-sun/40", bg: "bg-sun/10", dot: "bg-sun" },
};

export default function Scoring() {
  return (
    <section id="scoring" className="py-24 md:py-32 bg-paper border-y border-ink/8">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="06 — Scoring"
          title="Points. Places. Pride."
        />

        {/* Table */}
        <div className="rounded-2xl border border-ink/10 overflow-hidden bg-bone">
          {/* Header */}
          <div className="grid grid-cols-[1fr_repeat(4,_56px)] md:grid-cols-[1fr_repeat(4,_88px)] gap-2 md:gap-3 px-5 md:px-7 py-4 bg-paper border-b border-ink/8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Tier
            </span>
            {PLACE_LABELS.map((p, i) => (
              <span
                key={p}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-center tabular-nums"
                style={{ color: PLACE_COLORS[i] }}
              >
                {p}
              </span>
            ))}
          </div>

          {/* Rows */}
          {SCORING.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="grid grid-cols-[1fr_repeat(4,_56px)] md:grid-cols-[1fr_repeat(4,_88px)] gap-2 md:gap-3 px-5 md:px-7 py-5 border-b border-ink/8 last:border-b-0 items-center hover:bg-paper/60 transition-colors"
            >
              <div>
                <p className="display text-xl md:text-2xl font-semibold text-ink tracking-editorial">
                  {tier.label}
                </p>
                <p className="text-[13px] text-muted mt-0.5">{tier.note}</p>
              </div>
              {tier.points.map((pts, pi) => (
                <span
                  key={pi}
                  className="font-display text-2xl md:text-3xl font-semibold text-center tabular-nums"
                  style={{ color: PLACE_COLORS[pi] }}
                >
                  {pts}
                </span>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Bonus rounds — outside the tiered table */}
        <div className="mt-4 space-y-3">
          {SCORING_BONUSES.map((b, i) => {
            const accent = BONUS_ACCENT[b.id] ?? BONUS_ACCENT.longrun;
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.05 }}
                className={`rounded-2xl border ${accent.border} ${accent.bg} px-5 md:px-7 py-5 flex items-center justify-between gap-4`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
                      {b.label}
                    </p>
                  </div>
                  <p className="text-[13px] md:text-[14px] text-ink/70 leading-relaxed">
                    {b.note}
                  </p>
                </div>
                <span className="font-display text-3xl md:text-4xl font-semibold text-ink tabular-nums shrink-0">
                  +{b.points}
                </span>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted mt-10">
          Commissioner&apos;s rulings are final, binding, deeply biased, and not subject to appeal.
        </p>
      </div>
    </section>
  );
}
