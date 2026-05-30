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

// Top navigation. Anchor links use `/#section` so they work from any route
// (Schedule lives on its own page). The Schedule entry is a full route.
export const NAV_LINKS = [
  { href: "/#mission", label: "Mission" },
  { href: "/#teams", label: "Teams" },
  { href: "/schedule", label: "Schedule" },
  { href: "/#events", label: "Events" },
  { href: "/#scoring", label: "Scoring" },
  { href: "/#scoreboard", label: "Scores" },
  { href: "/#rob", label: "Rob" },
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
    color: "#2c5a9e",
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
    color: "#e8b62a",
    ink: "#1f1f1f",
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
    color: "#3f6b3a",
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
  /** Optional anchor id in the Matchups section. Renders a "View matchups" link on the row. */
  matchupId?: string;
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
      { time: "7:00 PM – 12:00 AM", title: "Lakeside Fire Pit + Flip Cup", desc: "Flip Cup round robin → bronze + final. First points hit the board, and Friday's standings seed Saturday's brackets. Spill at your own peril.", icon: "Flame", matchupId: "matchup-flip-cup" },
    ],
  },
  {
    id: "sat",
    label: "Saturday",
    subtitle: "Bachelor Olympics Day",
    events: [
      { time: "6:30 AM", title: "The Long Run", desc: "Optional in name only. Whoever logs the longest miles earns their tribe +10. Pace honor system, distance not.", icon: "Footprints" },
      { time: "8:00 AM", title: "Breakfast + Uno Tournament", desc: "A peaceful breakfast and a vicious game of Uno. No friendship survives a +4.", icon: "UtensilsCrossed" },
      { time: "9:00 AM", title: "Knockout", desc: "Basketball lightning round. 4 reps per tribe, last shooter standing. Major points on the line.", icon: "Zap", matchupId: "matchup-knockout" },
      { time: "9:30 AM", title: "Tug of War", desc: "Four teams. One rope. Cleats highly encouraged.", icon: "Anchor", matchupId: "matchup-tug-of-war" },
      { time: "10:30 AM", title: "Skills Block + Beer Mile", desc: "Free throws. Football throw. Base relay. Then four laps, four beers, full Major points on the line.", icon: "Target", matchupId: "matchup-base-relay" },
      { time: "12:30 PM", title: "Lunch + Chess & Cards", desc: "Refuel. Then out-think them at the board. Out-bluff them at the table.", icon: "Spade" },
      { time: "2:00 PM", title: "Wiffle Ball Tournament", desc: "Backyard legends are born here. Bat flips mandatory.", icon: "CircleDot", matchupId: "matchup-wiffle-ball" },
      { time: "3:45 PM", title: "Cornhole + Pickleball", desc: "Cornhole on the boards, pickleball on the courts — both brackets run in parallel.", icon: "Crosshair", matchupId: "matchup-cornhole" },
      { time: "5:15 PM", title: "Free Time", desc: "Lake. Hammock. Emergency strategy session. Ice bath if you're smart.", icon: "Sun" },
      { time: "6:00 PM", title: "Dinner", desc: "The calm before the dodgeball storm.", icon: "UtensilsCrossed" },
      { time: "7:00 PM", title: "Dodgeball — The Grand Finale", desc: "Biggest point swing of the weekend. No headshots. No witnesses. No prisoners.", icon: "Bomb", matchupId: "matchup-dodgeball" },
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

export interface RecapStanding {
  medal: string; // "🥇" / "🥈" / "🥉" / "4️⃣" / etc.
  team: string;
  points: number;
}

export interface EventRecap {
  headline: string;       // big screaming headline, emoji ok
  subhead: string;        // one-line dek
  dateline?: string;      // "CAMP DALTO" — newspaper style
  body: string[];         // paragraphs
  standings?: RecapStanding[];
  closing?: string;       // tease for what's next
  image?: { src: string; alt: string }; // optional hero photo
}

export interface CampEvent {
  /** Stable id — referenced by the results store. Don't change after camp starts. */
  id: string;
  name: string;
  icon: string;
  tier: Tier;
  format: string;
  /** For Bonus tier only: flat points awarded to the single winning tribe. */
  bonusPoints?: number;
  /** Post-event writeup. When present, the Events card becomes clickable. */
  recap?: EventRecap;
}

export const EVENTS: CampEvent[] = [
  {
    id: "flip-cup",
    name: "Flip Cup",
    icon: "GlassWater",
    tier: "Major",
    format: "Best of 7. Spill your cup, you DQ.",
    recap: {
      headline: "👑 CLOWNS CROWNED KINGS OF THE CUP",
      subhead:
        "Undefeated Champs Survive 0-2 Hole, Outlast Gooners in Third Game 7 of the Night",
      dateline: "CAMP DALTO",
      body: [
        "In a championship final that will be talked about for years, the Clowns completed a perfect Friday night, defeating the Gooners 4-3 in a seven-game thriller to claim the inaugural Camp Dalto Flip Cup title.",
        "The Clowns finished the night undefeated across nine series, a flawless 5-0 in Game 7s, and on a seven-game tournament-winning arc that included a stunning reverse-sweep of the Burn Unit after falling behind 0-2 in the semifinal.",
        "The Gooners mounted the comeback of the night — climbing out of a 0-2 hole in the final to take a 3-2 series lead — but couldn't close, dropping their third Game 7 of the weekend to the Clowns, all decided by a single cup.",
        "In the bronze medal match, the Snake Eyes held serve over the Burn Unit, who finish the historic night 0-7 in series play but will be forever remembered for going up 2-0 on the eventual champions.",
      ],
      standings: [
        { medal: "🥇", team: "CLOWNS", points: 100 },
        { medal: "🥈", team: "Gooners", points: 70 },
        { medal: "🥉", team: "Snake Eyes", points: 40 },
        { medal: "4️⃣", team: "Burn Unit", points: 20 },
      ],
      closing:
        "Olympics resume Saturday morning. Tug of war at 9:30. The Clowns enter with a 30-point lead and a target on their back.",
    },
  },
  // Saturday morning ────────────────────────────────────────────────────────
  { id: "long-run", name: "The Long Run", icon: "Footprints", tier: "Bonus", bonusPoints: 10, format: "Saturday 6:30 AM. Longest distance earns their tribe +10. One per camper." },
  { id: "uno", name: "Uno", icon: "Layers", tier: "Side", format: "Stacking is legal. Friendships are not." },
  { id: "knockout", name: "Knockout", icon: "Zap", tier: "Major", format: "Basketball line-up game. 4 reps per tribe. Last shooter standing wins." },
  { id: "tug-of-war", name: "Tug of War", icon: "Anchor", tier: "Major", format: "Single-elim bracket. Cleats highly encouraged." },
  // Saturday Skills Block ───────────────────────────────────────────────────
  { id: "free-throws", name: "Free Throws", icon: "Target", tier: "Minor", format: "Best of 10 per player. Form not graded." },
  { id: "football-throw", name: "Football Throw", icon: "Rocket", tier: "Minor", format: "Longest accurate spiral. Wobblers don't count." },
  { id: "base-relay", name: "Base Relay", icon: "Footprints", tier: "Minor", format: "Sprint the bases. Skipping is grounds for forfeit." },
  { id: "beer-mile", name: "Beer Mile", icon: "Beer", tier: "Major", format: "Skills Block, Saturday morning. Four laps, four beers. One champion per tribe." },
  // Saturday afternoon ──────────────────────────────────────────────────────
  { id: "chess", name: "Chess", icon: "Crown", tier: "Side", format: "Speed chess, 5-minute clock. Talking allowed." },
  { id: "cards", name: "Cards", icon: "Spade", tier: "Side", format: "Dealer's choice. Money on the line." },
  { id: "wiffle-ball", name: "Wiffle Ball", icon: "CircleDot", tier: "Major", format: "Round robin to final. Bat flips mandatory." },
  { id: "cornhole", name: "Cornhole", icon: "Crosshair", tier: "Minor", format: "Doubles. First to 21. Trash talk encouraged." },
  { id: "pickleball", name: "Pickleball", icon: "Volleyball", tier: "Minor", format: "Doubles. Win by 2. ATPs welcome." },
  // Saturday night ──────────────────────────────────────────────────────────
  { id: "dodgeball", name: "Dodgeball", icon: "Bomb", tier: "Major", format: "The Grand Finale. No headshots. No witnesses." },
  { id: "final-toast", name: "The Final Toast", icon: "Wine", tier: "Bonus", bonusPoints: 50, format: "Saturday 8:45 PM. One toaster per tribe. Commissioner ranks. Best toast banks +50." },
];

// Tier → [1st, 2nd, 3rd, 4th] points. Bonuses use the event's own bonusPoints
// awarded only to the single winning tribe — see pointsForEvent() below.
export const TIER_POINTS: Record<Tier, [number, number, number, number] | null> = {
  Major: [100, 70, 40, 20],
  Minor: [60, 40, 25, 15],
  Side: [30, 20, 10, 5],
  Bonus: null,
};

// Placement key → index into TIER_POINTS. Keep this order — drives the admin UI.
export const PLACEMENT_KEYS = ["first", "second", "third", "fourth"] as const;
export type PlacementKey = (typeof PLACEMENT_KEYS)[number];

export type EventPlacements = Partial<Record<PlacementKey, string>>; // values are team ids
export type ResultsMap = Record<string, EventPlacements>; // eventId → placements

/**
 * Returns the points array for an event (always length 4 for the placement map).
 * Bonus events return [bonusPoints, 0, 0, 0] — only the winning tribe scores.
 * Returns null for unscored events.
 */
export function pointsForEvent(
  event: CampEvent,
): [number, number, number, number] | null {
  if (event.tier === "Bonus") {
    return event.bonusPoints ? [event.bonusPoints, 0, 0, 0] : null;
  }
  return TIER_POINTS[event.tier];
}

/** Events the admin can record placements for (Major / Minor / Side + scored Bonuses). */
export const SCOREABLE_EVENTS = EVENTS.filter((e) => pointsForEvent(e) !== null);

/** Bonus events with a flat single-winner award. */
export const BONUS_EVENTS = EVENTS.filter(
  (e) => e.tier === "Bonus" && typeof e.bonusPoints === "number",
);

// ---------------------------------------------------------------------------
// THE MATCHUPS — brackets and round-robin schedules for each competition.
//
// SEEDING (LOCKED after Friday Flip Cup):
//   #1 🎓 Class Clowns   (RR 6-0)
//   #2 🎲 Snake Eyes      (RR 3-3, +6 cup diff)
//   #3 🗽 Liberty Goons   (RR 3-3)
//   #4 🔥 Burn Unit       (RR 0-6)
// ---------------------------------------------------------------------------
export interface MatchupMatch {
  /** Posted time for the match. */
  time: string;
  /** Short name for this slot — e.g. "Semi 1", "Final", "Run 1". */
  label: string;
  /** Home / first team. Free text so we can show "🔥 Burn Unit" or "Winner SF1". */
  home: string;
  /** Optional opponent — leave blank for solo timed runs (Base Relay). */
  away?: string;
  /** Optional venue note — "Field A", "Court 1", "Board B". */
  venue?: string;
  /**
   * Post-game result. Scores are optional (e.g. third-place where only the
   * winner was tracked); `winner` is the source of truth for highlighting.
   * `note` shows a small badge — "Game 7", "Sweep", "Reverse Sweep", etc.
   */
  result?: {
    homeScore?: number;
    awayScore?: number;
    winner: "home" | "away";
    note?: string;
  };
}

export interface MatchupRound {
  name: string;
  matches: MatchupMatch[];
}

export interface EventMatchup {
  /** Anchor id — referenced from Schedule rows and NAV. */
  id: string;
  name: string;
  icon: string;
  day: "Friday" | "Saturday";
  window: string;
  tier: Tier;
  /** One-line summary of how the event is run. */
  format: string;
  /** Optional note explaining where seeds come from. */
  seedingNote?: string;
  /** Optional bullet rules / clarifications. */
  notes?: string[];
  rounds: MatchupRound[];
}

const SEEDING_FROM_FLIP_CUP =
  "Seeds locked from Friday Flip Cup: #1 Clowns (6-0), #2 Snake Eyes (3-3, +6 cup diff), #3 Goons (3-3), #4 Burn Unit (0-6).";

export const MATCHUPS: EventMatchup[] = [
  {
    id: "matchup-flip-cup",
    name: "Flip Cup",
    icon: "GlassWater",
    day: "Friday",
    window: "7:15 PM – 10:00 PM",
    tier: "Major",
    format:
      "Double round-robin (12 games) → semis (best-of-7) → bronze + final. Seeds the Saturday brackets.",
    notes: [
      "Each series best-of-7. Spill your cup, you DQ. Right-hand drinking, you DQ harder.",
      "RR standings after 12 games: #1 Clowns (6-0), #2 Snake Eyes (3-3, +6 cup diff), #3 Gooners (3-3), #4 Burn Unit (0-6).",
      "Clowns went 9-0 across all series and 5-0 in Game 7s on the night.",
    ],
    rounds: [
      {
        name: "Round Robin — Pass 1",
        matches: [
          {
            time: "7:15 PM",
            label: "RR 1A",
            home: "🔥 Burn Unit",
            away: "🗽 Liberty Goons",
            result: { homeScore: 1, awayScore: 4, winner: "away" },
          },
          {
            time: "7:15 PM",
            label: "RR 1B",
            home: "🎓 Class Clowns",
            away: "🎲 Snake Eyes",
            result: { homeScore: 4, awayScore: 0, winner: "home", note: "Sweep" },
          },
          {
            time: "7:30 PM",
            label: "RR 2A",
            home: "🔥 Burn Unit",
            away: "🎓 Class Clowns",
            result: { homeScore: 1, awayScore: 4, winner: "away" },
          },
          {
            time: "7:30 PM",
            label: "RR 2B",
            home: "🗽 Liberty Goons",
            away: "🎲 Snake Eyes",
            result: { homeScore: 1, awayScore: 4, winner: "away" },
          },
          {
            time: "7:45 PM",
            label: "RR 3A",
            home: "🔥 Burn Unit",
            away: "🎲 Snake Eyes",
            result: { homeScore: 0, awayScore: 4, winner: "away", note: "Sweep" },
          },
          {
            time: "7:45 PM",
            label: "RR 3B",
            home: "🗽 Liberty Goons",
            away: "🎓 Class Clowns",
            result: { homeScore: 3, awayScore: 4, winner: "away", note: "Game 7" },
          },
        ],
      },
      {
        name: "Round Robin — Pass 2",
        matches: [
          {
            time: "8:00 PM",
            label: "RR 4A",
            home: "🔥 Burn Unit",
            away: "🗽 Liberty Goons",
            result: { homeScore: 3, awayScore: 4, winner: "away", note: "Game 7" },
          },
          {
            time: "8:00 PM",
            label: "RR 4B",
            home: "🎓 Class Clowns",
            away: "🎲 Snake Eyes",
            result: { homeScore: 4, awayScore: 3, winner: "home", note: "Game 7" },
          },
          {
            time: "8:15 PM",
            label: "RR 5A",
            home: "🔥 Burn Unit",
            away: "🎓 Class Clowns",
            result: { homeScore: 0, awayScore: 4, winner: "away", note: "Sweep" },
          },
          {
            time: "8:15 PM",
            label: "RR 5B",
            home: "🗽 Liberty Goons",
            away: "🎲 Snake Eyes",
            result: { homeScore: 4, awayScore: 3, winner: "home", note: "Game 7" },
          },
          {
            time: "8:30 PM",
            label: "RR 6A",
            home: "🔥 Burn Unit",
            away: "🎲 Snake Eyes",
            result: { homeScore: 0, awayScore: 4, winner: "away", note: "Sweep" },
          },
          {
            time: "8:30 PM",
            label: "RR 6B",
            home: "🗽 Liberty Goons",
            away: "🎓 Class Clowns",
            result: { homeScore: 3, awayScore: 4, winner: "away", note: "Game 7" },
          },
        ],
      },
      {
        name: "Semifinals",
        matches: [
          {
            time: "8:45 PM",
            label: "Semi 1",
            home: "🎓 Class Clowns",
            away: "🔥 Burn Unit",
            result: { homeScore: 4, awayScore: 2, winner: "home", note: "Reverse Sweep (0-2 → 4-2)" },
          },
          {
            time: "9:00 PM",
            label: "Semi 2",
            home: "🎲 Snake Eyes",
            away: "🗽 Liberty Goons",
            result: { homeScore: 3, awayScore: 4, winner: "away", note: "Game 7" },
          },
        ],
      },
      {
        name: "Placement",
        matches: [
          {
            time: "9:30 PM",
            label: "Bronze",
            home: "🎲 Snake Eyes",
            away: "🔥 Burn Unit",
            result: { winner: "home" },
          },
          {
            time: "9:45 PM",
            label: "FINAL",
            home: "🎓 Class Clowns",
            away: "🗽 Liberty Goons",
            result: { homeScore: 4, awayScore: 3, winner: "home", note: "Game 7 · Clowns survive 2-3 deficit" },
          },
        ],
      },
    ],
  },
  {
    id: "matchup-knockout",
    name: "Knockout",
    icon: "Zap",
    day: "Saturday",
    window: "9:00 AM – 9:30 AM",
    tier: "Major",
    format: "One free-for-all game. 4 reps per tribe (16 shooters total). Last shooter standing wins.",
    seedingNote: SEEDING_FROM_FLIP_CUP,
    notes: [
      "Player ahead shoots first. If the player behind makes their shot first, the player ahead is out.",
      "Layups, dunks, fadeaways — anything counts. No tip-outs from teammates.",
      "Tribe placement = order the last rep from each tribe is eliminated. Last tribe alive = 1st.",
    ],
    rounds: [
      {
        name: "The Game",
        matches: [
          {
            time: "9:00 AM",
            label: "Knockout",
            home: "All four tribes (4 reps each)",
            venue: "Court Kaminer",
          },
        ],
      },
    ],
  },
  {
    id: "matchup-tug-of-war",
    name: "Tug of War",
    icon: "Anchor",
    day: "Saturday",
    window: "9:30 AM – 10:30 AM",
    tier: "Major",
    format: "Single-elim bracket. Each tribe plays at least twice: semifinal + placement match.",
    seedingNote: SEEDING_FROM_FLIP_CUP,
    notes: [
      "Best 2-of-3 pulls per match. Center marker past the line = pull won.",
      "Cleats highly encouraged. Gloves recommended.",
      "5-min reset between matches.",
    ],
    rounds: [
      {
        name: "Semifinals",
        matches: [
          { time: "9:30 AM", label: "Semi 1", home: "🎓 Class Clowns", away: "🔥 Burn Unit" },
          { time: "9:45 AM", label: "Semi 2", home: "🎲 Snake Eyes", away: "🗽 Liberty Goons" },
        ],
      },
      {
        name: "Placement",
        matches: [
          { time: "10:00 AM", label: "Bronze", home: "Loser Semi 1", away: "Loser Semi 2" },
          { time: "10:15 AM", label: "FINAL", home: "Winner Semi 1", away: "Winner Semi 2" },
        ],
      },
    ],
  },
  {
    id: "matchup-base-relay",
    name: "Base Relay",
    icon: "Footprints",
    day: "Saturday",
    window: "11:10 AM – 11:30 AM (Skills Block)",
    tier: "Minor",
    format: "Sequential timed runs — 4 sprinters per tribe round the bases. Fastest aggregate wins.",
    notes: [
      "Each tribe picks 4 runners. Touch every bag — skipping is forfeit.",
      "Single best clock counts. No re-runs unless equipment fails.",
      "Slowest team owes the field a chug-off after the Skills Block.",
    ],
    rounds: [
      {
        name: "Timed Runs",
        matches: [
          { time: "11:10 AM", label: "Run 1", home: "🎓 Class Clowns" },
          { time: "11:15 AM", label: "Run 2", home: "🎲 Snake Eyes" },
          { time: "11:20 AM", label: "Run 3", home: "🗽 Liberty Goons" },
          { time: "11:25 AM", label: "Run 4", home: "🔥 Burn Unit" },
        ],
      },
    ],
  },
  {
    id: "matchup-wiffle-ball",
    name: "Wiffle Ball",
    icon: "CircleDot",
    day: "Saturday",
    window: "2:00 PM – 3:45 PM",
    tier: "Major",
    format: "3-inning games. Two semis on parallel fields, then bronze + final.",
    seedingNote: SEEDING_FROM_FLIP_CUP,
    notes: [
      "Two fields run simultaneously for the semis — bring your own ump if you want it called fair.",
      "3 innings hard cap. Mercy rule at 10 runs.",
      "Bat flips encouraged in round 1, mandatory in the final.",
    ],
    rounds: [
      {
        name: "Semifinals (parallel)",
        matches: [
          { time: "2:00 PM", label: "Semi 1", home: "🎓 Class Clowns", away: "🔥 Burn Unit", venue: "Field A" },
          { time: "2:00 PM", label: "Semi 2", home: "🎲 Snake Eyes", away: "🗽 Liberty Goons", venue: "Field B" },
        ],
      },
      {
        name: "Placement",
        matches: [
          { time: "2:40 PM", label: "Bronze", home: "Loser Semi 1", away: "Loser Semi 2", venue: "Field A" },
          { time: "3:15 PM", label: "FINAL", home: "Winner Semi 1", away: "Winner Semi 2", venue: "Field A" },
        ],
      },
    ],
  },
  {
    id: "matchup-cornhole",
    name: "Cornhole",
    icon: "Crosshair",
    day: "Saturday",
    window: "3:45 PM – 5:00 PM",
    tier: "Minor",
    format: "Doubles, first to 15. Single-elim bracket. Runs parallel to Pickleball.",
    seedingNote: SEEDING_FROM_FLIP_CUP,
    notes: [
      "Two boards in play — semis run simultaneously.",
      "Different reps from each tribe than Pickleball — no doubling up.",
      "First to 15, win by 1. Cancellation scoring.",
    ],
    rounds: [
      {
        name: "Semifinals (parallel)",
        matches: [
          { time: "3:45 PM", label: "Semi 1", home: "🎓 Class Clowns", away: "🔥 Burn Unit", venue: "Board A" },
          { time: "3:45 PM", label: "Semi 2", home: "🎲 Snake Eyes", away: "🗽 Liberty Goons", venue: "Board B" },
        ],
      },
      {
        name: "Placement",
        matches: [
          { time: "4:15 PM", label: "Bronze", home: "Loser Semi 1", away: "Loser Semi 2", venue: "Board A" },
          { time: "4:30 PM", label: "FINAL", home: "Winner Semi 1", away: "Winner Semi 2", venue: "Board A" },
        ],
      },
    ],
  },
  {
    id: "matchup-pickleball",
    name: "Pickleball",
    icon: "Volleyball",
    day: "Saturday",
    window: "3:45 PM – 5:15 PM",
    tier: "Minor",
    format: "Doubles, one game to 11 (win by 2). Bracket runs parallel to Cornhole on opposite seeding.",
    seedingNote: SEEDING_FROM_FLIP_CUP,
    notes: [
      "Two courts running simultaneously.",
      "Cross-seeded against Cornhole so no one tribe can stack both bracket sides.",
      "ATPs welcome. Foot faults are real even at camp.",
    ],
    rounds: [
      {
        name: "Semifinals (parallel)",
        matches: [
          { time: "3:45 PM", label: "Semi 1", home: "🎲 Snake Eyes", away: "🗽 Liberty Goons", venue: "Court 1" },
          { time: "3:45 PM", label: "Semi 2", home: "🎓 Class Clowns", away: "🔥 Burn Unit", venue: "Court 2" },
        ],
      },
      {
        name: "Placement",
        matches: [
          { time: "4:20 PM", label: "Bronze", home: "Loser Semi 1", away: "Loser Semi 2", venue: "Court 1" },
          { time: "4:50 PM", label: "FINAL", home: "Winner Semi 1", away: "Winner Semi 2", venue: "Court 1" },
        ],
      },
    ],
  },
  {
    id: "matchup-dodgeball",
    name: "Dodgeball",
    icon: "Bomb",
    day: "Saturday",
    window: "7:00 PM – 8:40 PM",
    tier: "Major",
    format: "Single-elim, 1v3 / 2v4 semis, then bronze + final. The Grand Finale.",
    seedingNote: SEEDING_FROM_FLIP_CUP,
    notes: [
      "Standard rules: catch = out + revive, headshot = thrower out, base/king optional.",
      "5-min match cap, last team standing wins. If both alive, side with more bodies wins.",
      "No witnesses. No prisoners. No headshots.",
    ],
    rounds: [
      {
        name: "Semifinals",
        matches: [
          { time: "7:00 PM", label: "Semi 1", home: "🎓 Class Clowns", away: "🗽 Liberty Goons" },
          { time: "7:25 PM", label: "Semi 2", home: "🎲 Snake Eyes", away: "🔥 Burn Unit" },
        ],
      },
      {
        name: "Placement",
        matches: [
          { time: "7:50 PM", label: "Bronze", home: "Loser Semi 1", away: "Loser Semi 2" },
          { time: "8:15 PM", label: "FINAL", home: "Winner Semi 1", away: "Winner Semi 2" },
        ],
      },
    ],
  },
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
  { id: "major", label: "Major Events", points: [100, 70, 40, 20], note: "Flip Cup · Knockout · Tug of War · Wiffle Ball · Dodgeball · Beer Mile" },
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
// THE CIG CHALLENGE — feature-flagged via CIG_CHALLENGE_ENABLED
//
// Each team is issued one pack at Friday's opening ceremony. Every cig left
// in the pack by closing ceremony costs the tribe 10 points. The Commissioner
// counts leftovers Saturday night and enters them in the admin panel; the
// penalty rolls into team totals automatically (delta-based, like placements).
// ---------------------------------------------------------------------------
export const CIG_CHALLENGE = {
  /** Smokes per pack issued. */
  packSize: 20,
  /** Points deducted per unsmoked cig at closing. */
  penaltyPerCig: 10,
  blurb:
    "Each tribe is issued one pack at the opening ceremony. By the closing ceremony Saturday night, every cig still in the pack costs your tribe 10 points. No re-gifting. No passing to civilians. No flushing the evidence — the Commissioner counts butts and pack contents at the fire pit.",
  rules: [
    "Each tribe receives exactly one pack at Friday's opening ceremony — 20 cigs.",
    "Every cig left in the pack at closing ceremony = −10 points to that tribe.",
    "No re-gifting to other tribes. No passing to civilians, dogs, or trees.",
    "Lit it, you smoke it down to the filter (Camp Law #4) — no half-measures.",
    "The Commissioner audits each pack at the fire pit. His count is final.",
  ],
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
