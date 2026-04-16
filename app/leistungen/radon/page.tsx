import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Radon",
  description:
    "Radon im Zuhause: Risiko einordnen, Messung sinnvoll planen und Massnahmen ableiten – ruhig, klar und ohne Übertreibungen.",
};

export default function RadonPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <nav className="text-sm text-muted-foreground">
        <Link className="hover:text-foreground" href="/">
          Start
        </Link>{" "}
        <span aria-hidden>·</span>{" "}
        <Link className="hover:text-foreground" href="/leistungen/radon">
          Radon
        </Link>
      </nav>

      <h1 className="mt-6 font-heading text-3xl tracking-tight sm:text-4xl">
        Radon
      </h1>
      <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        Radon ist regional unterschiedlich relevant. Wir helfen, das Risiko im Kontext Ihres
        Wohnorts und der Gebäudesituation einzuordnen – und sagen klar, wann Messen sinnvoll ist.
      </p>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          Ziel: Nicht spekulieren, sondern strukturiert entscheiden. Wenn Messung sinnvoll ist,
          unterstützen wir bei Planung und Interpretation – und leiten konkrete Massnahmen ab.
        </p>
      </section>

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

