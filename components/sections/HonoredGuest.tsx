"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import PhotoCarousel from "@/components/ui/PhotoCarousel";
import { HONORED, EVENT_INFO, PHOTOS } from "@/lib/content";

export default function HonoredGuest() {
  const hasPhotos = PHOTOS.length > 0;

  return (
    <section id="rob" className="py-24 md:py-32 bg-bone">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="07 — The Honored Guest"
          title={HONORED.title}
        />

        {/* Tribute row — portrait + copy */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Portrait (hidden once a carousel exists below) */}
          {!hasPhotos && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="md:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] w-full max-w-sm mx-auto md:mx-0">
                <div
                  className="absolute -inset-3 rounded-2xl border border-ink/10"
                  aria-hidden="true"
                />
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-forest">
                  {HONORED.hasPhoto ? (
                    <Image
                      src={HONORED.photo}
                      alt={`Portrait of ${HONORED.name}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-forest to-slate">
                      <span
                        className="display text-bone/95 font-semibold"
                        style={{ fontSize: "clamp(80px, 16vw, 180px)" }}
                      >
                        {HONORED.initials}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-3 left-3 right-3 flex items-center justify-between px-4 py-2 bg-bone border border-ink/10 rounded-md shadow-card">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Portrait · 01
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
                    The King
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={hasPhotos ? "md:col-span-12 max-w-3xl" : "md:col-span-7"}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-3">
              In honor of
            </p>
            <h3 className="display text-4xl md:text-5xl font-semibold text-ink tracking-editorial leading-[1.05]">
              {HONORED.name}
            </h3>
            <div className="my-6 h-px w-12 bg-clay" />
            <p className="font-display text-[20px] md:text-[22px] text-ink/85 leading-relaxed">
              {HONORED.blurb}
            </p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Long live the king · {EVENT_INFO.couple}
            </p>
          </motion.div>
        </div>

        {/* Photo carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-16 md:mt-24"
        >
          <div className="flex items-end justify-between mb-6 pb-4 border-b border-ink/10 gap-4 flex-wrap">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-clay mb-2">
                Gallery
              </p>
              <h4 className="display text-2xl md:text-3xl font-semibold text-ink tracking-editorial leading-tight">
                Rob, Miri &amp; the crew.
              </h4>
            </div>
            {hasPhotos && (
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted tabular-nums">
                {String(PHOTOS.length).padStart(2, "0")} photos
              </p>
            )}
          </div>

          <PhotoCarousel photos={PHOTOS} />
        </motion.div>
      </div>
    </section>
  );
}
