"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, EVENT_INFO } from "@/lib/content";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const linkClass =
    "text-sm font-body font-medium tracking-wide uppercase transition-colors hover:text-burnt";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid ? "bg-forest/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#top"
          className="font-display text-xl tracking-widest uppercase text-cream hover:text-mustard transition-colors"
        >
          {EVENT_INFO.name}
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-7 items-center">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={`${linkClass} ${solid ? "text-cream/80 hover:text-mustard" : "text-cream/90 hover:text-mustard"}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden text-cream p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-forest/97 border-t border-cream/10">
          <ul className="flex flex-col px-6 py-4 gap-5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-cream/85 text-base font-body font-medium uppercase tracking-wide hover:text-mustard"
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
