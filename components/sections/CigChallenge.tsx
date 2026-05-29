// Server wrapper — gates the section on CIG_CHALLENGE_ENABLED. Returns null
// when the flag is off so the section doesn't render at all (no anchor, no nav
// surface area). Flip the env on Vercel and redeploy to enable.

import CigChallengeContent from "./CigChallengeContent";

export default function CigChallenge() {
  const enabled = process.env.CIG_CHALLENGE_ENABLED === "true";
  if (!enabled) return null;
  return <CigChallengeContent />;
}
