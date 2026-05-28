import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#2d4a2b",
        cream: "#f4ead5",
        burnt: "#c8553d",
        navy: "#1e3a5f",
        mustard: "#d4a017",
        charcoal: "#2a2a2a",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        marker: ["var(--font-marker)", "cursive"],
      },
      boxShadow: {
        // inset highlight + deep shadow = carved wooden sign
        sign: "inset 0 2px 6px rgba(255,255,255,0.18), inset 0 -10px 18px rgba(0,0,0,0.45), 0 14px 28px rgba(0,0,0,0.35)",
        badge: "0 8px 0 rgba(0,0,0,0.18), 0 14px 24px rgba(0,0,0,0.22)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
      },
      animation: {
        flicker: "flicker 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
