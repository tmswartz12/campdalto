import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getResults, setPlacements } from "@/lib/store";
import { ADMIN_COOKIE, adminToken } from "@/lib/auth";
import type { EventPlacements } from "@/lib/content";

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
  const results = await getResults();
  return NextResponse.json(results, { headers: NO_STORE });
}

// PATCH — commissioner saves placements for one event. Body:
//   { eventId: string, placements: { first?, second?, third?, fourth? } }
// `placements` values are team ids. Missing keys are treated as "not set yet".
// Pass an empty placements object to clear an event (refunds its points).
export async function PATCH(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403, headers: NO_STORE });
  }

  const body = (await req.json().catch(() => ({}))) as {
    eventId?: string;
    placements?: EventPlacements;
  };

  if (!body.eventId) {
    return NextResponse.json({ error: "eventId required" }, { status: 400, headers: NO_STORE });
  }

  try {
    const { scores, results } = await setPlacements(body.eventId, body.placements ?? {});
    return NextResponse.json({ scores, results }, { headers: NO_STORE });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}
