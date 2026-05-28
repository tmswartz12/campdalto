// ============================================================================
//  CAMP DALTO — EDIT EVERYTHING HERE
//  This is the only file you need to touch to update the site.
//  Search for "[PLACEHOLDER]" to find the things you should swap out:
//    - real dates, location, team rosters, and Rob's tribute paragraph.
// ============================================================================

export const EVENT_INFO = {
  name: "Camp Dalto",
  tagline: "The Bachelor Olympics",
  subhead: "The Bachelor Olympics — A Weekend for Rob Dalto",
  honoree: "Rob Dalto",
  dates: "Friday, Aug 14 – Sunday, Aug 16, 2026", // [PLACEHOLDER: lock the real dates]
  shortDates: "Aug 14–16, 2026", // [PLACEHOLDER]
  year: 2026,
  location: "A cabin in the woods, upstate", // [PLACEHOLDER: keep vague if it's a surprise]
  couple: "Rob & Miri", // [PLACEHOLDER: the couple]
};

// Top navigation. Each href is an anchor to a section id on the page.
export const NAV_LINKS = [
  { href: "#mission", label: "Mission" },
  { href: "#teams", label: "Teams" },
  { href: "#schedule", label: "Schedule" },
  { href: "#events", label: "Events" },
  { href: "#scoring", label: "Scoring" },
  { href: "#scoreboard", label: "Scores" },
  { href: "#rob", label: "Rob" },
];

// ---------------------------------------------------------------------------
// THE MISSION
// ---------------------------------------------------------------------------
export const MISSION = {
  body: [
    "Welcome to Camp Dalto — two days of glory, grass stains, and questionable athletic decisions, all in honor of one man.",
    "Forty-ish degenerates. Four tribes. One weekend of Olympic-style competition where every game earns points, every point matters, and bragging rights last until the wedding (and well beyond).",
    "You will be drafted. You will compete. You will, at some point, carry the King on your shoulders. Bring your A-game and leave your dignity in the car.",
  ],
};

// The wooden "rules of the camp" sign.
export const RULES: string[] = [
  "Thou shalt cheers before every toast — no exceptions.",
  "Thou shalt carry the King upon thy shoulders when summoned.",
  "Thou shalt honor the Commissioner's ruling, even when it is clearly wrong.",
  "Thou shalt never, under any circumstances, skip the Base Relay.",
  "What happens at Camp Dalto stays at Camp Dalto.",
  "Thou shalt have fun. This rule is MANDATORY.",
];

// ---------------------------------------------------------------------------
// THE TEAMS  (rosters are drafted live Friday — these names are placeholders)
// ---------------------------------------------------------------------------
export interface Team {
  id: string; // used by the live scoreboard — don't change after the party starts
  name: string;
  color: string; // banner color
  ink: string; // readable text color on top of `color`
  emoji: string;
  motto: string;
  members: string[]; // [PLACEHOLDER] swap in real names after the draft
}

export const TEAMS: Team[] = [
  {
    id: "pine",
    name: "The Pine Vipers",
    color: "#2d4a2b",
    ink: "#f4ead5",
    emoji: "🐍",
    motto: "Strike first. Strike fast.",
    members: ["Big Tony", "Sully", "D-Train", "Marcus", "[PLACEHOLDER]"],
  },
  {
    id: "ember",
    name: "The Burnt Ends",
    color: "#c8553d",
    ink: "#f4ead5",
    emoji: "🔥",
    motto: "We came to cook.",
    members: ["Vinny", "Chooch", "Big Rob", "Petey", "[PLACEHOLDER]"],
  },
  {
    id: "owls",
    name: "The Night Owls",
    color: "#1e3a5f",
    ink: "#f4ead5",
    emoji: "🦉",
    motto: "Last ones standing.",
    members: ["Doc", "Mikey Two-Times", "Sanchez", "Wes", "[PLACEHOLDER]"],
  },
  {
    id: "jackets",
    name: "The Yellow Jackets",
    color: "#d4a017",
    ink: "#2a2a2a",
    emoji: "🐝",
    motto: "You will get stung.",
    members: ["Brody", "The Colonel", "Jonesy", "Tank", "[PLACEHOLDER]"],
  },
];

