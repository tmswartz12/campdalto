"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { TEAMS } from "@/lib/content";

export default function Teams() {
  return (
    <section
      id="teams"
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #f4ead5 0%, #e8dfc8 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader title="Meet the Tribes" subtitle="Four teams. One champion." pennants />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {TEAMS.map((team, i) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.08 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.18)" }}
              className="rounded-sm overflow-hidden shadow-badge"
              style={{
                transform: i % 2 === 0 ? "rotate(0.5deg)" : "rotate(-0.5deg)",
              }}
            >
              {/* Color band (pennant-style) */}
              <div
                className="relative h-28 flex items-center justify-center flex-col gap-1"
                style={{ background: team.color }}
              >
                {/* Pennant shape cut at the bottom */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(160deg, ${team.color}dd, ${team.color})`,
                    clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
                  }}
                  aria-hidden="true"
                />
                <span className="relative text-4xl z-10" role="img" aria-label={team.name}>
                  {team.emoji}
                </span>
                <h3
                  className="relative z-10 font-display text-base tracking-widest uppercase text-center px-2 leading-tight"
                  style={{ color: team.ink }}
                >
                  {team.name}
                </h3>
              </div>

              {/* Card body */}
              <div className="bg-cream p-5 canvas-border">
                <p className="font-marker text-burnt text-sm italic text-center mb-4">
                  &ldquo;{team.motto}&rdquo;
                </p>
                <ul className="space-y-1">
                  {team.members.map((m, j) => (
                    <li
                      key={j}
                      className="font-body text-sm text-charcoal/75 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-burnt/60 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
