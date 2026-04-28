import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prozess",
  description:
    "So läuft der Hausdiagnose‑Homecheck ab: Termin vereinbaren, Analyse vor Ort (3–4 Stunden) und schriftlicher Report mit Prioritäten und Massnahmen innerhalb von 10 Werktagen.",
};

const STEPS = [
  {
    n: "1",
    t: "Termin vereinbaren",
    d: "Wir kommen zu Ihnen nach Hause. Vorab klären wir kurz, was bei Ihnen relevant ist.",
  },
  {
    n: "2",
    t: "Analyse vor Ort",
    d: "Systematische Messung und Aufnahme zentraler Parameter — Luft, Wasser, Feuchte, Radon. In der Regel 3–4 Stunden.",
  },
  {
    n: "3",
    t: "Report mit Prioritäten",
    d: "Innerhalb von 10 Werktagen: schriftliche Bewertung, Prioritäten und konkrete Massnahmen.",
  },
] as const;

export default function ProzessPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <nav className="text-sm text-muted-foreground">
        <Link className="hover:text-foreground" href="/">
          Start
        </Link>{" "}
        <span aria-hidden>·</span>{" "}
        <Link className="hover:text-foreground" href="/prozess">
          Prozess
        </Link>
      </nav>

      <h1 className="mt-6 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">In drei Schritten zur Klarheit</h1>
      <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        Termin vereinbaren, vor Ort prüfen, schriftlicher Report mit Prioritäten und Massnahmen.
      </p>

      <ol className="mt-10 grid gap-4">
        {STEPS.map((x) => (
          <li
            key={x.n}
            className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground font-heading text-sm font-semibold text-background shadow-sm">
              {x.n}
            </div>
            <div>
              <div className="font-heading text-base font-semibold tracking-tight text-foreground">{x.t}</div>
              <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{x.d}</div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          className="inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--brand)] px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-[color:var(--brand-hover)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
          href="/#waitlist"
        >
          Auf die Warteliste
        </Link>
        <Link
          className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-5 text-sm font-medium text-foreground shadow-sm transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30"
          href="/"
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
