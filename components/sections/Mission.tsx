"use client";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import WoodenSign from "@/components/ui/WoodenSign";
import { MISSION, RULES } from "@/lib/content";

export default function Mission() {
  return (
    <section id="mission" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader title="The Mission" subtitle="Why we're here" />

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start mt-10">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="space-y-5"
          >
            {MISSION.body.map((para, i) => (
              <p key={i} className="font-body text-charcoal/80 text-lg leading-relaxed">
                {para}
              </p>
            ))}
            <p className="font-marker text-burnt text-xl mt-2">
              — The Commissioner
            </p>
          </motion.div>

          {/* Wooden rules sign */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          >
            <WoodenSign rotate={1}>
              <h3 className="font-display text-mustard text-xl uppercase tracking-widest mb-5 text-center">
                Camp Laws
              </h3>
              <ol className="space-y-3">
                {RULES.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-cream/90 font-body text-sm leading-snug">
                    <span className="font-display text-mustard text-lg shrink-0 w-5 text-right">
                      {i + 1}.
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ol>
            </WoodenSign>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
