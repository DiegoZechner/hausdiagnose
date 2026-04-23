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
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Impressum</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Angaben gemäss schweizerischem UWG (Transparenz / Kommerzielle Kommunikation).{" "}
        <span className="text-foreground">TODO (Rechtsberatung):</span> juristische Prüfung und Ergänzung der
        fehlenden Pflichtangaben.
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed">
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-medium">Diensteanbieter / Unternehmen</h2>
          <dl className="mt-3 grid gap-3 text-muted-foreground">
            <div>
              <dt className="text-foreground">Markenname (öffentlich)</dt>
              <dd>Hausdiagnose (Homecheck für gesundes Wohnen)</dd>
            </div>
            <div>
              <dt className="text-foreground">Rechtsträger / Firma</dt>
              <dd>
                <span className="text-foreground">TODO:</span> vollständiger Firmenname inkl. Rechtsform
              </dd>
            </div>
            <div>
              <dt className="text-foreground">UID (MwSt.)</dt>
              <dd>
                <span className="text-foreground">TODO:</span> CHE‑… (falls vorhanden)
              </dd>
            </div>
            <div>
              <dt className="text-foreground">Handelsregister / Firmennummer</dt>
              <dd>
                <span className="text-foreground">TODO:</span> Handelsregisteramt / HR‑Nummer (falls zutreffend)
              </dd>
            </div>
            <div>
              <dt className="text-foreground">Adresse (domizil / Büro)</dt>
              <dd>
                <div>
                  <span className="text-foreground">TODO:</span> Strasse/Nr.
                </div>
                <div>
                  <span className="text-foreground">TODO:</span> PLZ Ort
                </div>
                <div>Schweiz</div>
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-medium">Vertretungsberechtigte Person(en)</h2>
          <p className="mt-2 text-muted-foreground">
            <span className="text-foreground">TODO:</span> Name und Funktion der signaturberechtigten Person(en)
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-medium">Kontakt</h2>
          <dl className="mt-3 grid gap-3 text-muted-foreground">
            <div>
              <dt className="text-foreground">E‑Mail</dt>
              <dd>
                <span className="text-foreground">TODO:</span> öffentliche Kontaktadresse (z. B. kontakt@…)
              </dd>
            </div>
            <div>
              <dt className="text-foreground">Telefon</dt>
              <dd>
                <span className="text-foreground">TODO:</span> optional
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-medium">Berufsrecht / Titel (falls zutreffend)</h2>
          <p className="mt-2 text-muted-foreground">
            <span className="text-foreground">TODO:</span> anwendbare Berufsordnungen, Titel, Zulassungen (falls
            zutreffend)
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-medium">Haftung und Inhalte</h2>
          <p className="mt-2 text-muted-foreground">
            Die Inhalte dieser Website dienen der allgemeinen Information über das Angebot (Wohnumfeld / Homecheck im
            Raum Zürich, Schweiz). Trotz sorgfältiger Aufbereitung können Informationen unvollständig sein oder sich
            ändern.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm" id="hinweise">
          <h2 className="text-sm font-medium">Hinweis: kein Ersatz für medizinische Fachpersonen</h2>
          <p className="mt-2 text-muted-foreground">
            Hausdiagnose bewertet das <span className="text-foreground">Wohnumfeld</span> (z. B. Luft, Wasser, Feuchte,
            Radon) und liefert keine medizinische Diagnose. Ergebnisse hängen von Messungen, Annahmen und Grenzen der
            Methode ab. Bei gesundheitlichen Beschwerden oder zur Einordnung von Risiken wende dich an medizinische
            Fachpersonen.
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
