"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { HONORED } from "@/lib/content";

export default function HonoredGuest() {
  return (
    <section id="rob" className="py-20 md:py-28 bg-cream">
      <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
        <SectionHeader title={HONORED.title} subtitle={HONORED.name} />

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative inline-block mb-8"
        >
          {/* Laurel wreath SVG ring */}
          <svg
            viewBox="0 0 200 200"
            className="absolute -inset-5 w-[calc(100%+2.5rem)] h-[calc(100%+2.5rem)]"
            aria-hidden="true"
          >
            {/* Left branch */}
            {[0, 20, 40, 60, 80, 100, 120, 140].map((deg) => (
              <ellipse
                key={`L${deg}`}
                cx="52"
                cy="100"
                rx="12"
                ry="6"
                fill="#2d4a2b"
                opacity="0.7"
                transform={`rotate(${deg - 70} 100 100)`}
              />
            ))}
            {/* Right branch */}
            {[0, 20, 40, 60, 80, 100, 120, 140].map((deg) => (
              <ellipse
                key={`R${deg}`}
                cx="148"
                cy="100"
                rx="12"
                ry="6"
                fill="#2d4a2b"
                opacity="0.7"
                transform={`rotate(${-deg + 70} 100 100)`}
              />
            ))}
            {/* Bow at the bottom */}
            <path
              d="M90 158 Q100 168 110 158"
              stroke="#d4a017"
              strokeWidth="3"
              fill="none"
            />
          </svg>

          {/* Photo or initials placeholder */}
          <div
            className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4"
            style={{ borderColor: "#d4a017" }}
          >
            {HONORED.hasPhoto ? (
              <Image
                src={HONORED.photo}
                alt={`Portrait of ${HONORED.name}`}
                fill
                className="object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #2d4a2b, #1e3a5f)" }}
              >
                <span className="font-display text-5xl text-mustard">{HONORED.initials}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Tribute blurb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-xl mx-auto"
        >
          <p className="font-body text-charcoal/75 text-lg leading-relaxed italic">
            {HONORED.blurb}
          </p>
          <p className="font-marker text-burnt text-xl mt-6">Long live the King. 🤴</p>
        </motion.div>
      </div>
    </section>
  );
}
