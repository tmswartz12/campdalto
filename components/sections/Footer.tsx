import PennantRow from "@/components/ui/PennantRow";
import { EVENT_INFO } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-forest text-cream py-12 text-center">
      <div className="max-w-2xl mx-auto px-5">
        <div className="flex justify-center mb-4">
          <PennantRow count={11} className="max-w-xs" />
        </div>

        <p className="font-display text-3xl tracking-[0.3em] uppercase text-mustard">
          {EVENT_INFO.name}
        </p>
        <p className="font-marker text-cream/50 text-sm mt-1 tracking-widest">
          EST. {EVENT_INFO.year}
        </p>

        <div className="my-4 h-px w-16 bg-cream/20 mx-auto" />

        <p className="font-body text-cream/55 text-sm italic">
          In honor of {EVENT_INFO.couple}
        </p>
        <p className="font-body text-cream/30 text-xs mt-6">
          Made with love (and competitive rage) by the Commissioner.
        </p>
      </div>
    </footer>
  );
}
