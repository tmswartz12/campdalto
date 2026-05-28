// ============================================================================
//  CAMP DALTO — EDIT EVERYTHING HERE
//  This is the only file you need to touch to update the site.
//  Search for "[PLACEHOLDER]" to find the things you should swap out:
//    - real dates, location, team rosters, and Rob's tribute paragraph.
// ============================================================================

export const EVENT_INFO = {
  name: "Camp Dalto",
  tagline: "The Bachelor Olympics",
  subhead: "The Bachelor Olympics — Two Days for One King",
  honoree: "Rob Dalto",
  dates: "Friday, May 29 – Sunday, May 31, 2026",
  shortDates: "May 29–31, 2026",
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
    "Welcome to Camp Dalto — two days of grass stains, blown hammies, and the worst hangover of your adult life. All sanctioned. All for one man.",
    "Forty degenerates. Four tribes. One weekend of Olympic-grade competition where every game scores, every point matters, and the bragging rights survive the wedding, the kids, and the inevitable divorce of whoever loses dodgeball.",
    "You will be drafted. You will compete. You will, at some point, carry the King on your shoulders. Bring cleats. Bring gloves. Leave your dignity in the car — there's no room for it at camp.",
  ],
};

// Camp Laws — non-negotiable, enforced by the Commissioner.
export const RULES: string[] = [
  "Cheers before every toast. Forget once, you drink it standing on a chair.",
  "When the King is summoned, you carry the King. On your shoulders. Squat form not graded.",
  "The Commissioner is always right. Especially when he is clearly wrong.",
  "Skipping the Base Relay is grounds for forfeit. No appeals, no doctor's notes.",
  "What happens at Camp Dalto stays at Camp Dalto. There is no group chat.",
  "Have fun. Failure to enjoy yourself is grounds for ejection.",
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
    motto: "Strike first. Strike fast. No mercy.",
    members: ["Big Tony", "Sully", "D-Train", "Marcus", "[PLACEHOLDER]"],
  },
  {
    id: "ember",
    name: "The Burnt Ends",
    color: "#c8553d",
    ink: "#f4ead5",
    emoji: "🔥",
    motto: "We came to cook. You're the meat.",
    members: ["Vinny", "Chooch", "Big Rob", "Petey", "[PLACEHOLDER]"],
  },
  {
    id: "owls",
    name: "The Night Owls",
    color: "#1e3a5f",
    ink: "#f4ead5",
    emoji: "🦉",
    motto: "We don't sleep. You won't either.",
    members: ["Doc", "Mikey Two-Times", "Sanchez", "Wes", "[PLACEHOLDER]"],
  },
  {
    id: "jackets",
    name: "The Yellow Jackets",
    color: "#d4a017",
    ink: "#2a2a2a",
    emoji: "🐝",
    motto: "Sting. Swarm. Bury.",
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
      { time: "5:00 PM", title: "Arrival & Cabin Check-In", desc: "Claim your bunk. Drop your bags. Start stretching — you'll need it.", icon: "Home" },
      { time: "5:30 PM", title: "Opening Ceremony & Team Draft", desc: "Four tribes drawn. Captains pick. Alliances form, then collapse before dinner.", icon: "Flag" },
      { time: "6:00 PM", title: "Dinner", desc: "Carbs. Hydrate. Tomorrow you bleed for points.", icon: "UtensilsCrossed" },
      { time: "7:00 PM – 12:00 AM", title: "Lakeside Fire Pit + Flip Cup", desc: "Flip Cup begins (best of 7). First points hit the board. Spill at your own peril.", icon: "Flame" },
    ],
  },
  {
    id: "sat",
    label: "Saturday",
    subtitle: "Bachelor Olympics Day",
    events: [
      { time: "8:00 AM", title: "Breakfast + Uno Tournament", desc: "A peaceful breakfast and a vicious game of Uno. No friendship survives a +4.", icon: "UtensilsCrossed" },
      { time: "9:30 AM", title: "Tug of War", desc: "Four teams. One rope. Cleats highly encouraged.", icon: "Anchor" },
      { time: "10:30 AM", title: "Skills Block", desc: "Free throws. Football throw. Base relay. Show out or sit out.", icon: "Target" },
      { time: "12:30 PM", title: "Lunch + Chess & Cards", desc: "Refuel. Then out-think them at the board. Out-bluff them at the table.", icon: "Spade" },
      { time: "2:00 PM", title: "Wiffle Ball Tournament", desc: "Backyard legends are born here. Bat flips mandatory.", icon: "CircleDot" },
      { time: "3:45 PM", title: "Cornhole + Pickleball", desc: "Cornhole into pickleball. The two most dangerous sports in America.", icon: "Crosshair" },
      { time: "5:15 PM", title: "Free Time", desc: "Lake. Hammock. Emergency strategy session. Ice bath if you're smart.", icon: "Sun" },
      { time: "6:00 PM", title: "Dinner", desc: "The calm before the dodgeball storm.", icon: "UtensilsCrossed" },
      { time: "7:00 PM", title: "Dodgeball — The Grand Finale", desc: "Biggest point swing of the weekend. No headshots. No witnesses. No prisoners.", icon: "Bomb" },
      { time: "9:15 PM", title: "Closing Ceremony at the Fire Pit", desc: "Champions crowned. Grievances aired. Medals handed out around the fire.", icon: "Flame" },
    ],
  },
  {
    id: "sun",
    label: "Sunday",
    subtitle: "The Long Drive Home",
    events: [
      { time: "7:00 AM", title: "Pack & Cleanup", desc: "Leave no trace. Except the memories. And maybe a sock.", icon: "Home" },
      { time: "8:00 AM", title: "Departure", desc: "Hug it out. Start planning the rematch before you hit the highway.", icon: "Bus" },
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
  { name: "Flip Cup", icon: "GlassWater", tier: "Major", format: "Best of 7. Spill your cup, you DQ." },
  { name: "Tug of War", icon: "Anchor", tier: "Major", format: "Single-elim bracket. Cleats highly encouraged." },
  { name: "Wiffle Ball", icon: "CircleDot", tier: "Major", format: "Round robin to final. Bat flips mandatory." },
  { name: "Dodgeball", icon: "Bomb", tier: "Major", format: "The Grand Finale. No headshots. No witnesses." },
  { name: "Free Throws", icon: "Target", tier: "Minor", format: "Best of 10 per player. Form not graded." },
  { name: "Football Throw", icon: "Rocket", tier: "Minor", format: "Longest accurate spiral. Wobblers don't count." },
  { name: "Base Relay", icon: "Footprints", tier: "Minor", format: "Sprint the bases. Skipping is grounds for forfeit." },
  { name: "Cornhole", icon: "Crosshair", tier: "Minor", format: "Doubles. First to 21. Trash talk encouraged." },
  { name: "Pickleball", icon: "Volleyball", tier: "Minor", format: "Doubles. Win by 2. ATPs welcome." },
  { name: "Uno", icon: "Layers", tier: "Side", format: "Stacking is legal. Friendships are not." },
  { name: "Chess", icon: "Crown", tier: "Side", format: "Speed chess, 5-minute clock. Talking allowed." },
  { name: "Cards", icon: "Spade", tier: "Side", format: "Dealer's choice. Money on the line." },
  { name: "Photo Scavenger Hunt", icon: "Camera", tier: "Bonus", format: "All weekend. +10 per item, no cap. Get weirder." },
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
  note: "+10 per item, no cap, get weirder. Commissioner has final say on what counts.",
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
    "Rob — by most accounts one of the youngest 38-year-olds to walk this earth. For 48 hours he trades his gels for beers, his Six Star medal for a wiffle bat, his 1080s for cleats, and his Garmin for a Solo cup. Threshold pace becomes flip-cup pace. The Bronx Burners singlet stays in the bag. Miri, somehow, signed up for life. Long live the king.",
};

// ---------------------------------------------------------------------------
// THE PHOTO CAROUSEL  (Rob & Miri)
//
// Drop image files into /public/photos/ and list them below.
// Any aspect ratio is fine — the carousel renders all tiles at a fixed
// height and scrolls horizontally, so portraits and landscapes mix cleanly.
// ---------------------------------------------------------------------------
export interface Photo {
  src: string;       // path relative to /public  (e.g. "/photos/rob-miri-01.jpg")
  alt: string;       // for screen readers / SEO
  caption?: string;  // shown under the active slide
  meta?: string;     // small mono label, e.g. "Aug 2024" or "Sicily, '23"
}

// Filenames 01.jpg–16.jpg match the order the source photos were dropped in.
// The order BELOW is the display order — curated for narrative arc:
// throwback → crew → couple → running → Alps → the proposal as climax.
// Save your originals to /public/photos/ as 01.jpg ... 16.jpg in paste order.
export const PHOTOS: Photo[] = [
  { src: "/photos/01.jpg", alt: "Old print photograph of Rob and friends, years back" },
  { src: "/photos/16.jpg", alt: "Group of friends at Coachella under palm trees at sunset" },
  { src: "/photos/03.jpg", alt: "Rob and a friend on a Manhattan rooftop at sunset" },
  { src: "/photos/04.jpg", alt: "Three guys in white shirts, ties, and suspenders at an outdoor wedding" },
  { src: "/photos/05.jpg", alt: "Group of runners taking a selfie in front of the Wall Street bull mid-run" },
  { src: "/photos/13.jpg", alt: "Rob and a friend at the New Balance Chicago Marathon expo" },
  { src: "/photos/14.jpg", alt: "Rob and Miri holding their Chicago Marathon race bibs" },
  { src: "/photos/12.jpg", alt: "Rob and Miri running side by side in the Chicago Marathon" },
  { src: "/photos/15.jpg", alt: "Rob with a friend at the NYC Marathon finish, holding the medal" },
  { src: "/photos/06.jpg", alt: "Rob and Miri drinking champagne at a mountain restaurant in the Alps" },
  { src: "/photos/07.jpg", alt: "Rob leaning in to kiss Miri while she sips champagne, mountains behind" },
  { src: "/photos/10.jpg", alt: "Rob and Miri celebrating with arms in the air in the Alps" },
  { src: "/photos/08.jpg", alt: "Miri showing her engagement ring next to Rob, alpine meadow in the background" },
  { src: "/photos/09.jpg", alt: "Family group selfie in an Alpine meadow with a baby and a dog" },
  { src: "/photos/11.jpg", alt: "Rob on one knee proposing to Miri in an alpine meadow" },
];

// ---------------------------------------------------------------------------
// THE PACKING LIST
// ---------------------------------------------------------------------------
export const PACKING = {
  required: [
    "Cleats (yes, real ones)",
    "Football gloves (sticky)",
    "Athletic shorts — game-day fits only",
    "Mouthguard",
    "Bathing suit (7 AM lake swim is non-optional)",
    "Your team color (assigned Friday — no rep, no game)",
    "Toiletries (you stink)",
    "A killer instinct",
  ],
  recommended: [
    "Eye black",
    "Compression sleeves",
    "Athletic tape — ankles, ribs, broken egos",
    "An ice pack (you'll need it)",
    "Bug spray + sunscreen + ego repellent",
    "A flask, full",
    "A war cry, rehearsed",
  ],
};
