"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";
import { ITINERARY } from "@/lib/content";

const DAY_COLORS = ["#2d4a2b", "#1e3a5f", "#c8553d"];

export default function Schedule() {
  return (
    <section id="schedule" className="py-20 md:py-28 bg-charcoal">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <SectionHeader title="The Schedule" subtitle="Times are aspirational. Outcomes are mandatory." light />

        <div className="mt-8 space-y-14">
          {ITINERARY.map((day, di) => (
            <div key={day.id}>
              {/* Day header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="flex items-center gap-4 mb-6"
              >
                <div
                  className="flex-1 h-px"
                  style={{ background: `${DAY_COLORS[di]}80` }}
                  aria-hidden="true"
                />
                <div
                  className="px-6 py-2 rounded font-display text-cream text-xl uppercase tracking-widest"
                  style={{ background: DAY_COLORS[di] }}
                >
                  {day.label}
                </div>
                <p className="font-marker text-cream/50 text-sm">{day.subtitle}</p>
                <div
                  className="flex-1 h-px"
                  style={{ background: `${DAY_COLORS[di]}80` }}
                  aria-hidden="true"
                />
              </motion.div>

              {/* Timeline */}
              <div className="relative pl-4 md:pl-0">
                {/* Vertical line */}
                <div
                  className="absolute left-4 md:left-[7.5rem] top-0 bottom-0 w-px bg-cream/10"
                  aria-hidden="true"
                />

                <ul className="space-y-6">
                  {day.events.map((ev, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                      className="flex gap-4 md:gap-6"
                    >
                      {/* Time */}
                      <div className="hidden md:block w-28 shrink-0 text-right">
                        <span className="font-marker text-mustard/80 text-sm">{ev.time}</span>
                      </div>

                      {/* Dot */}
                      <div className="relative flex items-start">
                        <div
                          className="mt-2.5 w-3 h-3 rounded-full border-2 border-cream/30 shrink-0 z-10"
                          style={{ background: DAY_COLORS[di] }}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Card */}
                      <div
                        className="flex-1 bg-white/5 border border-cream/8 rounded-sm px-5 py-4 backdrop-blur-sm
                          hover:bg-white/8 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 mb-1">
                          <Icon name={ev.icon} size={15} className="text-mustard shrink-0" />
                          <h4 className="font-display text-cream text-sm md:text-base uppercase tracking-wide">
                            {ev.title}
                          </h4>
                          {/* Time on mobile */}
                          <span className="md:hidden font-marker text-mustard/70 text-xs ml-auto">
                            {ev.time}
                          </span>
                        </div>
                        <p className="font-body text-cream/55 text-sm leading-relaxed">
                          {ev.desc}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
