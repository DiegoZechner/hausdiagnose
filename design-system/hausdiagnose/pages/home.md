# Home Page Override — Hausdiagnose

This file overrides `design-system/hausdiagnose/MASTER.md` for the landing page.

## Style Direction (Primary)
- **Swiss Modernism 2.0**: strict hierarchy, grid discipline, calm whitespace, asymmetric balance.
- **Accessible & Ethical**: WCAG AA+ contrast, visible focus rings, 44px+ touch targets, reduced-motion support.
- **Soft UI Evolution (subtle)**: controlled material depth via hairline borders + soft shadows. No neumorphism.

## Conversion Rules
- **One primary goal**: Waitlist sign-up.
- **One primary CTA label**: “Auf die Warteliste”.
- **Hero contains the form**: user can convert without scrolling.
- Secondary actions are **text links only** (no secondary button competing with the primary CTA).

## Color Tokens (Hex)
- `--background`: `#F7F3EA` (Ivory)
- `--surface`: `#FFFCF6` (Paper)
- `--foreground`: `#121826` (Charcoal)
- `--muted-foreground`: `#46505F` (Slate)
- `--border`: `#E6E0D6` (Hairline)
- `--brand`: `#0F766E` (Petrol)
- `--brand-hover`: `#0B5E58`
- `--brand-soft`: `#E6F3F1`
- `--destructive`: `#B42318`
- `--success`: `#166534`

## Typography
- **Headings**: Newsreader (editorial trust, premium warmth)
- **Body/UI**: Source Sans 3 (accessible, neutral, highly readable)
- Keep mono for code if needed.

## Anti-Patterns (Hard No)
- Liquid glass / blur showcases / chromatic effects
- “SaaS bento grid” feature card carpets
- Multiple competing CTAs
- Low-contrast muted text
- Hover scale that shifts layout
- Generic icon wallpaper (icons: sparing, high-quality, purposeful)
- Medical claims / diagnosis promises

## Hero Composition (Mobile-first)
- Editorial “stacked paper” composition:
  - Eyebrow: launch + waitlist open
  - H1 + subcopy
  - Inline trust chips (datensparsam, kein spam, keine diagnose)
  - Inset waitlist panel
  - Minimal “signals stack” (text-first, no icon wall)

