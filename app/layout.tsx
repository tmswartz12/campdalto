import type { Metadata } from "next";
import { Rye, Lora, Caveat } from "next/font/google";
import "./globals.css";

const display = Rye({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const body = Lora({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-body" });
const marker = Caveat({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-marker" });

export const metadata: Metadata = {
  title: "Camp Dalto — Bachelor Olympics 2026",
  description: "A weekend of glory, grass stains, and questionable athletic decisions.",
  // Prevent search engines from indexing the party site.
  robots: "noindex, nofollow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${marker.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
