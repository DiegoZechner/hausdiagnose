import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wasserqualität",
  description:
    "Wasserqualität im Zuhause: Indikatoren, mögliche Belastungen und klare Massnahmen – verständlich eingeordnet, ohne Übertreibungen.",
};

export default function WasserqualitaetPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <nav className="text-sm text-muted-foreground">
        <Link className="hover:text-foreground" href="/">
          Start
        </Link>{" "}
        <span aria-hidden>·</span>{" "}
        <Link className="hover:text-foreground" href="/leistungen/wasserqualitaet">
          Wasserqualität
        </Link>
      </nav>

      <h1 className="mt-6 font-heading text-3xl tracking-tight sm:text-4xl">
        Wasserqualität im Zuhause
      </h1>
      <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        Leitungswasser ist meist gut, aber nicht überall gleich. Wir prüfen relevante Indikatoren,
        ordnen sie verständlich ein und zeigen Massnahmen – pragmatisch und nachvollziehbar.
      </p>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          Themen können je nach Situation variieren (z. B. Gebäude, Leitungen, Region). Ziel ist eine
          klare Priorisierung: Was ist relevant – und was nicht?
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