// ---------------------------------------------------------------------------
// THE SCHEDULE
// `icon` values map to Lucide icons in components/ui/Icon.tsx
// ---------------------------------------------------------------------------
export interface Activity {
  time: string;
  title: string;
  desc: string;
  icon: string;
}
export interface Day {
  id: string;
  label: string;
  subtitle: string;
  events: Activity[];
}

export const ITINERARY: Day[] = [
  {
    id: "fri",
    label: "Friday",
    subtitle: "Arrival & Opening Ceremony",
    events: [
      { time: "1:00 PM", title: "Depart from NYC", desc: "Convoy rolls out. Aux-cord privileges to be determined by combat.", icon: "Bus" },
      { time: "5:00 PM", title: "Arrival & Cabin Check-In", desc: "Claim your bunk, drop your bags, and breathe in that sweet pine air.", icon: "Home" },
      { time: "5:30 PM", title: "Opening Ceremony & Team Draft", desc: "The four tribes are drawn. Captains build dynasties. Alliances form and immediately collapse.", icon: "Flag" },
      { time: "6:00 PM", title: "Dinner", desc: "Fuel up — tomorrow you compete for eternal glory.", icon: "UtensilsCrossed" },
      { time: "7:00 PM – 12:00 AM", title: "Lakeside Fire Pit + Flip Cup", desc: "The Flip Cup Tournament begins (best of 7). First points of the weekend hit the board.", icon: "Flame" },
    ],
  },
  {
    id: "sat",
    label: "Saturday",
    subtitle: "Bachelor Olympics Day",
    events: [
      { time: "8:00 AM", title: "Breakfast + Uno Tournament", desc: "A peaceful breakfast and a vicious game of Uno. No friendship survives a +4.", icon: "UtensilsCrossed" },
      { time: "9:30 AM", title: "Tug of War", desc: "Four teams. One rope. An unreasonable number of grass stains.", icon: "Anchor" },
      { time: "10:30 AM", title: "Skills Block", desc: "Free Throws, the Football Throw, and the Base Relay. Show off, or sit down.", icon: "Target" },
      { time: "12:30 PM", title: "Lunch + Chess & Cards", desc: "Refuel, then out-think your rivals at the board and the table.", icon: "Spade" },
      { time: "2:00 PM", title: "Wiffle Ball Tournament", desc: "Backyard legends are born. Bat flips strongly encouraged.", icon: "CircleDot" },
      { time: "3:45 PM", title: "Cornhole + Pickleball", desc: "The two most dangerous sports in America, played back to back.", icon: "Crosshair" },
      { time: "5:15 PM", title: "Free Time", desc: "Lake, hammock, or emergency strategy session. Dealer's choice.", icon: "Sun" },
      { time: "6:00 PM", title: "Dinner", desc: "The calm before the dodgeball storm.", icon: "UtensilsCrossed" },
      { time: "7:00 PM", title: "Dodgeball — The Grand Finale", desc: "The biggest point swing of the weekend. Dodge, duck, dip, dive, and dodge.", icon: "Bomb" },
      { time: "9:15 PM", title: "Closing Ceremony at the Fire Pit", desc: "Champions crowned. Medals — and grievances — handed out around the fire.", icon: "Flame" },
    ],
  },
  {
    id: "sun",
    label: "Sunday",
    subtitle: "The Long Drive Home",
    events: [
      { time: "7:00 AM", title: "Pack & Cleanup", desc: "Leave no trace. Except the memories. And maybe a sock.", icon: "Home" },
      { time: "8:00 AM", title: "Departure", desc: "Hug it out and immediately start planning the rematch.", icon: "Bus" },
    ],
  },
];

