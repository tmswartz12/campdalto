"use client";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { TEAMS } from "@/lib/content";

interface Props {
  blurred: boolean;
}

export default function TeamsContent({ blurred }: Props) {
  return (
    <section id="teams" className="py-24 md:py-32 bg-paper border-y border-ink/8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-16 flex-wrap">
          <SectionHeader
            eyebrow="03 — The Tribes"
            title="Four teams. One champion."
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted pb-2 inline-flex items-center gap-1.5">
            {blurred ? (
              <>
                <Lock size={11} /> Rosters revealed at draft · Friday 5:30 PM
              </>
            ) : (
              <>Drafted live · Friday 5:30 PM</>
            )}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {TEAMS.map((team, i) => (
            <motion.article
              key={team.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group relative bg-bone rounded-2xl border border-ink/8 overflow-hidden hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Color rail */}
              <div
                className="h-1.5 w-full"
                style={{ background: team.color }}
                aria-hidden="true"
              />

              <div className="p-6">
                {/* Header row */}
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: team.color }}
                  >
                    Team 0{i + 1}
                  </span>
                  <span
                    className="text-2xl leading-none opacity-70 group-hover:opacity-100 transition-opacity"
                    role="img"
                    aria-label={team.name}
                  >
                    {team.emoji}
                  </span>
                </div>

                {/* Name */}
                <h3 className="display text-2xl md:text-[26px] font-semibold text-ink leading-[1.05] tracking-editorial">
                  {team.name}
                </h3>

                {/* Motto */}
                <p className="mt-2 text-sm text-muted italic font-display">
                  &ldquo;{team.motto}&rdquo;
                </p>

                {/* Divider */}
                <div className="my-5 h-px bg-ink/8" />

                {/* Roster */}
                <div className="flex items-center justify-between mb-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Roster
                  </p>
                  {blurred && (
                    <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] text-clay">
                      <Lock size={9} /> Sealed
                    </span>
                  )}
                </div>
                <ul className="space-y-1.5">
                  {team.members.map((m, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2.5 text-[14px] text-ink/80"
                    >
                      <span className="font-mono text-[10px] text-muted tabular-nums w-4">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={
                          blurred
                            ? "blur-md select-none pointer-events-none transition-[filter] duration-500"
                            : ""
                        }
                        aria-hidden={blurred ? "true" : undefined}
                      >
                        {m}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
