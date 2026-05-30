import type { Metadata } from "next";
import Nav from "@/components/ui/Nav";
import Schedule from "@/components/sections/Schedule";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Schedule — Camp Dalto",
  description: "Two days, every event, every time slot. The schedule is a suggestion. The pain is not.",
};

export default function SchedulePage() {
  return (
    <>
      <Nav />
      <main className="pt-14 md:pt-16">
        <Schedule />
      </main>
      <Footer />
    </>
  );
}
