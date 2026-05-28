"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, EVENT_INFO } from "@/lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bone/85 backdrop-blur border-b border-ink/8"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-14 md:h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt=""
            width={56}
            height={56}
            priority
            className="w-7 h-7 object-contain"
          />
          <span className="font-display text-[15px] font-semibold tracking-tightest text-ink">
            {EVENT_INFO.name}
          </span>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            / {EVENT_INFO.year}
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-body text-[13px] font-medium text-ink/70 hover:text-ink px-3 py-2 rounded-md hover:bg-ink/5 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href="#scoreboard"
              className="font-body text-[13px] font-semibold text-bone bg-ink hover:bg-forest px-3.5 py-2 rounded-md transition-colors"
            >
              Live scores
            </a>
          </li>
        </ul>

        <button
          className="md:hidden text-ink p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-bone border-t border-ink/8">
          <ul className="flex flex-col px-5 py-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block py-3 text-ink font-body text-base font-medium border-b border-ink/8 last:border-0"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
