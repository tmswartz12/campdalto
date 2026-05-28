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
    "Thirty degenerates. Four tribes. One weekend of Olympic-grade competition where every game scores, every point matters, and the bragging rights survive the wedding, the kids, and the inevitable divorce of whoever loses dodgeball.",
    "You will be drafted. You will compete. You will drink with your off hand. Bring cleats. Bring gloves. Leave your dignity on the bus — there's no room for it at camp.",
  ],
};

// Camp Laws — non-negotiable, enforced by the Commissioner.
export const RULES: string[] = [
  "Cheers before every toast. Forget once, you drink it standing on a chair.",
  "Left hand only. Caught drinking with the right, drink again — standing.",
  "Summoned to a chug-off, you chug. No timeouts. No subs. No mercy.",
  "Every cig lit gets smoked. Down to the filter. No half-measures.",
  "The Base Relay is mandatory. No appeals, no doctor's notes, no exceptions.",
  "If Rob FaceTimes Miri, the whole camp drinks. Twice if it's after midnight.",
  "Bring up wedding planning, you owe the table a shot.",
  "The Commissioner is always right. Especially when he is clearly wrong.",
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
    id: "fire",
    name: "The Burn Unit",
    color: "#c8553d",
    ink: "#f4ead5",
    emoji: "🔥",
    motto: "Burn the field. Bury the rest.",
    members: [
      "Will Yu (Runner)",
      "Shaq Roberts (Hybrid)",
      "Ousmane Kamate (Runner)",
      "Kenny Moll (Runner)",
      "Terry White (Hybrid)",
      "Matt Teatom (Couch)",
      "Heita Miki (Runner)",
    ],
  },
  {
    id: "liberty",
    name: "Lady Liberty's Goons",
    color: "#4a8a82",
    ink: "#f4ead5",
    emoji: "🗽",
    motto: "Give us your beer, your wig, your trophy.",
    members: [
      "Patryk Odedina (Runner)",
      "Shawn Mcclaws (Hybrid)",
      "Davis Baldwin (Runner)",
      "Paul Johnson (Runner)",
      "Allen Ye (Hybrid)",
      "Eamon Jenkins (Hybrid)",
      "Jimmy Chow (Couch)",
    ],
  },
  {
    id: "grad",
    name: "The Class Clowns",
    color: "#1e3a5f",
    ink: "#f4ead5",
    emoji: "🎓",
    motto: "Honor roll Saturday. Pass-out by Sunday.",
    members: [
      "Andrew Finnegan (Runner)",
      "Mason O Hanlon (Runner)",
      "Brian Lloyd (Runner)",
      "Tyson Kaczmarek (Runner)",
      "Matt Healy (Off season)",
      "Ryan Whitehead (Hybrid)",
      "Brandon Shamy (Runner)",
    ],
  },
  {
    id: "dice",
    name: "Snake Eyes",
    color: "#8b1e3f",
    ink: "#f4ead5",
    emoji: "🎲",
    motto: "The King's roll. House never folds.",
    members: [
      "Rob Dalto (Runner)",
      "Ryan Leveille (Hybrid)",
      "Matt Mardesich (Hybrid)",
      "Ben Pressler (Hybrid)",
      "Will Vieth (Hybrid)",
      "Shaun Rose (Runner)",
      "Sean Hyland (Runner)",
      "Rob Perez (Hybrid)",
    ],
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
      { time: "6:30 AM", title: "The Long Run", desc: "Optional in name only. Whoever logs the longest miles earns their tribe +10. Pace honor system, distance not.", icon: "Footprints" },
      { time: "8:00 AM", title: "Breakfast + Uno Tournament", desc: "A peaceful breakfast and a vicious game of Uno. No friendship survives a +4.", icon: "UtensilsCrossed" },
      { time: "9:30 AM", title: "Tug of War", desc: "Four teams. One rope. Cleats highly encouraged.", icon: "Anchor" },
      { time: "10:30 AM", title: "Skills Block + Beer Mile", desc: "Free throws. Football throw. Base relay. Then four laps, four beers, full Major points on the line.", icon: "Target" },
      { time: "12:30 PM", title: "Lunch + Chess & Cards", desc: "Refuel. Then out-think them at the board. Out-bluff them at the table.", icon: "Spade" },
      { time: "2:00 PM", title: "Wiffle Ball Tournament", desc: "Backyard legends are born here. Bat flips mandatory.", icon: "CircleDot" },
      { time: "3:45 PM", title: "Cornhole + Pickleball", desc: "Cornhole into pickleball. The two most dangerous sports in America.", icon: "Crosshair" },
      { time: "5:15 PM", title: "Free Time", desc: "Lake. Hammock. Emergency strategy session. Ice bath if you're smart.", icon: "Sun" },
      { time: "6:00 PM", title: "Dinner", desc: "The calm before the dodgeball storm.", icon: "UtensilsCrossed" },
      { time: "7:00 PM", title: "Dodgeball — The Grand Finale", desc: "Biggest point swing of the weekend. No headshots. No witnesses. No prisoners.", icon: "Bomb" },
      { time: "8:45 PM", title: "The Final Toast", desc: "Each tribe nominates one orator. Commissioner ranks. Best toast banks +50 for the tribe. Tears acceptable. Cue cards are not.", icon: "Wine" },
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
  { name: "Beer Mile", icon: "Beer", tier: "Major", format: "Skills Block, Saturday morning. Four laps, four beers. One champion per tribe." },
  { name: "Free Throws", icon: "Target", tier: "Minor", format: "Best of 10 per player. Form not graded." },
  { name: "Football Throw", icon: "Rocket", tier: "Minor", format: "Longest accurate spiral. Wobblers don't count." },
  { name: "Base Relay", icon: "Footprints", tier: "Minor", format: "Sprint the bases. Skipping is grounds for forfeit." },
  { name: "Cornhole", icon: "Crosshair", tier: "Minor", format: "Doubles. First to 21. Trash talk encouraged." },
  { name: "Pickleball", icon: "Volleyball", tier: "Minor", format: "Doubles. Win by 2. ATPs welcome." },
  { name: "Uno", icon: "Layers", tier: "Side", format: "Stacking is legal. Friendships are not." },
  { name: "Chess", icon: "Crown", tier: "Side", format: "Speed chess, 5-minute clock. Talking allowed." },
  { name: "Cards", icon: "Spade", tier: "Side", format: "Dealer's choice. Money on the line." },
  { name: "The Long Run", icon: "Footprints", tier: "Bonus", format: "Saturday 6:30 AM. Longest distance earns their tribe +10. One per camper." },
  { name: "The Final Toast", icon: "Wine", tier: "Bonus", format: "Saturday 8:45 PM. One toaster per tribe. Commissioner ranks. Best toast banks +50." },
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
  { id: "major", label: "Major Events", points: [100, 70, 40, 20], note: "Flip Cup · Tug of War · Wiffle Ball · Dodgeball · Beer Mile" },
  { id: "minor", label: "Minor Events", points: [60, 40, 25, 15], note: "Free Throws · Football · Relay · Cornhole · Pickleball" },
  { id: "side", label: "Side Games", points: [30, 20, 10, 5], note: "Uno · Chess · Cards" },
];

