"use client";
import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  light?: boolean;
  align?: "left" | "center";
  /** Kept for API compat; ignored in the new design. */
  pennants?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  light = false,
  align = "left",
}: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  const inkCls = light ? "text-bone" : "text-ink";
  const mutedCls = light ? "text-bone/55" : "text-muted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      className={`max-w-2xl mb-10 md:mb-14 ${alignCls}`}
    >
      {(eyebrow || subtitle) && (
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.2em] mb-4 ${mutedCls}`}
        >
          {eyebrow ?? subtitle}
        </p>
      )}
      <h2
        className={`display text-[34px] md:text-[44px] lg:text-[52px] leading-[1.02] font-semibold ${inkCls}`}
      >
        {title}
      </h2>
      {eyebrow && subtitle && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${mutedCls}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
