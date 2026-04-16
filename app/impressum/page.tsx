import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Hausdiagnose.",
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Impressum
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Dieses Impressum ist ein Platzhalter für die Launch‑Phase. Bitte trage
        hier die rechtlich korrekten Angaben ein (Firma/Name, Adresse, Kontakt,
        UID, Vertretungsberechtigte, etc.).
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed">
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-medium">Anbieter</h2>
          <div className="mt-2 text-muted-foreground">
            <div>Hausdiagnose (Marke)</div>
            <div>[Rechtsform / Name]</div>
            <div>[Adresse]</div>
            <div>[PLZ Ort]</div>
            <div>[Land]</div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-medium">Kontakt</h2>
          <div className="mt-2 text-muted-foreground">
            <div>E‑Mail: [kontakt@…]</div>
            <div>Telefon: [optional]</div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-medium">Haftungsausschluss</h2>
          <p className="mt-2 text-muted-foreground">
            Inhalte dieser Website dienen der Information und stellen keine
            medizinische Beratung oder Diagnose dar. Bei gesundheitlichen
            Beschwerden wende dich bitte an medizinische Fachpersonen.
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