export const PLACE_LABELS = ["1st", "2nd", "3rd", "4th"];

// Bonus rounds — flat point awards outside the tiered table.
export interface ScoreBonus {
  id: string;
  label: string;
  points: number;
  note: string;
}

export const SCORING_BONUSES: ScoreBonus[] = [
  {
    id: "chug",
    label: "Chug-Off",
    points: 10,
    note: "After every event. Winning team picks the chuggers. Loser wears The Wig.",
  },
  {
    id: "toast",
    label: "The Final Toast",
    points: 50,
    note: "Saturday night. One toaster per tribe. Commissioner ranks. Best toast wins.",
  },
  {
    id: "longrun",
    label: "Long Run",
    points: 10,
    note: "Saturday 6:30 AM. Longest distance logged earns their tribe the bonus.",
  },
];

// ---------------------------------------------------------------------------
// THE CHUG-OFF — between-event bonus round
// ---------------------------------------------------------------------------
export const CHUG_OFF = {
  points: 10,
  blurb:
    "After every event, the winning team picks one chugger from each tribe. Four men. Four beers. Ten points on the table. The loser dons the wig until the next chug-off — and prays it comes quickly.",
  rules: [
    "After every event, the winning team nominates one chugger from each of the four tribes.",
    "If you've chugged, you can't chug again. Save your best arms for last.",
    "Slowest chugger wears The Wig until the next chug-off. No swapping. No cropping.",
    "Winning tribe banks +10. Losing tribe banks a portrait with the wig on.",
  ],
};

