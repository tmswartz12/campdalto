import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRecaps, setRecap } from "@/lib/store";
import { ADMIN_COOKIE, adminToken } from "@/lib/auth";
import type { EventRecap } from "@/lib/content";

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
  const recaps = await getRecaps();
  return NextResponse.json(recaps, { headers: NO_STORE });
}

// PATCH — commissioner saves (or clears) a recap. Body:
//   { eventId: string, recap: EventRecap | null }
// Pass `recap: null` to remove the override and fall back to the static one in content.ts.
export async function PATCH(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403, headers: NO_STORE });
  }

  const body = (await req.json().catch(() => ({}))) as {
    eventId?: string;
    recap?: EventRecap | null;
  };

  if (!body.eventId) {
    return NextResponse.json({ error: "eventId required" }, { status: 400, headers: NO_STORE });
  }

  try {
    const recaps = await setRecap(body.eventId, body.recap ?? null);
    return NextResponse.json({ recaps }, { headers: NO_STORE });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}
