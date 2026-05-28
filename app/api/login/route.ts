import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  checkSitePassword,
  checkAdminPassword,
  siteToken,
  adminToken,
  SITE_COOKIE,
  ADMIN_COOKIE,
} from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { password, mode } = body as { password?: string; mode?: string };

  const isAdmin = mode === "admin";

  if (isAdmin) {
    if (!checkAdminPassword(password)) {
      return NextResponse.json({ error: "Wrong password, Commissioner." }, { status: 401 });
    }
    const token = await adminToken();
    const sToken = await siteToken();
    const jar = await cookies();
    jar.set(SITE_COOKIE, sToken, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
    jar.set(ADMIN_COOKIE, token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
    return NextResponse.json({ ok: true, redirect: "/admin" });
  }

  if (!checkSitePassword(password)) {
    return NextResponse.json({ error: "That's not the password, champ." }, { status: 401 });
  }

  const token = await siteToken();
  const jar = await cookies();
  jar.set(SITE_COOKIE, token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return NextResponse.json({ ok: true, redirect: "/" });
}
