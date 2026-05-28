import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getScores, adjustScore, setScore, resetScores } from "@/lib/store";
import { ADMIN_COOKIE, adminToken } from "@/lib/auth";

// Opt out of the Next.js route cache — scoreboard reads must always hit
// the live store, not a build/edge-cached response.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE = { "Cache-Control": "no-store, max-age=0, must-revalidate" };

async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === (await adminToken());
}

// GET — public (already behind the site password gate via middleware)
export async function GET() {
  const scores = await getScores();
  return NextResponse.json(scores, { headers: NO_STORE });
}

// PATCH — commissioner adjusts/sets scores
export async function PATCH(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403, headers: NO_STORE });
  }

  const body = (await req.json().catch(() => ({}))) as {
    teamId?: string;
    delta?: number;
    value?: number;
    reset?: boolean;
  };

  if (body.reset) {
    return NextResponse.json(await resetScores(), { headers: NO_STORE });
  }
  if (!body.teamId) {
    return NextResponse.json({ error: "teamId required" }, { status: 400, headers: NO_STORE });
  }

  if (typeof body.value === "number") {
    return NextResponse.json(await setScore(body.teamId, body.value), { headers: NO_STORE });
  }
  if (typeof body.delta === "number") {
    return NextResponse.json(await adjustScore(body.teamId, body.delta), { headers: NO_STORE });
  }

  return NextResponse.json({ error: "provide delta or value" }, { status: 400, headers: NO_STORE });
}
