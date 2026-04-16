import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Schweiz",
  description:
    "Warum Homecheck in der Schweiz besonders relevant ist: Radon, hartes Wasser, Altbauten und regionale Belastungen – strukturiert eingeordnet.",
};

export default function SchweizPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <nav className="text-sm text-muted-foreground">
        <Link className="hover:text-foreground" href="/">
          Start
        </Link>{" "}
        <span aria-hidden>·</span>{" "}
        <Link className="hover:text-foreground" href="/schweiz">
          Schweiz
        </Link>
      </nav>

      <h1 className="mt-6 font-heading text-3xl tracking-tight sm:text-4xl">
        Warum das auch in der Schweiz relevant ist
      </h1>
      <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        Auch in der Schweiz gibt es spezifische Risikofaktoren, die im Alltag oft unterschätzt
        werden. Homecheck ordnet diese Faktoren nachvollziehbar ein.
      </p>

      <ul className="mt-8 space-y-3 text-sm text-muted-foreground sm:text-base">
        {[
          "Radon — je nach Region relevant; Entscheidung für Messung wird oft aufgeschoben.",
          "Hartes Wasser — hohe Kalkbelastung in weiten Teilen der Schweiz.",
          "Altbauten — Feuchte/Schimmelrisiken und mögliche Schadstoffe in älteren Gebäuden.",
          "PFAS — Belastungen rund um einzelne Industriestandorte.",
        ].map((t) => (
          <li key={t} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--brand)]" />
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
        Ziel ist eine strukturierte Einordnung in einem Besuch – inklusive klarer Prioritäten und
        Massnahmen.
      </p>

      <div className="mt-10">
        <Link
          className="inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--brand)] px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-[color:var(--brand-hover)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
          href="/#waitlist"
        >
          Warteliste öffnen
        </Link>
      </div>
    </main>
  );
}

