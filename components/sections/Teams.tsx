// Server wrapper — reads the PARTICIPANTS_BLURRED env at request time and
// forwards the boolean to the client renderer. Flip the env on Vercel and
// the next page render reflects it (no rebuild needed because this section
// is force-dynamic via the parent page).

import TeamsContent from "./TeamsContent";

export default function Teams() {
  const blurred = process.env.PARTICIPANTS_BLURRED === "true";
  return <TeamsContent blurred={blurred} />;
}
