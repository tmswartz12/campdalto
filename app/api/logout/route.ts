import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SITE_COOKIE, ADMIN_COOKIE } from "@/lib/auth";

export async function POST() {
  const jar = await cookies();
  jar.delete(SITE_COOKIE);
  jar.delete(ADMIN_COOKIE);
  return NextResponse.json({ ok: true });
}
