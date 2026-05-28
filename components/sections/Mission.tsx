"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { MISSION, RULES } from "@/lib/content";

export default function Mission() {
  return (
    <section id="mission" className="py-24 md:py-32 bg-bone">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="01 — The Mission"
          title="Two days of organized violence. In honor of one man."
        />

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Body copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 space-y-5"
          >
            {MISSION.body.map((para, i) => (
              <p
                key={i}
                className={`leading-relaxed ${
                  i === 0
                    ? "text-xl md:text-2xl text-ink font-display font-normal tracking-editorial"
                    : "text-base md:text-lg text-ink/70"
                }`}
              >
                {para}
              </p>
            ))}

            <div className="pt-6 flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Signed
              </span>
              <span className="font-display italic text-ink text-lg">
                The Commissioner
              </span>
            </div>
          </motion.div>

          {/* Camp Laws — modern card, not wooden sign */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 md:sticky md:top-24"
          >
            <div className="rounded-2xl bg-paper border border-ink/8 shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-ink/8 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Camp Laws · v.{new Date().getFullYear()}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulseSoft" />
              </div>
              <ol className="divide-y divide-ink/8">
                {RULES.map((rule, i) => (
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
