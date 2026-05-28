"use client";
import SectionHeader from "@/components/ui/SectionHeader";
import BadgeCard from "@/components/ui/BadgeCard";
import Icon from "@/components/ui/Icon";
import { EVENTS, type Tier } from "@/lib/content";

const TIER_STYLES: Record<Tier, { bg: string; text: string; label: string }> = {
  Major: { bg: "#c8553d", text: "#f4ead5", label: "Major" },
  Minor: { bg: "#1e3a5f", text: "#f4ead5", label: "Minor" },
  Side:  { bg: "#2d4a2b", text: "#f4ead5", label: "Side" },
  Bonus: { bg: "#d4a017", text: "#2a2a2a", label: "Bonus" },
};

export default function Events() {
  return (
    <section id="events" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader title="The Events" subtitle="Thirteen ways to earn glory (or lose it)" />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
          {EVENTS.map((ev, i) => {
            const tier = TIER_STYLES[ev.tier];
            return (
              <BadgeCard key={ev.name} delay={i * 0.04}>
                {/* Color header */}
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{ background: tier.bg }}
                >
                  <Icon name={ev.icon} size={20} style={{ color: tier.text }} />
                  <span
                    className="font-display text-xs uppercase tracking-widest px-2 py-0.5 rounded"
                    style={{ background: "rgba(0,0,0,0.18)", color: tier.text }}
                  >
                    {tier.label}
                  </span>
                </div>

                {/* Body */}
                <div className="px-4 py-4">
                  <h4 className="font-display text-forest text-sm uppercase tracking-wide mb-1.5">
                    {ev.name}
                  </h4>
                  <p className="font-body text-charcoal/60 text-xs leading-relaxed">
                    {ev.format}
                  </p>
                </div>
              </BadgeCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
