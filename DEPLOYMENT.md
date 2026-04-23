# Deployment (Vercel) — Hausdiagnose

This repo is a **Next.js App Router** project in `hausdiagnose-redesign/`.

## Common reasons for a Vercel `404 NOT_FOUND`

- **Wrong Root Directory**: If the Git repo root is not the Next app, set Vercel **Root Directory** to `hausdiagnose-redesign`.
- **Framework mismatch**: Project type should be **Next.js** (Vercel auto-detect usually works).
- **Output mode**: Do not force `next export` / static export. This app expects the default Next server output.
- **Domain not linked**: Production domain assigned to a different Vercel project/environment.
- **Build failed earlier**: Vercel may still show a generic 404 for broken deployments — check the latest deployment logs.

## Required environment variables

### `NEXT_PUBLIC_SITE_URL` (public)

- Must be a valid **`https://...`** origin on **Vercel preview + production**.
- Used for: `metadataBase`, canonical URLs, `robots.txt`, `sitemap.xml`, JSON‑LD URLs, and the waitlist **Origin** check.
- For **Preview deployments**, set this to the preview URL (or your stable preview domain), otherwise the waitlist POST may be rejected when the browser `Origin` does not match.

### Supabase (server-only)

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### Optional: distributed rate limiting (recommended in production)

If unset, the API falls back to **in-memory** limiting (fine for local dev; **not durable** on serverless).

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Create an Upstash Redis database and paste the REST credentials.

## Build / run commands (repo)

```bash
pnpm install
pnpm lint
pnpm test
pnpm build
pnpm start
```

## Database migrations

Apply SQL in order:

- `supabase/migrations/20260416_0001_waitlist_signups.sql`
- `supabase/migrations/20260419_0002_waitlist_consent.sql`

## Manual Vercel checklist

- **Root Directory**: `hausdiagnose-redesign`
- **Install command**: `pnpm install` (or default if detected)
- **Build command**: `pnpm build`
- **Node**: match local major version if possible
- **Env vars**: set for *Production* and *Preview* as needed
- **Domains**: production domain points to this project; preview URL works
