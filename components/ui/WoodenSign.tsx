"use client";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  rotate?: number; // degrees; subtle tilt for the hand-placed feel
  className?: string;
}

export default function WoodenSign({ children, rotate = 0, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: "linear-gradient(160deg, #6b4f3a 0%, #4a3020 40%, #3b2518 100%)",
        boxShadow:
          "inset 0 2px 6px rgba(255,255,255,0.12), inset 0 -10px 20px rgba(0,0,0,0.5), 0 14px 30px rgba(0,0,0,0.28)",
      }}
      className={`rounded-sm px-7 py-6 text-cream wood-grain relative ${className}`}
    >
      {/* Nail decorations */}
      <span className="absolute top-3 left-3 w-3 h-3 rounded-full bg-mustard/60 shadow-inner" aria-hidden="true" />
      <span className="absolute top-3 right-3 w-3 h-3 rounded-full bg-mustard/60 shadow-inner" aria-hidden="true" />
      <span className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-mustard/60 shadow-inner" aria-hidden="true" />
      <span className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-mustard/60 shadow-inner" aria-hidden="true" />
      {children}
    </motion.div>
  );
}
