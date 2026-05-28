"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";
import { EVENTS, type Tier } from "@/lib/content";

const TIER_STYLES: Record<Tier, { dot: string; label: string; ring: string }> = {
  Major: { dot: "bg-clay", label: "text-clay", ring: "ring-clay/30" },
  Minor: { dot: "bg-slate", label: "text-slate", ring: "ring-slate/30" },
  Side: { dot: "bg-moss", label: "text-moss", ring: "ring-moss/30" },
  Bonus: { dot: "bg-sun", label: "text-sun", ring: "ring-sun/40" },
};

export default function Events() {
  return (
    <section id="events" className="py-24 md:py-32 bg-bone">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <SectionHeader
            eyebrow="05 — The Events"
            title="Thirteen events. One king crowned. Everybody else loses."
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted pb-2">
            {EVENTS.length} disciplines
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {EVENTS.map((ev, i) => {
            const t = TIER_STYLES[ev.tier];
            return (
              <motion.div
                key={ev.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.025 }}
                className="group bg-paper border border-ink/8 rounded-xl p-5 hover:border-ink/20 hover:shadow-card transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon
                    name={ev.icon}
                    size={22}
                    strokeWidth={1.5}
                    className="text-ink/70 group-hover:text-ink transition-colors"
                  />
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} aria-hidden="true" />
                    <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${t.label}`}>
                      {ev.tier}
                    </span>
                  </div>
                </div>

                <h4 className="display text-xl font-semibold text-ink tracking-editorial leading-tight">
                  {ev.name}
                </h4>
                <p className="mt-1.5 text-[13px] text-muted leading-relaxed">
                  {ev.format}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
