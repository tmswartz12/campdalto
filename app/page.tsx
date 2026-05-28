import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Mission from "@/components/sections/Mission";
import Teams from "@/components/sections/Teams";
import Schedule from "@/components/sections/Schedule";
import Events from "@/components/sections/Events";
import Scoring from "@/components/sections/Scoring";
import ChugOff from "@/components/sections/ChugOff";
import BeerMile from "@/components/sections/BeerMile";
import Scoreboard from "@/components/sections/Scoreboard";
import HonoredGuest from "@/components/sections/HonoredGuest";
import Camp from "@/components/sections/Camp";
import PackingList from "@/components/sections/PackingList";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <HonoredGuest />
      <Mission />
      <Teams />
      <Schedule />
      <Events />
      <Scoring />
      <ChugOff />
      <BeerMile />
      <Scoreboard />
      <Camp />
      <PackingList />
      <Footer />
    </>
  );
}
