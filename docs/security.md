## Security – Hausdiagnose (Next.js)

### Ziele
- Sinnvolle **Default-Schutzmaßnahmen** für eine öffentliche Landingpage.
- **Formular-Backend** (`/api/waitlist`) robust gegen triviale Angriffe/Fehlverhalten.
- **Keine Secrets im Client** (Supabase Service Role bleibt serverseitig).

### Security Headers
Implementiert via `proxy.ts` (für CSP mit Nonce pro Request).

Enthalten:
- **CSP** (mit `nonce` für JSON‑LD Scripts)
- **Referrer-Policy**: `strict-origin-when-cross-origin`
- **X-Content-Type-Options**: `nosniff`
- **Permissions-Policy**: Kamera/Mikro/Geo/Payment deaktiviert
- **X-Frame-Options** + `frame-ancestors 'none'`
- **HSTS** (nur in Produktion)
- **COOP/CORP**: `same-origin`

### CSP Details
Die Seite nutzt inline **JSON‑LD** `<script>` Tags. Damit CSP ohne `unsafe-inline` möglich bleibt, wird ein **per-request nonce** erzeugt und in den Script-Tags gesetzt.

Relevante Dateien:
- `proxy.ts`
- `lib/security/headers.ts`
- `app/page.tsx` (JSON‑LD Scripts mit `nonce`)

### Waitlist API Hardening
Route: `app/api/waitlist/route.ts`

Maßnahmen:
- **Method Guard**: nur `POST`, andere Methoden → `405`
- **Content-Type Check**: nur `application/json` → sonst `415`
- **Payload Limit**: 8KB (`413` bei zu groß)
- **Robustes JSON Parsing**: klare `400/413` Fehler
- **Pragmatischer Origin-Check**: wenn `Origin` vorhanden, muss er zur Site-Origin passen
- **Rate Limiting**: Adapter mit **Upstash (optional)**; Fallback **in‑memory** (nur begrenzt geeignet für verteilte Deployments)
- **Honeypot**: wird als Erfolg behandelt, aber nicht gespeichert (bestehend im Handler)

### Secret Hygiene
- `SUPABASE_SERVICE_ROLE_KEY` wird **nur serverseitig** verwendet (`lib/supabase/server.ts`).
- Keine `NEXT_PUBLIC_*` Supabase Keys.

### Tests
- Security headers & CSP-Builder: `tests/security.test.ts`
- Waitlist Handler Cases: `tests/waitlist-handler.test.ts`

### Lokale Checks

```bash
pnpm lint
pnpm test
pnpm build
```

