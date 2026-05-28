"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { SCORING, PHOTO_BONUS, PLACE_LABELS } from "@/lib/content";

const PLACE_COLORS = ["#d4a017", "#9ca3af", "#c8553d", "#6b7280"];

export default function Scoring() {
  return (
    <section
      id="scoring"
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #1e3a5f 0%, #152a47 100%)" }}
    >
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHeader title="How to Win" subtitle="Points. Places. Pride." light />

        {/* Place label header row */}
        <div className="grid grid-cols-[1fr_repeat(4,_3rem)] md:grid-cols-[1fr_repeat(4,_5rem)] gap-3 mb-3 px-2">
          <div />
          {PLACE_LABELS.map((p, i) => (
            <div key={p} className="text-center">
              <span
                className="font-display text-sm uppercase tracking-widest"
                style={{ color: PLACE_COLORS[i] }}
              >
                {p}
              </span>
            </div>
          ))}
        </div>

        {/* Scoring rows */}
        <div className="space-y-3">
          {SCORING.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white/6 border border-cream/10 rounded-sm px-4 py-4 grid grid-cols-[1fr_repeat(4,_3rem)] md:grid-cols-[1fr_repeat(4,_5rem)] gap-3 items-center"
            >
              <div>
                <p className="font-display text-cream text-sm md:text-base uppercase tracking-wide">
                  {tier.label}
                </p>
                <p className="font-body text-cream/45 text-xs mt-0.5">{tier.note}</p>
              </div>
              {tier.points.map((pts, pi) => (
                <div key={pi} className="text-center">
                  <span
                    className="font-display text-lg md:text-2xl"
                    style={{ color: PLACE_COLORS[pi] }}
                  >
                    {pts}
                  </span>
                </div>
              ))}
            </motion.div>
          ))}

          {/* Photo bonus row */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.21 }}
            className="bg-mustard/15 border border-mustard/30 rounded-sm px-4 py-4 flex items-center justify-between gap-4"
          >
            <div>
              <p className="font-display text-mustard text-sm md:text-base uppercase tracking-wide">
                {PHOTO_BONUS.label}
              </p>
              <p className="font-body text-cream/45 text-xs mt-0.5">{PHOTO_BONUS.note}</p>
            </div>
            <span className="font-display text-mustard text-2xl md:text-3xl shrink-0">
              +{PHOTO_BONUS.points}
            </span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="text-center font-marker text-cream/40 text-sm mt-8"
        >
          Commissioner&apos;s rulings are final, binding, and deeply biased.
        </motion.p>
      </div>
    </section>
  );
}
