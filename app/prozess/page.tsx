import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prozess",
  description:
    "So läuft der Homecheck ab: Termin, Analyse vor Ort (3–4 Stunden) und Bericht mit Prioritäten und Massnahmen innerhalb von 10 Werktagen.",
};

export default function ProzessPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <nav className="text-sm text-muted-foreground">
        <Link className="hover:text-foreground" href="/">
          Start
        </Link>{" "}
        <span aria-hidden>·</span>{" "}
        <Link className="hover:text-foreground" href="/prozess">
          Prozess
        </Link>
      </nav>

      <h1 className="mt-6 font-heading text-3xl tracking-tight sm:text-4xl">
        Prozess
      </h1>
      <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        Ein klarer Ablauf – damit Sie wissen, was Sie erwartet.
      </p>

      <ol className="mt-8 grid gap-6">
        <li className="flex gap-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-foreground text-sm font-semibold text-background shadow-sm">
            1
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Termin vereinbaren</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Wir kommen zu Ihnen nach Hause.
            </div>
          </div>
        </li>
        <li className="flex gap-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-foreground text-sm font-semibold text-background shadow-sm">
            2
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Analyse vor Ort</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Systematische Messung zentraler Parameter. Dauer: 3–4 Stunden.
            </div>
          </div>
        </li>
        <li className="flex gap-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-foreground text-sm font-semibold text-background shadow-sm">
            3
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Bericht &amp; Prioritäten</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Innerhalb von 10 Werktagen: Bewertung, Prioritäten, konkrete Massnahmen.
            </div>
          </div>
        </li>
      </ol>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          className="inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--brand)] px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-[color:var(--brand-hover)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
          href="/#waitlist"
        >
          Warteliste öffnen
        </Link>
        <Link className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30" href="/">
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}

