// Wig of Shame — public list, admin-only mutations.
//   GET     /api/wig           → public, sorted newest first
//   POST    /api/wig           → admin, { name, imageSrc, imageAlt?, occasion? }
//   DELETE  /api/wig?id=…      → admin, drop one entry
// Images themselves get uploaded via /api/upload first; this route just stores
// the URL alongside the name.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { addWigWearer, getWigWearers, removeWigWearer } from "@/lib/store";
import { ADMIN_COOKIE, adminToken } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE = { "Cache-Control": "no-store, max-age=0, must-revalidate" };

async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === (await adminToken());
}

export async function GET() {
  const wig = await getWigWearers();
  return NextResponse.json(wig, { headers: NO_STORE });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403, headers: NO_STORE });
  }

  const body = (await req.json().catch(() => ({}))) as {
    name?: string;
    imageSrc?: string;
    imageAlt?: string;
    occasion?: string;
  };

  try {
    const wig = await addWigWearer({
      name: body.name ?? "",
      imageSrc: body.imageSrc ?? "",
      imageAlt: body.imageAlt,
      occasion: body.occasion,
    });
    return NextResponse.json({ wig }, { headers: NO_STORE });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to add wig wearer";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403, headers: NO_STORE });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id query param required" }, { status: 400, headers: NO_STORE });
  }

  try {
    const wig = await removeWigWearer(id);
    return NextResponse.json({ wig }, { headers: NO_STORE });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to remove wig wearer";
    return NextResponse.json({ error: message }, { status: 400, headers: NO_STORE });
  }
}
