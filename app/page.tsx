import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Mission from "@/components/sections/Mission";
import Teams from "@/components/sections/Teams";
import Events from "@/components/sections/Events";
import Scoring from "@/components/sections/Scoring";
import Wig from "@/components/sections/Wig";
import CigChallenge from "@/components/sections/CigChallenge";
import Scoreboard from "@/components/sections/Scoreboard";
import HonoredGuest from "@/components/sections/HonoredGuest";
import Camp from "@/components/sections/Camp";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <HonoredGuest />
      <Mission />
      <Teams />
      <Events />
      <Scoring />
      <Wig />
      <CigChallenge />
      <Scoreboard />
      <Camp />
      <Footer />
    </>
  );
}
