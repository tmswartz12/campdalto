// Maps string icon names (from content.ts) to Lucide components.
// Add more here as you add events/activities.
import {
  Bus, Home, Flag, Flame, UtensilsCrossed, Anchor, Target, Spade,
  CircleDot, Crosshair, Sun, Bomb, Rocket, Footprints, Layers, Crown,
  Camera, GlassWater, Volleyball, Beer, Wine, LucideProps,
} from "lucide-react";

const MAP: Record<string, React.FC<LucideProps>> = {
  Bus, Home, Flag, Flame, UtensilsCrossed, Anchor, Target, Spade,
  CircleDot, Crosshair, Sun, Bomb, Rocket, Footprints, Layers, Crown,
  Camera, GlassWater, Volleyball, Beer, Wine,
};

interface Props extends LucideProps {
  name: string;
}

export default function Icon({ name, ...rest }: Props) {
  const Comp = MAP[name] ?? Flag;
  return <Comp {...rest} />;
}
