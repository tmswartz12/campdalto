"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { PACKING } from "@/lib/content";

interface ListProps {
  label: string;
  caption: string;
  items: string[];
  accent: string;
  required?: boolean;
  delay?: number;
}

function PackList({ label, caption, items, accent, required, delay = 0 }: ListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl bg-paper border border-ink/8 shadow-card overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-ink/8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={`w-1.5 h-1.5 rounded-full ${accent}`} aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
            {label}
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {caption}
        </span>
      </div>
      <ul className="divide-y divide-ink/8">
        {items.map((item, i) => (
          <li key={i} className="px-6 py-3.5 flex items-center gap-4">
            <span
              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                required ? "border-ink/30 bg-ink" : "border-ink/20 bg-bone"
              }`}
              aria-hidden="true"
            >
              {required && <Check size={11} className="text-bone" strokeWidth={3} />}
            </span>
            <span className="text-[15px] text-ink/85">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function PackingList() {
  return (
    <section id="packing" className="py-24 md:py-32 bg-bone border-t border-ink/8">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="11 — Packing List"
          title="Forget your gear. Sit on the bench."
        />

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          <PackList
            label="Required"
            caption="No exceptions"
            items={PACKING.required}
            accent="bg-clay"
            required
          />
          <PackList
            label="Recommended"
            caption="Bring or regret it"
            items={PACKING.recommended}
            accent="bg-moss"
            delay={0.08}
          />
        </div>
      </div>
    </section>
  );
}
