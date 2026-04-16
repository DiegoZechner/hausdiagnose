## Backend (Waitlist) – Supabase

### Überblick
Die Waitlist wird serverseitig über die Route `POST /api/waitlist` persistiert. Die Website selbst nutzt **keine** Supabase-Secrets im Client.

### ENV (server-side)
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### Tabelle
- `public.waitlist_signups`
  - `email_normalized` ist **unique** (Duplicate Handling)

### Migration / SQL
Die SQL-Migration liegt unter:
- `supabase/migrations/20260416_0001_waitlist_signups.sql`

Ausführung:
- Supabase Dashboard → SQL Editor → Inhalt ausführen
  - oder Supabase CLI Migration (falls vorhanden)

### RLS
RLS ist **aktiviert**. Es existieren absichtlich **keine** Policies: der Insert erfolgt über den **Service Role Key** im Server.

### Verhalten / Fehlerfälle
- **Duplicate**: gleiche E‑Mail wird als `status: "exists"` behandelt (idempotent)
- **Honeypot**: Feld `company` wird wie Erfolg behandelt, aber nicht gespeichert

### Lokal testen

```bash
pnpm dev
```

Beispiel-Request:

```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "content-type: application/json" \
  -d "{\"firstName\":\"Lea\",\"email\":\"lea@example.ch\",\"region\":\"Zürich\",\"source\":\"landing\"}"
```

