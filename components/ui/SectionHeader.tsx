"use client";
import { motion } from "framer-motion";
import PennantRow from "./PennantRow";

interface Props {
  title: string;
  subtitle?: string;
  pennants?: boolean;
  light?: boolean; // white text (for dark backgrounds)
}

export default function SectionHeader({ title, subtitle, pennants = false, light = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="text-center mb-10 md:mb-14"
    >
      {pennants && (
        <div className="flex justify-center mb-3">
          <PennantRow count={9} className="max-w-xs" />
        </div>
      )}
      <h2
        className={`font-display text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase leading-tight ${
          light ? "text-cream" : "text-forest"
        }`}
        style={{ textShadow: light ? "0 2px 12px rgba(0,0,0,0.5)" : "none" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`font-marker text-lg md:text-xl mt-2 ${light ? "text-cream/70" : "text-charcoal/60"}`}>
          {subtitle}
        </p>
      )}
      <div
        className="mx-auto mt-4 h-1 w-24 rounded-full"
        style={{ background: light ? "#f4ead5" : "#c8553d" }}
      />
    </motion.div>
  );
}
