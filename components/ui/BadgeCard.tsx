"use client";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function BadgeCard({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      whileHover={{ y: -5, boxShadow: "0 16px 36px rgba(0,0,0,0.16)" }}
      className={`bg-cream rounded-sm border border-charcoal/10 shadow-badge overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
