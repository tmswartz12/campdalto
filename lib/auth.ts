// Lightweight password gate. Two levels:
//   - SITE_PASSWORD  : everyone in the party uses this to view the site
//   - ADMIN_PASSWORD : just you ("the commissioner") to update the scoreboard
//
// Passwords are never stored in cookies — we store a SHA-256 token derived from
// the password instead. Set real values in your Vercel env vars (see .env.example).
// The defaults below only exist so the site runs locally out of the box.

const SITE_PASSWORD = process.env.SITE_PASSWORD || "freebird";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "commissioner";

export const SITE_COOKIE = "camp_auth";
export const ADMIN_COOKIE = "camp_admin";

// Works in both the Edge runtime (middleware) and Node (route handlers).
async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const siteToken = () => sha256("camp-dalto::site::" + SITE_PASSWORD);
export const adminToken = () => sha256("camp-dalto::admin::" + ADMIN_PASSWORD);

export const checkSitePassword = (pw: unknown) => typeof pw === "string" && pw === SITE_PASSWORD;
export const checkAdminPassword = (pw: unknown) => typeof pw === "string" && pw === ADMIN_PASSWORD;
