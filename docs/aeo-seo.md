## AEO / technische SEO – Hausdiagnose

### Ziel
- **Indexierbarkeit**: klare, crawlbare Seiten + Sitemap/Robots.
- **AEO/LLM‑Lesbarkeit**: eindeutige Entitäten, strukturierte Daten, klare Service‑Beschreibung.
- **Stabile Defaults**: konsistente `metadataBase`, OG/Twitter, Canonicals.

### ENV
- **`NEXT_PUBLIC_SITE_URL`** (required in production): Basis‑URL inkl. Protokoll, z. B. `https://hausdiagnose.ch`
  - Wird genutzt für `metadataBase`, `robots`, `sitemap` und JSON‑LD URLs.

### Umsetzung (Technik)
- **Global Metadata**: `app/layout.tsx`
  - Default `title`, `description`, OpenGraph/Twitter Defaults
  - OG‑Image über `app/opengraph-image.tsx`
- **OG Image**: `app/opengraph-image.tsx`
  - Generiert ein `1200×630` PNG zur Laufzeit (keine Asset‑Pflege notwendig)
- **Strukturierte Daten**: `app/page.tsx`
  - `Organization`
  - `WebSite`
  - `ProfessionalService`
  - `FAQPage` (aus dem FAQ‑Inhalt der Homepage)
- **Robots / Sitemap**
  - `app/robots.ts` disallow `/api/`, `host` + `sitemap`
  - `app/sitemap.ts` listet Homepage + Unterseiten (Leistungen/Prozess/Schweiz + Rechtliches)

### Indexierbare Unterseiten
- `/leistungen/luftqualitaet`
- `/leistungen/wasserqualitaet`
- `/leistungen/schimmel-feuchte`
- `/leistungen/radon`
- `/prozess`
- `/schweiz`

### Interne Verlinkung
- Homepage verlinkt die Leistungsseiten im Block „Was wir prüfen“.
- Unterseiten verlinken zurück zur Homepage (`/#waitlist`) für Conversion.

### Lokale Checks

```bash
pnpm lint
pnpm build
pnpm dev
```

Manuelle Prüfung:
- `GET /robots.txt`
- `GET /sitemap.xml`
- `GET /opengraph-image`
- Seiten‑Metadata via Browser DevTools / „View Source“

