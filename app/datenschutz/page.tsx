import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzhinweise von Hausdiagnose.",
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Datenschutz
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Diese Datenschutzhinweise sind ein Platzhalter für die Launch‑Phase.
        Bitte ersetze sie durch eine rechtlich geprüfte Version (CH/DSG, ggf.
        EU/DSGVO), inkl. Verantwortlicher, Hosting, Analytics, Kontaktformular
        und Aufbewahrungsfristen.
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed">
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-medium">Warteliste (Kernfunktion)</h2>
          <p className="mt-2 text-muted-foreground">
            Für die Warteliste verarbeiten wir Vorname und E‑Mail. Eine Region
            ist optional. Zweck: Kontaktaufnahme zum Launch und Planung der
            Angebotsausrichtung. Rechtsgrundlage: Einwilligung bzw. berechtigtes
            Interesse (je nach finaler juristischer Ausgestaltung).
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-medium">Datensparsamkeit</h2>
          <p className="mt-2 text-muted-foreground">
            Wir fragen bewusst nur das Nötigste ab. Für den Missbrauchsschutz
            kann serverseitig eine technische IP‑Prüfung/Ratelimitierung
            erfolgen.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-medium">Speicherdauer</h2>
          <p className="mt-2 text-muted-foreground">
            Wartelistendaten werden bis zum Launch (oder bis zum Widerruf)
            gespeichert und danach gemäß finalem Prozess gelöscht oder in ein
            Kunden-/Interessenten-System überführt.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-medium">Kontakt</h2>
          <p className="mt-2 text-muted-foreground">
            Für Auskunft, Berichtigung oder Löschung: [kontakt@…]
          </p>
        </section>

        <div className="pt-2">
          <Link className="text-sm underline underline-offset-2" href="/">
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}

