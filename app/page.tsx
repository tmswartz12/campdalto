import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Mission from "@/components/sections/Mission";
import Teams from "@/components/sections/Teams";
import Events from "@/components/sections/Events";
import Scoring from "@/components/sections/Scoring";
import ChugOff from "@/components/sections/ChugOff";
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
      <ChugOff />
      <Wig />
      <CigChallenge />
      <Scoreboard />
      <Camp />
      <Footer />
    </>
  );
}
