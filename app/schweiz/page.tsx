import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Warum in der Schweiz",
  description:
    "Warum Hausdiagnose in der Schweiz besonders relevant ist: Radon, hartes Wasser, Altbauten und regionale Belastungen — strukturiert eingeordnet.",
};

export default function SchweizPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <nav className="text-sm text-muted-foreground">
        <Link className="hover:text-foreground" href="/">
          Start
        </Link>{" "}
        <span aria-hidden>·</span>{" "}
        <Link className="hover:text-foreground" href="/schweiz">
          Schweiz
        </Link>
      </nav>

      <h1 className="mt-6 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        Warum gerade in der Schweiz
      </h1>
      <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        Auch in der Schweiz gibt es spezifische Risikofaktoren, die im Alltag oft unterschätzt werden. Hausdiagnose
        ordnet diese Faktoren systematisch ein — pragmatisch und nachvollziehbar.
      </p>

      <ul className="mt-8 space-y-3 text-sm text-muted-foreground sm:text-base">
        {[
          "Radon — die Schweiz gehört im europäischen Vergleich zu den Ländern mit erhöhter Radon‑Exposition; regional sehr unterschiedlich. Eine Einschätzung ohne Messung ist nicht möglich.",
          "Hartes Wasser — hohe Kalkbelastung in weiten Teilen der Schweiz. Für Hausinstallationen und Wasserqualität ein relevanter Indikator.",
          "Altbauten — Feuchte, Schimmelrisiken und mögliche Schadstoffe in älteren Gebäuden. Besonders wichtig vor Renovationen oder bei Neubezug.",
          "PFAS — Forschungsarbeiten dokumentieren lokale Belastungen rund um einzelne Industriestandorte.",
        ].map((t) => (
          <li key={t} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--brand)]" />
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
        Ziel ist eine strukturierte Einordnung in einem Termin — mit klaren Prioritäten und Massnahmen.
      </p>

      <div className="mt-10">
        <Link
          className="inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--brand)] px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-[color:var(--brand-hover)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
          href="/#waitlist"
        >
          Auf die Warteliste
        </Link>
      </div>
    </main>
  );
}
