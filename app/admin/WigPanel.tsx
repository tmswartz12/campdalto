"use client";
// Commissioner adds a new wig wearer: name + photo (+ optional occasion).
// Photos go to Vercel Blob via /api/upload, then the entry is persisted via
// /api/wig. Existing wearers list below, with a Remove button each.

import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, Plus, Trash2 } from "lucide-react";
import type { WigWearer } from "@/lib/store";

interface Props {
  onFlash: (text: string, kind: "ok" | "err") => void;
}

export default function WigPanel({ onFlash }: Props) {
  const [wig, setWig] = useState<WigWearer[]>([]);
  const [name, setName] = useState("");
  const [occasion, setOccasion] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [previewBroken, setPreviewBroken] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const initialLoad = useRef(false);

  const fetchWig = useCallback(async () => {
    const res = await fetch("/api/wig", { cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as WigWearer[];
    setWig(data);
  }, []);

  useEffect(() => {
    if (initialLoad.current) return;
    initialLoad.current = true;
    fetchWig();
  }, [fetchWig]);

  useEffect(() => {
    setPreviewBroken(false);
  }, [imageSrc]);

  function resetForm() {
    setName("");
    setOccasion("");
    setImageSrc("");
    setImageAlt("");
  }

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || `HTTP ${res.status}`);
      setImageSrc(data.url);
      onFlash("Photo uploaded — add the name + click Add", "ok");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      onFlash(`Photo upload failed: ${message}`, "err");
      console.error("Wig upload failed", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function add() {
    const trimmedName = name.trim();
    const trimmedSrc = imageSrc.trim();
    if (!trimmedName || !trimmedSrc) {
      onFlash("Need both a name and a photo", "err");
      return;
    }
    setAdding(true);
    try {
      const res = await fetch("/api/wig", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          imageSrc: trimmedSrc,
          imageAlt: imageAlt.trim() || undefined,
          occasion: occasion.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { wig: WigWearer[] };
      setWig(data.wig);
      resetForm();
      onFlash("Wig wearer added", "ok");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add";
      onFlash(message, "err");
      console.error("Add wig wearer failed", err);
    } finally {
      setAdding(false);
    }
  }

  async function remove(entry: WigWearer) {
    if (!confirm(`Remove ${entry.name} from the wig carousel?`)) return;
    setPendingId(entry.id);
    try {
      const res = await fetch(`/api/wig?id=${encodeURIComponent(entry.id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { wig: WigWearer[] };
      setWig(data.wig);
      onFlash(`Removed ${entry.name}`, "ok");
    } catch (err) {
      onFlash("Failed to remove", "err");
      console.error("Remove wig wearer failed", err);
    } finally {
      setPendingId(null);
    }
  }

  const canAdd = name.trim().length > 0 && imageSrc.trim().length > 0 && !adding;

  return (
    <div className="bg-paper border border-ink/8 rounded-2xl p-6 mb-12">
      <div className="flex items-baseline justify-between mb-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Wig of Shame
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {wig.length} wearer{wig.length === 1 ? "" : "s"}
        </p>
      </div>
      <p className="text-[13px] text-muted mb-6 leading-relaxed">
        Add a name + photo every time the wig changes heads. Newest entries lead the
        public carousel.
      </p>

      {/* Add form */}
      <div className="rounded-xl border border-ink/10 bg-bone px-4 py-4 mb-6 space-y-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        <div className="grid sm:grid-cols-[1fr_1fr] gap-3">
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-1.5 block">
              Name
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Patryk"
              className={inputCls}
              disabled={adding}
            />
          </label>
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-1.5 block">
              Occasion (optional)
            </span>
            <input
              type="text"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder="Slowest in chug-off after Tug of War"
              className={inputCls}
              disabled={adding}
            />
          </label>
        </div>

        <div className="grid sm:grid-cols-[auto_1fr] gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || adding}
            className="inline-flex items-center justify-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em] font-semibold bg-ink hover:bg-forest text-bone px-3 py-2 rounded-lg transition-colors disabled:opacity-40"
          >
            {uploading ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <ImagePlus size={12} />
            )}
            {uploading ? "Uploading…" : imageSrc ? "Replace photo" : "Upload photo"}
          </button>
          <input
            type="text"
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            placeholder="…or paste an image URL"
            className={inputCls}
            disabled={adding || uploading}
          />
        </div>

        <input
          type="text"
          value={imageAlt}
          onChange={(e) => setImageAlt(e.target.value)}
          placeholder="Alt text (e.g. 'Patryk wearing the wig at the fire pit')"
          className={inputCls}
          disabled={adding}
        />

        {imageSrc && !previewBroken && (
          <div className="rounded-lg overflow-hidden border border-ink/10 bg-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={imageAlt}
              onError={() => setPreviewBroken(true)}
              className="block w-full max-h-64 object-cover"
            />
          </div>
        )}
        {imageSrc && previewBroken && (
          <p className="font-mono text-[11px] text-clay leading-snug border border-clay/30 bg-clay/[0.06] rounded-lg px-3 py-2">
            That URL didn&apos;t load as an image. Use the upload button instead.
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={add}
            disabled={!canAdd}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em] font-semibold bg-clay hover:bg-clay/85 text-bone px-3.5 py-2 rounded-md transition-colors disabled:opacity-40"
          >
            {adding ? <Loader2 size={11} className="animate-spin" /> : <Plus size={11} />}
            Add to carousel
          </button>
        </div>
      </div>

      {/* Existing list */}
      {wig.length === 0 ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted/70 text-center py-6">
          No wig wearers yet
        </p>
      ) : (
        <ul className="space-y-2">
          {wig.map((entry) => {
            const isPending = pendingId === entry.id;
            return (
              <li
                key={entry.id}
                className="flex items-center gap-3 border border-ink/10 bg-bone rounded-lg p-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={entry.imageSrc}
                  alt={entry.imageAlt ?? ""}
                  className="w-14 h-14 object-cover rounded-md border border-ink/10 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[15px] font-semibold text-ink leading-snug truncate">
                    {entry.name}
                  </p>
                  {entry.occasion && (
                    <p className="text-[12px] text-muted leading-snug truncate">
                      {entry.occasion}
                    </p>
                  )}
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40 mt-0.5">
                    {new Date(entry.addedAt).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(entry)}
                  disabled={isPending}
                  aria-label={`Remove ${entry.name}`}
                  className="shrink-0 p-2 text-ink/50 hover:text-clay hover:bg-clay/10 rounded-md transition-colors disabled:opacity-40"
                >
                  {isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const inputCls =
  "w-full bg-paper border border-ink/15 rounded-lg text-ink text-[13px] px-3 py-2 focus:outline-none focus:border-ink/50 disabled:opacity-40";
