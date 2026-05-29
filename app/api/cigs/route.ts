import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCigs, setCigsForTeam, clearCigsForTeam } from "@/lib/store";
import { ADMIN_COOKIE, adminToken } from "@/lib/auth";

// Always live — no Next.js route cache.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE = { "Cache-Control": "no-store, max-age=0, must-revalidate" };

async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === (await adminToken());
}

// GET — public (already behind the site password gate via middleware).
export async function GET() {
  const cigs = await getCigs();
  return NextResponse.json(cigs, { headers: NO_STORE });
}

// PATCH — commissioner records cigs remaining for one team.
// Body: { teamId: string, remaining: number }  or  { teamId: string, clear: true }
// `remaining` is the count still left in the pack at audit time; penalty is
// auto-applied as remaining × 10 (delta vs prior).
export async function PATCH(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403, headers: NO_STORE });
  }

  const body = (await req.json().catch(() => ({}))) as {
    teamId?: string;
    remaining?: number;
    clear?: boolean;
  };

  if (!body.teamId) {
    return NextResponse.json({ error: "teamId required" }, { status: 400, headers: NO_STORE });
  }

  try {
    if (body.clear) {
      const { scores, cigs } = await clearCigsForTeam(body.teamId);
      return NextResponse.json({ scores, cigs }, { headers: NO_STORE });
    }
    if (typeof body.remaining !== "number" || !Number.isFinite(body.remaining)) {
      return NextResponse.json(
        { error: "remaining (number) required" },
        { status: 400, headers: NO_STORE },
      );
    }
    const { scores, cigs } = await setCigsForTeam(body.teamId, body.remaining);
    return NextResponse.json({ scores, cigs }, { headers: NO_STORE });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}
