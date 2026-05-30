// Admin-only image upload → Vercel Blob. Returns a public, stable URL that
// can be dropped straight into a recap (or anywhere else). Files are placed
// under `campdalto/recap-images/` with a random suffix so re-uploading the
// same filename never overwrites a prior image.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { put } from "@vercel/blob";
import { ADMIN_COOKIE, adminToken } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

const NO_STORE = { "Cache-Control": "no-store, max-age=0, must-revalidate" };
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "image/heif",
]);
const MAX_BYTES = 8 * 1024 * 1024; // 8MB cap (Vercel serverless body limit ~4.5MB; bigger files should compress first)

async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === (await adminToken());
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403, headers: NO_STORE });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "Missing `file` field" },
        { status: 400, headers: NO_STORE },
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type || "unknown"}` },
        { status: 400, headers: NO_STORE },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `File too large — max ${MAX_BYTES / 1024 / 1024}MB` },
        { status: 400, headers: NO_STORE },
      );
    }

    const safeName = (file.name || "upload")
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .slice(0, 64);
    const path = `campdalto/recap-images/${safeName}`;
    const blob = await put(path, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });

    return NextResponse.json({ url: blob.url }, { headers: NO_STORE });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500, headers: NO_STORE });
  }
}