// ---------------------------------------------------------------------------
// THE EVENTS
// ---------------------------------------------------------------------------
export type Tier = "Major" | "Minor" | "Side" | "Bonus";

export interface CampEvent {
  name: string;
  icon: string;
  tier: Tier;
  format: string;
}

export const EVENTS: CampEvent[] = [
  { name: "Flip Cup", icon: "GlassWater", tier: "Major", format: "Best of 7, full-team relay." },
  { name: "Tug of War", icon: "Anchor", tier: "Major", format: "Single-elimination bracket." },
  { name: "Wiffle Ball", icon: "CircleDot", tier: "Major", format: "Round robin into a final." },
  { name: "Dodgeball", icon: "Bomb", tier: "Major", format: "The Grand Finale. Bring a helmet." },
  { name: "Free Throws", icon: "Target", tier: "Minor", format: "Best of 10 per player, team total." },
  { name: "Football Throw", icon: "Rocket", tier: "Minor", format: "Longest accurate throw wins." },
  { name: "Base Relay", icon: "Footprints", tier: "Minor", format: "Timed sprint around the bases." },
  { name: "Cornhole", icon: "Crosshair", tier: "Minor", format: "Doubles bracket, first to 21." },
  { name: "Pickleball", icon: "Volleyball", tier: "Minor", format: "Doubles, win by 2." },
  { name: "Uno", icon: "Layers", tier: "Side", format: "Cutthroat. Stacking is legal." },
  { name: "Chess", icon: "Crown", tier: "Side", format: "Speed chess, 5-minute clock." },
  { name: "Cards", icon: "Spade", tier: "Side", format: "Dealer's choice, table runs it." },
  { name: "Photo Scavenger Hunt", icon: "Camera", tier: "Bonus", format: "All weekend. +10 per item, no cap." },
];

// ---------------------------------------------------------------------------
// THE SCORING
// ---------------------------------------------------------------------------
export interface ScoreTier {
  id: string;
  label: string;
  points: number[]; // [1st, 2nd, 3rd, 4th]
  note: string;
}

export const SCORING: ScoreTier[] = [
  { id: "major", label: "Major Events", points: [100, 70, 40, 20], note: "Flip Cup · Tug of War · Wiffle Ball · Dodgeball" },
  { id: "minor", label: "Minor Events", points: [60, 40, 25, 15], note: "Free Throws · Football · Relay · Cornhole · Pickleball" },
  { id: "side", label: "Side Games", points: [30, 20, 10, 5], note: "Uno · Chess · Cards" },
];

export const PHOTO_BONUS = {
  label: "Photo Bonus",
  points: 10,
  note: "+10 points for every completed Photo Scavenger Hunt item. No limit. Get weird.",
};

export const PLACE_LABELS = ["1st", "2nd", "3rd", "4th"];

// ---------------------------------------------------------------------------
// THE HONORED GUEST
// ---------------------------------------------------------------------------
export const HONORED = {
  title: "All Hail the King",
  name: "Rob Dalto",
  initials: "RD",
  // Drop a real photo at /public/rob.jpg and set hasPhoto = true.
  hasPhoto: false,
  photo: "/rob.jpg",
  blurb:
    "[PLACEHOLDER: Write a few heartfelt-but-roasting sentences about Rob here — the legend, the myth, the man who somehow convinced Miri to marry him. Warm, with a little bite. He'd want it that way.]",
};

// ---------------------------------------------------------------------------
// THE PACKING LIST
// ---------------------------------------------------------------------------
export const PACKING = {
  required: [
    "Bathing suit",
    "Sneakers",
    "Athletic clothes",
    "Your team color (assigned Friday)",
    "Toiletries",
    "A competitive spirit",
  ],
  recommended: ["Bug spray", "Sunscreen", "A hat", "A flask", "A war cry"],
};
