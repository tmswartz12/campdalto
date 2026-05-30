"use client";
// Commissioner-authored recaps. One collapsible editor per event.
// Saving writes to the recaps blob; the public Events section overrides the
// static content.ts recap with whatever's stored here. Clearing the override
// falls back to the static one (or no recap, if none was defined).

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ImagePlus, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import {
  EVENTS,
  TEAMS,
  type CampEvent,
  type EventRecap,
  type RecapStanding,
  type Tier,
} from "@/lib/content";

type RecapsMap = Record<string, EventRecap>;

interface Props {
  onFlash: (text: string, kind: "ok" | "err") => void;
}

const TIER_DOT: Record<Tier, string> = {
  Major: "bg-clay",
  Minor: "bg-slate",
  Side: "bg-moss",
  Bonus: "bg-sun",
};

// Convert a recap body[] into a single textarea string (paragraphs separated by blank lines).
const bodyToText = (body: string[]) => body.join("\n\n");
const textToBody = (text: string) =>
  text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

// Default standings rows (one per team) for a fresh draft.
const defaultStandings = (): RecapStanding[] =>
  TEAMS.map((t, i) => ({
    medal: ["🥇", "🥈", "🥉", "4️⃣"][i] ?? "•",
    team: t.name,
    points: 0,
  }));

interface DraftState {
  headline: string;
  subhead: string;
  dateline: string;
  bodyText: string;
  closing: string;
  imageSrc: string;
  imageAlt: string;
  standings: RecapStanding[];
}

const emptyDraft = (): DraftState => ({
  headline: "",
  subhead: "",
  dateline: "CAMP DALTO",
  bodyText: "",
  closing: "",
  imageSrc: "",
  imageAlt: "",
  standings: defaultStandings(),
});

function recapToDraft(r: EventRecap): DraftState {
  return {
    headline: r.headline,
    subhead: r.subhead,
    dateline: r.dateline ?? "",
    bodyText: bodyToText(r.body),
    closing: r.closing ?? "",
    imageSrc: r.image?.src ?? "",
    imageAlt: r.image?.alt ?? "",
    standings: r.standings ? r.standings.map((s) => ({ ...s })) : defaultStandings(),
  };
}

function draftToRecap(d: DraftState): EventRecap {
  const out: EventRecap = {
    headline: d.headline.trim(),
    subhead: d.subhead.trim(),
    body: textToBody(d.bodyText),
  };
  if (d.dateline.trim()) out.dateline = d.dateline.trim();
  if (d.closing.trim()) out.closing = d.closing.trim();
  if (d.imageSrc.trim()) out.image = { src: d.imageSrc.trim(), alt: d.imageAlt.trim() };
  const standings = d.standings
    .map((s) => ({
      medal: s.medal.trim(),
      team: s.team.trim(),
      points: Number(s.points) || 0,
    }))
    .filter((s) => s.medal && s.team);
  if (standings.length > 0) out.standings = standings;
  return out;
}

