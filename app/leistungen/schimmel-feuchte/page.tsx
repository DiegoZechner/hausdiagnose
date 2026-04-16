import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Schimmel & Feuchte",
  description:
    "Schimmel und Feuchte im Zuhause: Risiken erkennen, Ursachen eingrenzen und konkrete nächste Schritte ableiten – ruhig und nachvollziehbar.",
};

export default function SchimmelFeuchtePage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <nav className="text-sm text-muted-foreground">
        <Link className="hover:text-foreground" href="/">
          Start
        </Link>{" "}
        <span aria-hidden>·</span>{" "}
        <Link className="hover:text-foreground" href="/leistungen/schimmel-feuchte">
          Schimmel &amp; Feuchte
        </Link>
      </nav>

      <h1 className="mt-6 font-heading text-3xl tracking-tight sm:text-4xl">
        Schimmel &amp; Feuchte
      </h1>
      <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        Feuchtigkeit und Schimmel entstehen oft schleichend – und nicht immer sichtbar. Wir helfen
        dabei, Risiken einzuordnen und sinnvolle nächste Schritte abzuleiten.
      </p>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          Typische Themen: Kondensation, Lüftung/Heizen, Wärmebrücken, versteckte Feuchte. Ziel ist
          eine pragmatische Einordnung: Was ist wahrscheinlich, was ist dringend, was ist optional?
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

