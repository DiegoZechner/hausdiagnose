## Backend (Waitlist) – Supabase

### Überblick
Die Waitlist wird serverseitig über die Route `POST /api/waitlist` persistiert. Die Website selbst nutzt **keine** Supabase-Secrets im Client.

### ENV (server-side)
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### ENV (öffentlich, aber server-relevant)
- `NEXT_PUBLIC_SITE_URL` (https), u.a. für Same-Origin Checks (`Origin` Header) in `POST /api/waitlist`

### ENV (optional, empfohlen für Vercel Production)
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Ohne Upstash Credentials nutzt die Route einen **In‑Memory** Rate Limiter (ok für lokal, nicht zuverlässig über Serverless‑Instanzen hinweg).

### Tabelle
- `public.waitlist_signups`
  - `email_normalized` ist **unique** (Duplicate Handling)
  - `consent_launch_emails` (boolean), `consent_text_version` (text), `consent_recorded_at` (timestamptz)

### Migration / SQL
Die SQL-Migration liegt unter:
- `supabase/migrations/20260416_0001_waitlist_signups.sql`
- `supabase/migrations/20260419_0002_waitlist_consent.sql`

Ausführung:
- Supabase Dashboard → SQL Editor → Inhalt ausführen
  - oder Supabase CLI Migration (falls vorhanden)

### RLS
RLS ist **aktiviert**. Es existieren absichtlich **keine** Policies: der Insert erfolgt über den **Service Role Key** im Server.

### Verhalten / Fehlerfälle
- **Duplicate**: gleiche E‑Mail wird als `status: "exists"` behandelt (idempotent)
- **Honeypot**: Feld `company` wird wie Erfolg behandelt, aber nicht gespeichert
- **Einwilligung**: Checkbox ist Pflicht; serverseitig werden Einwilligungsversion + Zeitpunkt persistiert

### Lokal testen

```bash
pnpm dev
```

Beispiel-Request:

```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "content-type: application/json" \
  -d "{\"firstName\":\"Lea\",\"email\":\"lea@example.ch\",\"region\":\"Zürich\",\"source\":\"landing\",\"consentLaunchEmails\":true,\"consentTextVersion\":\"2026-04-19-waitlist-v1\"}"
```

