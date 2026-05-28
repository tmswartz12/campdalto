"use client";
import { motion } from "framer-motion";
import { CheckSquare, Square } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { PACKING } from "@/lib/content";

export default function PackingList() {
  return (
    <section
      id="packing"
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #e8dfc8 0%, #f4ead5 100%)" }}
    >
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <SectionHeader title="The Packing List" subtitle="Don't show up empty-handed" />

        <div className="grid md:grid-cols-2 gap-8 mt-4">
          {/* Required */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="paper rounded-sm border border-charcoal/12 p-7 shadow-badge"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="font-display text-xs uppercase tracking-widest text-cream px-3 py-1 rounded"
                style={{ background: "#c8553d" }}
              >
                Required
              </span>
              <span className="font-marker text-charcoal/40 text-sm">mandatory, non-negotiable</span>
            </div>
            <ul className="space-y-3">
              {PACKING.required.map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-body text-charcoal/80">
                  <CheckSquare size={16} className="text-forest shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Recommended */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="paper rounded-sm border border-charcoal/12 p-7 shadow-badge"
            style={{ transform: "rotate(0.5deg)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="font-display text-xs uppercase tracking-widest text-cream px-3 py-1 rounded"
                style={{ background: "#2d4a2b" }}
              >
                Recommended
              </span>
              <span className="font-marker text-charcoal/40 text-sm">strongly advised</span>
            </div>
            <ul className="space-y-3">
              {PACKING.recommended.map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-body text-charcoal/80">
                  <Square size={16} className="text-charcoal/30 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
