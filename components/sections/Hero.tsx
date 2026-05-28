"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import PennantRow from "@/components/ui/PennantRow";
import { EVENT_INFO } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1a2f19 0%, #2d4a2b 50%, #1e3a5f 100%)",
      }}
    >
      {/* Deep forest texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-forest/50" aria-hidden="true" />

      {/* Pennant string along the very top */}
      <div className="absolute top-20 inset-x-0 flex justify-center">
        <PennantRow count={13} className="max-w-2xl px-4" />
      </div>

      {/* Main wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 px-4"
      >
        {/* Carved wooden sign */}
        <div
          className="inline-block px-8 py-6 md:px-16 md:py-10 wood-grain"
          style={{
            background: "linear-gradient(160deg, #5a3d24 0%, #3b2518 60%, #2b1a10 100%)",
            boxShadow:
              "inset 0 2px 8px rgba(255,255,255,0.14), inset 0 -14px 24px rgba(0,0,0,0.55), 0 18px 40px rgba(0,0,0,0.45)",
            borderRadius: "3px",
            transform: "rotate(-0.5deg)",
          }}
        >
          {/* Camp label */}
          <p className="font-marker text-mustard text-xl md:text-2xl tracking-[0.25em] uppercase mb-1 opacity-85">
            Welcome to
          </p>

          {/* Big wordmark */}
          <h1
            className="font-display text-cream text-6xl sm:text-7xl md:text-9xl tracking-widest uppercase leading-none"
            style={{ textShadow: "0 4px 16px rgba(0,0,0,0.7), 0 0 40px rgba(212,160,23,0.15)" }}
          >
            Camp<br className="hidden sm:block" />{" "}
            <span className="text-mustard drop-shadow-lg">Dalto</span>
          </h1>

          <div className="mt-3 h-1 w-3/4 mx-auto rounded-full bg-mustard/40" />

          <p className="font-body text-cream/80 text-base md:text-lg mt-4 tracking-wider">
            {EVENT_INFO.tagline}
          </p>
        </div>

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 inline-flex items-center gap-3 bg-burnt/90 text-cream px-5 py-2 rounded-full font-marker text-lg tracking-wide shadow-lg"
        >
          <span>📅</span>
          <span>{EVENT_INFO.dates}</span>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-4 font-body text-cream/65 text-sm md:text-base max-w-md mx-auto"
        >
          A surprise for a king. Don&apos;t ruin it.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#mission"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="mt-8 inline-flex items-center gap-2 border-2 border-cream/60 text-cream font-body font-medium uppercase tracking-widest text-sm px-7 py-3 rounded hover:bg-cream hover:text-forest transition-all duration-200 hover:border-cream"
        >
          View the Itinerary <ChevronDown size={16} />
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/40"
        aria-hidden="true"
      >
        <ChevronDown size={24} />
      </motion.div>

      {/* Bottom pennant string */}
      <div className="absolute bottom-0 inset-x-0 flex justify-center">
        <PennantRow count={15} className="max-w-3xl" />
      </div>
    </section>
  );
}