export default function RecapPanel({ onFlash }: Props) {
  const [recaps, setRecaps] = useState<RecapsMap>({});
  const [drafts, setDrafts] = useState<Record<string, DraftState>>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const [pendingEvent, setPendingEvent] = useState<string | null>(null);
  const initialLoad = useRef(false);

  const fetchRecaps = useCallback(async () => {
    const res = await fetch("/api/recaps", { cache: "no-store" });
    if (!res.ok) return;
    const data: RecapsMap = await res.json();
    setRecaps(data);
    // Seed drafts from stored overrides; static defaults will lazy-fill on open.
    const seeded: Record<string, DraftState> = {};
    for (const [id, r] of Object.entries(data)) seeded[id] = recapToDraft(r);
    setDrafts(seeded);
  }, []);

  useEffect(() => {
    if (initialLoad.current) return;
    initialLoad.current = true;
    fetchRecaps();
  }, [fetchRecaps]);

  function openEditor(event: CampEvent) {
    if (openId === event.id) {
      setOpenId(null);
      return;
    }
    setDrafts((prev) => {
      if (prev[event.id]) return prev;
      // Lazy seed: prefer stored override, then static recap, then empty.
      const base = recaps[event.id] ?? event.recap;
      return { ...prev, [event.id]: base ? recapToDraft(base) : emptyDraft() };
    });
    setOpenId(event.id);
  }

  function updateDraft(eventId: string, patch: Partial<DraftState>) {
    setDrafts((prev) => ({ ...prev, [eventId]: { ...prev[eventId], ...patch } }));
  }

  function updateStanding(eventId: string, idx: number, patch: Partial<RecapStanding>) {
    setDrafts((prev) => {
      const draft = prev[eventId];
      const standings = draft.standings.map((s, i) => (i === idx ? { ...s, ...patch } : s));
      return { ...prev, [eventId]: { ...draft, standings } };
    });
  }

  function addStanding(eventId: string) {
    setDrafts((prev) => {
      const draft = prev[eventId];
      return {
        ...prev,
        [eventId]: {
          ...draft,
          standings: [...draft.standings, { medal: "", team: "", points: 0 }],
        },
      };
    });
  }

  function removeStanding(eventId: string, idx: number) {
    setDrafts((prev) => {
      const draft = prev[eventId];
      return {
        ...prev,
        [eventId]: {
          ...draft,
          standings: draft.standings.filter((_, i) => i !== idx),
        },
      };
    });
  }

  async function save(event: CampEvent) {
    const draft = drafts[event.id];
    if (!draft) return;
    const recap = draftToRecap(draft);
    if (!recap.headline || !recap.subhead || recap.body.length === 0) {
      onFlash("Recap needs a headline, subhead, and body", "err");
      return;
    }
    setPendingEvent(event.id);
    try {
      const res = await fetch("/api/recaps", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event.id, recap }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { recaps: RecapsMap };
      setRecaps(data.recaps);
      // Sync the draft to whatever the server returned (sanitization may have trimmed things).
      const stored = data.recaps[event.id];
      if (stored) updateDraft(event.id, recapToDraft(stored));
      onFlash("Recap saved", "ok");
    } catch (err) {
      onFlash("Failed to save recap", "err");
      console.error("Save recap failed", err);
    } finally {
      setPendingEvent(null);
    }
  }

  async function clearOverride(event: CampEvent) {
    if (
      !confirm(
        event.recap
          ? "Clear your edits and fall back to the default recap in content.ts?"
          : "Clear this recap?",
      )
    ) {
      return;
    }
    setPendingEvent(event.id);
    try {
      const res = await fetch("/api/recaps", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event.id, recap: null }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { recaps: RecapsMap };
      setRecaps(data.recaps);
      // Reseed the draft from the static recap (or empty).
      updateDraft(event.id, event.recap ? recapToDraft(event.recap) : emptyDraft());
      onFlash("Override cleared", "ok");
    } catch (err) {
      onFlash("Failed to clear", "err");
      console.error("Clear recap failed", err);
    } finally {
      setPendingEvent(null);
    }
  }

  return (
    <div className="bg-paper border border-ink/8 rounded-2xl p-6 mb-12">
      <div className="flex items-baseline justify-between mb-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Event recaps
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {Object.keys(recaps).length} authored
        </p>
      </div>
      <p className="text-[13px] text-muted mb-6 leading-relaxed">
        Write the post-event writeup. Saving pushes the recap live to the public Events section
        within ~15s. Clearing falls back to the default recap baked into content.ts (if any).
      </p>

      <div className="space-y-3">
        {EVENTS.map((event) => {
          const isOpen = openId === event.id;
          const hasOverride = !!recaps[event.id];
          const hasDefault = !!event.recap;
          const isPending = pendingEvent === event.id;
          const draft = drafts[event.id];

          return (
            <div
              key={event.id}
              className={`border rounded-xl transition-colors ${
                hasOverride
                  ? "border-ink/20 bg-bone"
                  : hasDefault
                    ? "border-ink/10 bg-bone/60"
                    : "border-ink/8 bg-bone/40"
              }`}
            >
              <button
                type="button"
                onClick={() => openEditor(event)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${TIER_DOT[event.tier]}`}
                    aria-hidden="true"
                  />
                  <h3 className="display text-base font-semibold text-ink tracking-editorial truncate">
                    {event.name}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {event.tier}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasOverride ? (
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                      Live · custom
                    </span>
                  ) : hasDefault ? (
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      Default
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      Empty
                    </span>
                  )}
                  <ChevronDown
                    size={14}
                    className={`text-ink/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {isOpen && draft && (
                <div className="border-t border-ink/8 px-4 py-5 space-y-4">
                  <Field label="Headline" hint="Big screaming top line — emoji OK.">
                    <input
                      type="text"
                      value={draft.headline}
                      onChange={(e) => updateDraft(event.id, { headline: e.target.value })}
                      placeholder="👑 CLOWNS CROWNED KINGS OF THE CUP"
                      className={inputCls}
                      disabled={isPending}
                    />
                  </Field>

                  <Field label="Subhead" hint="One-line dek under the headline.">
                    <input
                      type="text"
                      value={draft.subhead}
                      onChange={(e) => updateDraft(event.id, { subhead: e.target.value })}
                      placeholder="Undefeated Champs Survive 0-2 Hole…"
                      className={inputCls}
                      disabled={isPending}
                    />
                  </Field>

                  <Field label="Dateline" hint='Newspaper-style location. Leave blank to omit.'>
                    <input
                      type="text"
                      value={draft.dateline}
                      onChange={(e) => updateDraft(event.id, { dateline: e.target.value })}
                      placeholder="CAMP DALTO"
                      className={inputCls}
                      disabled={isPending}
                    />
                  </Field>

                  <Field label="Body" hint="Separate paragraphs with a blank line.">
                    <textarea
                      value={draft.bodyText}
                      onChange={(e) => updateDraft(event.id, { bodyText: e.target.value })}
                      rows={8}
                      placeholder={
                        "In a championship final…\n\nThe Clowns finished the night undefeated…"
                      }
                      className={`${inputCls} font-body leading-relaxed`}
                      disabled={isPending}
                    />
                  </Field>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        Standings
                      </p>
                      <button
                        type="button"
                        onClick={() => addStanding(event.id)}
                        disabled={isPending}
                        className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.15em] text-ink/70 hover:text-ink border border-ink/10 hover:border-ink/30 px-2 py-1 rounded-md transition-colors disabled:opacity-40"
                      >
                        <Plus size={11} /> Row
                      </button>
                    </div>
                    <div className="space-y-2">
                      {draft.standings.map((s, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-[60px_1fr_80px_auto] gap-2 items-center"
                        >
                          <input
                            type="text"
                            value={s.medal}
                            onChange={(e) =>
                              updateStanding(event.id, idx, { medal: e.target.value })
                            }
                            placeholder="🥇"
                            className={`${inputCls} text-center`}
                            disabled={isPending}
                            aria-label={`Standing ${idx + 1} medal`}
                          />
                          <input
                            type="text"
                            value={s.team}
                            onChange={(e) =>
                              updateStanding(event.id, idx, { team: e.target.value })
                            }
                            placeholder="CLOWNS"
                            className={inputCls}
                            disabled={isPending}
                            aria-label={`Standing ${idx + 1} team`}
                          />
                          <input
                            type="number"
                            value={s.points}
                            onChange={(e) =>
                              updateStanding(event.id, idx, {
                                points: Number(e.target.value),
                              })
                            }
                            placeholder="100"
                            className={`${inputCls} tabular-nums`}
                            disabled={isPending}
                            aria-label={`Standing ${idx + 1} points`}
                          />
                          <button
                            type="button"
                            onClick={() => removeStanding(event.id, idx)}
                            disabled={isPending}
                            aria-label={`Remove standing row ${idx + 1}`}
                            className="p-1.5 text-ink/40 hover:text-clay transition-colors disabled:opacity-40"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Field label="Closing" hint="Tease for what's next. Optional.">
                    <textarea
                      value={draft.closing}
                      onChange={(e) => updateDraft(event.id, { closing: e.target.value })}
                      rows={2}
                      placeholder="Olympics resume Saturday morning…"
                      className={inputCls}
                      disabled={isPending}
                    />
                  </Field>

                  <ImageField
                    src={draft.imageSrc}
                    alt={draft.imageAlt}
                    disabled={isPending}
                    onSrcChange={(src) => updateDraft(event.id, { imageSrc: src })}
                    onAltChange={(alt) => updateDraft(event.id, { imageAlt: alt })}
                    onFlash={onFlash}
                  />

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-ink/8">
                    {(hasOverride || (!hasDefault && draft.headline)) && (
                      <button
                        type="button"
                        onClick={() => clearOverride(event)}
                        disabled={isPending}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-muted hover:text-clay border border-ink/10 hover:border-clay/40 px-3 py-1.5 rounded-md transition-colors disabled:opacity-40"
                      >
                        <Trash2 size={11} />
                        {hasDefault ? "Reset to default" : "Clear"}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => save(event)}
                      disabled={isPending}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em] font-semibold bg-ink hover:bg-forest text-bone px-3 py-1.5 rounded-md transition-colors disabled:opacity-40"
                    >
                      {isPending ? (
                        <Loader2 size={11} className="animate-spin" />
                      ) : (
                        <Save size={11} />
                      )}
                      Save recap
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const inputCls =
  "w-full bg-bone border border-ink/15 rounded-lg text-ink text-[13px] px-3 py-2 focus:outline-none focus:border-ink/50 disabled:opacity-40";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {label}
        </span>
        {hint && <span className="text-[10px] text-ink/40">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function ImageField({
  src,
  alt,
  disabled,
  onSrcChange,
  onAltChange,
  onFlash,
}: {
  src: string;
  alt: string;
  disabled: boolean;
  onSrcChange: (src: string) => void;
  onAltChange: (alt: string) => void;
  onFlash: (text: string, kind: "ok" | "err") => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewBroken, setPreviewBroken] = useState(false);

  // Reset the broken-preview flag any time the URL changes — give the new src a chance.
  useEffect(() => {
    setPreviewBroken(false);
  }, [src]);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      onSrcChange(data.url);
      onFlash("Image uploaded — remember to Save the recap", "ok");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      onFlash(`Image upload failed: ${message}`, "err");
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Image (optional)
        </span>
        <span className="text-[10px] text-ink/40">
          Upload to blob (recommended) or paste a direct URL
        </span>
      </div>

      <div className="grid sm:grid-cols-[auto_1fr] gap-2 mb-2">
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
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || uploading}
          className="inline-flex items-center justify-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em] font-semibold bg-ink hover:bg-forest text-bone px-3 py-2 rounded-lg transition-colors disabled:opacity-40"
        >
          {uploading ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <ImagePlus size={12} />
          )}
          {uploading ? "Uploading…" : src ? "Replace image" : "Upload image"}
        </button>
        <input
          type="text"
          value={src}
          onChange={(e) => onSrcChange(e.target.value)}
          placeholder="…or paste a direct image URL"
          className={inputCls}
          disabled={disabled || uploading}
        />
      </div>

      <input
        type="text"
        value={alt}
        onChange={(e) => onAltChange(e.target.value)}
        placeholder="Alt text (for screen readers)"
        className={`${inputCls} mb-2`}
        disabled={disabled}
      />

      {src && !previewBroken && (
        <div className="relative rounded-lg overflow-hidden border border-ink/10 bg-bone">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onError={() => setPreviewBroken(true)}
            className="block w-full max-h-64 object-cover"
          />
        </div>
      )}
      {src && previewBroken && (
        <p className="font-mono text-[11px] text-clay leading-snug border border-clay/30 bg-clay/[0.06] rounded-lg px-3 py-2">
          That URL didn&apos;t load as an image. Most likely it&apos;s a share-link
          (Google Photos / Drive) or a path with no file behind it. Use the upload
          button above to drop the photo straight into Vercel Blob.
        </p>
      )}
    </div>
  );
}
