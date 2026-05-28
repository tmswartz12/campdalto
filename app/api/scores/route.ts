import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getScores, adjustScore, setScore, resetScores } from "@/lib/store";
import { ADMIN_COOKIE, adminToken } from "@/lib/auth";

async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === (await adminToken());
}

// GET — public (already behind the site password gate via middleware)
export async function GET() {
  const scores = await getScores();
  return NextResponse.json(scores);
}

// PATCH — commissioner adjusts/sets scores
export async function PATCH(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await req.json().catch(() => ({})) as {
    teamId?: string;
    delta?: number;
    value?: number;
    reset?: boolean;
  };

  if (body.reset) return NextResponse.json(await resetScores());
  if (!body.teamId) return NextResponse.json({ error: "teamId required" }, { status: 400 });

  if (typeof body.value === "number") {
    return NextResponse.json(await setScore(body.teamId, body.value));
  }
  if (typeof body.delta === "number") {
    return NextResponse.json(await adjustScore(body.teamId, body.delta));
  }

  return NextResponse.json({ error: "provide delta or value" }, { status: 400 });
}
