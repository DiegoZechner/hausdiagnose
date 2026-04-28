import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Hausdiagnose.",
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Impressum</h1>

      <div className="mt-4 rounded-2xl border border-border bg-[color:var(--surface-2)] p-4 text-sm leading-relaxed text-muted-foreground">
        <span className="text-foreground">Pre-Launch‑Hinweis:</span> Hausdiagnose befindet sich derzeit in der
        Pilotvorbereitung im Raum Zürich. Eine formelle Rechtsträgerschaft wird mit dem öffentlichen Launch
        eingetragen; die hier verlinkten Pflichtangaben werden zu diesem Zeitpunkt vollständig ergänzt. Bis dahin
        gilt diese Seite als provisorische Transparenzangabe nach Artikel 3 lit. s UWG.
      </div>

      <div className="mt-8 space-y-6 text-sm leading-relaxed">
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-heading text-base font-semibold tracking-tight">Diensteanbieter</h2>
          <dl className="mt-3 grid gap-3 text-muted-foreground">
            <div>
              <dt className="text-foreground">Markenname</dt>
              <dd>Hausdiagnose — Homecheck für gesundes Wohnen</dd>
            </div>
            <div>
              <dt className="text-foreground">Status</dt>
              <dd>
                Pilot im Raum Zürich. Eine eingetragene juristische Person besteht derzeit noch nicht; die Angaben
                werden mit Markteintritt ergänzt.
              </dd>
            </div>
            <div>
              <dt className="text-foreground">Sitz</dt>
              <dd>Schweiz</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-heading text-base font-semibold tracking-tight">Kontakt</h2>
          <dl className="mt-3 grid gap-3 text-muted-foreground">
            <div>
              <dt className="text-foreground">E‑Mail</dt>
              <dd>
                <a className="underline underline-offset-2" href="mailto:kontakt@hausdiagnose.ch">
                  kontakt@hausdiagnose.ch
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-foreground">Telefon</dt>
              <dd>Wird mit dem Pilotstart veröffentlicht.</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-heading text-base font-semibold tracking-tight">Haftung und Inhalte</h2>
          <p className="mt-2 text-muted-foreground">
            Die Inhalte dieser Website dienen der allgemeinen Information über das geplante Angebot (Wohnumfeld /
            Homecheck im Raum Zürich, Schweiz). Trotz sorgfältiger Aufbereitung können Informationen unvollständig
            sein oder sich ändern. Genannte Quellen verlinken auf öffentlich zugängliche Forschung und auf Veröffentlichungen
            öffentlicher Gesundheitsbehörden.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm" id="hinweise">
          <h2 className="font-heading text-base font-semibold tracking-tight">
            Kein Ersatz für medizinische Fachpersonen
          </h2>
          <p className="mt-2 text-muted-foreground">
            Hausdiagnose bewertet das <span className="text-foreground">Wohnumfeld</span> (z.&nbsp;B. Luft, Wasser,
            Feuchte, Radon) und liefert keine medizinische Diagnose. Ergebnisse hängen von Messungen, Annahmen und
            den Grenzen der jeweiligen Methode ab. Bei gesundheitlichen Beschwerden oder zur Einordnung von Risiken
            wenden Sie sich bitte an medizinische Fachpersonen.
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
