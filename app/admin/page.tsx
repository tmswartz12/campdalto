// Server wrapper — reads feature flags at request time and forwards them to
// the client renderer. Flip the env on Vercel and redeploy to toggle.

import AdminClient from "./AdminClient";

export default function AdminPage() {
  const cigChallengeEnabled = process.env.CIG_CHALLENGE_ENABLED === "true";
  return <AdminClient cigChallengeEnabled={cigChallengeEnabled} />;
}