// ---------------------------------------------------------------------------
// THE BEER MILE — Saturday's Skills Block centerpiece
// ---------------------------------------------------------------------------
export const BEER_MILE = {
  points: 100,
  when: "Saturday · Skills Block",
  blurb:
    "Four laps. Four beers. One champion per tribe. A full Major event — Flip Cup, Tug of War, Wiffle Ball, Dodgeball… and this. Place first and bank 100. Place last and answer for it at the fire pit.",
  rules: [
    "Each tribe picks one runner. Pick wrong and the wig becomes the least of your problems.",
    "Four 400m laps. Crack and finish a full beer before each. Cans only, no cheating cups.",
    "Vomit before the line, run a penalty lap. Vomit after, you're a legend either way.",
    "Scored as a Major: 100 / 70 / 40 / 20. Place matters. Pride more so.",
  ],
};

// Saturday-morning long-run bonus — individual effort, team scoring.
export const LONG_RUN_BONUS = {
  label: "Long Run Bonus",
  points: 10,
  note: "Saturday 6:30 AM. Longest run logged earns their tribe +10. Strava receipts mandatory.",
};

// Saturday-night closing toast — team-nominated orator, Commissioner judges.
export const CLOSING_TOAST = {
  label: "The Final Toast",
  points: 50,
  note: "Each tribe nominates one toaster Saturday night. Commissioner ranks. Best toast banks +50. No cue cards.",
};

// ---------------------------------------------------------------------------
// THE CAMP — Camp Lenox, est. 1918
// ---------------------------------------------------------------------------
export const CAMP = {
  name: "Camp Lenox",
  established: 1918,
  tagline: "The Traditional Sports Camp for Boys and Girls",
  location: "Lenox, MA · The Berkshires",
  mapSrc: "/photos/map.jpg",
  mapAlt: "Camp Lenox grounds map — Shaw Pond, courts, fields, cabins.",
  blurb:
    "Camp Lenox — established 1918, a premier Berkshires sleepaway for kids 7 to 16, blending serious sports programming with the traditional summer camp experience. For one weekend in May we borrow the bunks, the dining hall, the courts, the fields, the pond, and every blade of grass — and ruin it slightly. Memorize the map before Saturday or wander into the wrong cabin at 2 AM.",
  // Map of events → likely venues. Loose — Commissioner reserves the right to relocate any battle.
  battlegrounds: [
    { spot: "Shaw Pond", use: "Polar plunge. Recovery hangs. Where the dignity goes to die." },
    { spot: "Court Kaminer", use: "Free throws. Air-balls broadcast camp-wide." },
    { spot: "Old Pitch", use: "Football throw. Wobble = forfeit." },
    { spot: "Geezer Field", use: "Wiffle ball. Bat flips encouraged, mandatory in finals." },
    { spot: "Senior Court", use: "Beer Mile loop. Tug of War. Tribal screaming." },
    { spot: "Dining Hall", use: "Flip Cup. Breakfast. Two of the three are sacred." },
    { spot: "Hike to the Falls", use: "Saturday Long Run terminus. Strava receipts settle ties." },
    { spot: "Lakeside Fire Pit", use: "Opening + closing ceremonies. The Final Toast. All medals issued here." },
  ],
};

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
