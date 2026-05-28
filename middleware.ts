import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_COOKIE, ADMIN_COOKIE, siteToken, adminToken } from "@/lib/auth";

// Gate the whole site behind the shared password. /admin needs the commissioner
// password on top of that.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (req.cookies.get(SITE_COOKIE)?.value !== (await siteToken())) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin")) {
    if (req.cookies.get(ADMIN_COOKIE)?.value !== (await adminToken())) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("admin", "1");
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Run on everything except the login page, the login API, and static assets.
export const config = {
  matcher: [
    "/((?!login|api/login|_next/static|_next/image|favicon.ico|grain.svg|.*\\.(?:png|jpe?g|gif|svg|ico|webp)).*)",
  ],
};
