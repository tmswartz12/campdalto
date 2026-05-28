"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";
import { ITINERARY } from "@/lib/content";

const DAY_ACCENT = ["bg-clay", "bg-moss", "bg-sun"];

export default function Schedule() {
  return (
    <section id="schedule" className="py-24 md:py-32 bg-ink text-bone">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="03 — The Schedule"
          title="The schedule is a suggestion. The pain is not."
          light
        />

        <div className="space-y-20 md:space-y-24">
          {ITINERARY.map((day, di) => (
            <div key={day.id}>
              {/* Day header */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
                className="flex items-baseline justify-between flex-wrap gap-3 mb-8 pb-5 border-b border-bone/15"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${DAY_ACCENT[di]}`}
                    aria-hidden="true"
                  />
                  <h3 className="display text-4xl md:text-5xl font-semibold text-bone leading-none">
                    {day.label}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/45">
                    Day {di + 1} of {ITINERARY.length}
                  </span>
                </div>
                <p className="font-display italic text-bone/60 text-lg">
                  {day.subtitle}
                </p>
              </motion.div>

              {/* Itinerary list */}
              <ul className="divide-y divide-bone/10">
                {day.events.map((ev, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_24px_1fr] gap-4 md:gap-6 py-5 group hover:bg-bone/[0.025] -mx-3 px-3 rounded-lg transition-colors"
                  >
                    {/* Time */}
                    <div className="font-mono text-[12px] uppercase tracking-[0.15em] text-bone/55 tabular-nums pt-1">
                      {ev.time}
                    </div>

                    {/* Icon (desktop) */}
                    <div className="hidden md:flex pt-1 text-bone/40 group-hover:text-clay transition-colors">
                      <Icon name={ev.icon} size={16} strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div className="col-span-1 md:col-span-1">
                      <h4 className="text-bone text-[17px] md:text-[19px] font-display font-semibold tracking-editorial leading-snug">
                        {ev.title}
                      </h4>
                      <p className="mt-1 text-bone/55 text-[14px] md:text-[15px] leading-relaxed">
                        {ev.desc}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
