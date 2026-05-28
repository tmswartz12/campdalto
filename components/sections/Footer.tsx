import { EVENT_INFO } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-forest text-bone">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-12">
        {/* Massive wordmark */}
        <p
          className="display font-semibold leading-[0.85] tracking-tightest text-bone/95"
          style={{ fontSize: "clamp(64px, 14vw, 200px)" }}
        >
          Camp Dalto<span className="text-clay">.</span>
        </p>

        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-bone/15">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45 mb-2">
              Edition
            </p>
            <p className="text-bone font-medium">Vol. 01 / {EVENT_INFO.year}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45 mb-2">
              Dates
            </p>
            <p className="text-bone font-medium">{EVENT_INFO.shortDates}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45 mb-2">
              Location
            </p>
            <p className="text-bone font-medium">{EVENT_INFO.location}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45 mb-2">
              In honor of
            </p>
            <p className="text-bone font-medium">{EVENT_INFO.couple}</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-bone/15 flex items-center justify-between flex-wrap gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45">
            Built with love (and competitive rage) by the Commissioner.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45">
            © {EVENT_INFO.year} · No press, no leaks
          </p>
        </div>
      </div>
    </footer>
  );
}
