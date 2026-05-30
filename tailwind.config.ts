import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces
        bone: "#F4F1EA",
        paper: "#FAF8F3",
        ink: "#0F0F0E",
        muted: "#6E6A62",

        // Brand
        forest: "#1B2A1A",
        moss: "#3F5A38",
        clay: "#D04E2A",
        sun: "#E0B23A",
        slate: "#1B2533",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        editorial: "-0.025em",
      },
      boxShadow: {
        card: "0 1px 0 rgba(15,15,14,0.04), 0 6px 24px -12px rgba(15,15,14,0.12)",
        lift: "0 1px 0 rgba(15,15,14,0.06), 0 24px 48px -24px rgba(15,15,14,0.22)",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        // Ticker scrolls the inner row by exactly half its width — paired with
        // a duplicated content track in <ScoreTicker /> for a seamless loop.
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        pulseSoft: "pulseSoft 2.2s ease-in-out infinite",
        marquee: "marquee 45s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
