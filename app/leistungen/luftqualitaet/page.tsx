import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Luftqualität",
  description:
    "Luftqualität im Zuhause: Feinstaub, VOCs, CO₂ und relevante Innenraumfaktoren – verständlich eingeordnet, mit klaren Massnahmen.",
};

export default function LuftqualitaetPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <nav className="text-sm text-muted-foreground">
        <Link className="hover:text-foreground" href="/">
          Start
        </Link>{" "}
        <span aria-hidden>·</span>{" "}
        <Link className="hover:text-foreground" href="/leistungen/luftqualitaet">
          Luftqualität
        </Link>
      </nav>

      <h1 className="mt-6 font-heading text-3xl tracking-tight sm:text-4xl">
        Luftqualität im Zuhause
      </h1>
      <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        Innenraumluft kann durch Partikel, flüchtige organische Verbindungen (VOCs) oder dauerhaft
        erhöhte CO₂‑Werte belastet sein. Wir messen, ordnen ein und leiten konkrete Massnahmen ab –
        ohne Panikmache.
      </p>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          Typische Themen: Feinstaub (PM), VOCs/Off‑Gassing, CO₂/Lüftung, Gerüche und raumbezogene
          Faktoren. Ziel ist eine klare Priorisierung: was relevant ist und was nicht.
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

