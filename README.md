# Camp Dalto — Bachelor Olympics Website

A surprise bachelor party weekend site for Rob Dalto. Password-gated, fully responsive, and built for an evening of fun.

## Running locally

```bash
npm install
cp .env.example .env.local   # set your passwords
npm run dev                  # → http://localhost:3000
```

Default local passwords (set in `.env.local`):
- **Site password**: `freebird`
- **Admin password**: `commissioner`

Hit `/login` to enter as a guest. Hit `/login?admin=1` to enter as the commissioner.

## Where to edit content

**Everything you'll want to change is in `lib/content.ts`.**

Search for `[PLACEHOLDER]` to find the stubs:

| What | Location |
|---|---|
| Party dates | `EVENT_INFO.dates` |
| Team names, mottos, rosters | `TEAMS[]` |
| Rob's tribute paragraph | `HONORED.blurb` |
| Camp rules (wooden sign) | `RULES[]` |

## Adding Rob's photo

1. Drop a square image at `public/rob.jpg`
2. In `lib/content.ts`, set `HONORED.hasPhoto = true`

## Live scoreboard

The `/admin` page (commissioner-only) lets you set or adjust scores for each team. The scoreboard section auto-polls every 15s.

**For scores to persist across deploys and sync across devices:**

1. In the Vercel dashboard, go to **Storage → Create → Blob**
2. Connect the store to your project — Vercel injects `BLOB_READ_WRITE_TOKEN` automatically
3. Redeploy

Scores are stored as a single JSON document at `campdalto/scores.json` in the Blob store. Without the token, scores live in memory per serverless instance and reset on deploy. Fine for testing, not ideal for the party.

## Deploy to Vercel

```bash
# One-time setup
npx vercel login
npx vercel link       # connects to the campdalto project

# Push a deploy
npx vercel --prod
```

Set environment variables in **Vercel → Project → Settings → Environment Variables**:
- `SITE_PASSWORD` — what you text to guests
- `ADMIN_PASSWORD` — your commissioner password  
- (`BLOB_READ_WRITE_TOKEN` is injected automatically after connecting the Blob store)

## Folder structure

```
app/
  page.tsx          ← main one-pager
  layout.tsx        ← fonts, metadata
  globals.css       ← Tailwind + textures
  login/page.tsx    ← password gate
  admin/page.tsx    ← commissioner scoreboard
  api/
    login/          ← sets auth cookies
    logout/         ← clears cookies
    scores/         ← GET scores, PATCH to update
components/
  ui/               ← Nav, PennantRow, WoodenSign, BadgeCard, Icon, SectionHeader
  sections/         ← one file per section
lib/
  content.ts        ← ALL editable copy
  auth.ts           ← cookie / password logic
  store.ts          ← Vercel Blob or in-memory score storage
middleware.ts       ← enforces password gate on every route
public/
  grain.svg         ← aged print texture overlay
```
