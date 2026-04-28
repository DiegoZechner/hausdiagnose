import type { Metadata } from "next";
import Link from "next/link";

import { WAITLIST_CONSENT_LABEL, WAITLIST_CONSENT_VERSION } from "@/lib/legal/waitlist-consent";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzhinweise von Hausdiagnose.",
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Datenschutz</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Diese Hinweise beschreiben die aktuelle, technisch sichtbare Datenverarbeitung in dieser Website (Stand: Codebase
        / Launch‑Vorbereitung). <span className="text-foreground">TODO (Rechtsberatung):</span> finale Prüfung gegen das
        revidierte Datenschutzgesetz (DSG) und das revidierte Bundesgesetz über den Datenschutz (FADP), inkl. allfälliger
        Auftragsverarbeitung, Unterauftragsverarbeiter und interner Prozesse.
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        <span className="text-foreground">Hinweis Markt:</span> Fokus Schweiz / deutschsprachige Schweiz (de‑CH).{" "}
        <span className="text-foreground">TODO:</span> Falls ihr bewusst Personen im EWR ansprecht oder Mess‑/Analyse‑
        Dienstleister dort einsetzt, prüft zusätzlich DSGVO‑Pflichtangaben (Art. 13/14 DSGVO) und dokumentiert
        Rechtsgrundlagen/Transfers.
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed">
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-medium">Verantwortliche Stelle</h2>
          <p className="mt-2 text-muted-foreground">
            <span className="text-foreground">TODO:</span> Name und Kontakt der verantwortlichen Person oder
            Organisation (identisch mit Impressum).
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm" id="warteliste">
          <h2 className="text-sm font-medium">Warteliste (Kernfunktion dieser Website)</h2>
          <p className="mt-2 text-muted-foreground">
            Über <span className="text-foreground">POST /api/waitlist</span> kannst du dich für Launch‑Informationen
            eintragen. Die Verarbeitung erfolgt serverseitig; es werden keine Supabase‑Secrets im Browser verwendet.
          </p>

          <h3 className="mt-4 text-sm font-medium text-foreground">Zwecke</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Wartelisten‑Verwaltung und Kontaktaufnahme zum Launch (Raum Zürich)</li>
            <li>Missbrauchsschutz (technische Begrenzung von Anfragen)</li>
          </ul>

          <h3 className="mt-4 text-sm font-medium text-foreground">Kategorien personenbezogener Daten</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>
              <span className="text-foreground">Vorname</span> (Pflichtfeld)
            </li>
            <li>
              <span className="text-foreground">Nachname</span> (Pflichtfeld)
            </li>
            <li>
              <span className="text-foreground">Region</span> (Pflichtfeld; freies Textfeld)
            </li>
            <li>
              <span className="text-foreground">E‑Mail‑Adresse</span> (Pflichtfeld; wird serverseitig normalisiert)
            </li>
            <li>
              <span className="text-foreground">Telefonnummer</span> (optional)
            </li>
            <li>
              <span className="text-foreground">Nachricht</span> (optional; freies Textfeld)
            </li>
            <li>
              <span className="text-foreground">Quelle</span> (technisches Feld, z. B. <code>landing</code>)
            </li>
            <li>
              <span className="text-foreground">Einwilligung Launch‑Kommunikation</span> (Checkbox; Pflicht):{" "}
              <span className="text-foreground">consent_launch_emails = true</span>
            </li>
            <li>
              <span className="text-foreground">Einwilligungsnachweis</span>: gespeichert werden{" "}
              <span className="text-foreground">consent_text_version</span> (aktuell{" "}
              <code>{WAITLIST_CONSENT_VERSION}</code>) und <span className="text-foreground">consent_recorded_at</span>{" "}
              (Zeitpunkt laut Server‑Uhr, ISO‑Zeitstempel)
            </li>
            <li>
              <span className="text-foreground">IP‑Adresse (gehasht)</span>: aus der Verbindung wird optional ein{" "}
              <span className="text-foreground">SHA‑256‑Hash</span> der IP gespeichert (nicht die Klartext‑IP)
            </li>
            <li>
              <span className="text-foreground">User‑Agent</span> (optional): Browser/Client‑Kennung als Text
            </li>
          </ul>

          <h3 className="mt-4 text-sm font-medium text-foreground">Honeypot‑Feld (Anti‑Spam)</h3>
          <p className="mt-2 text-muted-foreground">
            Das Formular enthält ein für Menschen unsichtbares Feld <code>company</code>. Wenn dieses Feld befüllt ist,
            antwortet der Server wie bei einer erfolgreichen Anmeldung, speichert aber <span className="text-foreground">keine</span>{" "}
            personenbezogenen Daten (Bot‑Schutz ohne „False Error“ für Crawler).
          </p>

          <h3 className="mt-4 text-sm font-medium text-foreground">Speicherort / Infrastruktur</h3>
          <p className="mt-2 text-muted-foreground">
            Die Daten werden in einer Datenbank bei <span className="text-foreground">Supabase</span> gespeichert
            (Cloud‑Infrastruktur). Technisch erfolgt der Zugriff über einen serverseitigen{" "}
            <span className="text-foreground">Service Role Key</span> (nicht im Browser).{" "}
            <span className="text-foreground">TODO:</span> konkrete Region/AVV‑Dokumentation gemäss eurem Supabase‑Setup
            und internem Vendormanagement.
          </p>

          <h3 className="mt-4 text-sm font-medium text-foreground">Aufbewahrung / Löschung (Ansatz)</h3>
          <p className="mt-2 text-muted-foreground">
            Wartelistendaten werden verarbeitet, solange sie für Launch‑Kommunikation und Nachweis der Einwilligung
            erforderlich sind. Nach Launch oder Widerruf sollen sie gemäss internem Datenlebenszyklus gelöscht oder in ein
            separates System überführt werden. <span className="text-foreground">TODO:</span> konkrete Fristen und
            Verantwortlichkeiten (Löschkonzept) finalisieren.
          </p>

          <h3 className="mt-4 text-sm font-medium text-foreground">Rechtsgrundlagen (Transparenz)</h3>
          <p className="mt-2 text-muted-foreground">
            Für Launch‑E‑Mails liegt eine <span className="text-foreground">Einwilligung</span> vor (Checkbox). Für
            technische Schutzmechanismen können je nach Ausgestaltung zusätzliche Grundlagen in Betracht kommen.{" "}
            <span className="text-foreground">TODO (Rechtsberatung):</span> finale Zuordnung nach DSG/FADP inkl.
            Dokumentation.
          </p>

          <p className="mt-3 text-xs text-muted-foreground">
            Einwilligungskontext (UI): <span className="text-foreground">{WAITLIST_CONSENT_LABEL}</span> — Version{" "}
            <code>{WAITLIST_CONSENT_VERSION}</code>.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-medium">Hosting / Server‑Logs</h2>
          <p className="mt-2 text-muted-foreground">
            Beim Aufruf der Website verarbeitet dein Hosting‑Anbieter typischerweise technische Daten (z. B. IP‑Adresse,
            Zeitstempel, angeforderte Ressource). Umfang und Speicherdauer hängen vom Hosting ab.{" "}
            <span className="text-foreground">TODO:</span> Vercel/Hosting‑Hinweise und ggf. Log‑Retention konkretisieren.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm" id="cookies">
          <h2 className="text-sm font-medium">Cookies / Tracking / Drittanbieter‑Skripte</h2>
          <p className="mt-2 text-muted-foreground">
            In der aktuellen Codebasis sind <span className="text-foreground">keine</span> Analytics‑Pixels, Werbe‑Tags
            oder eingebetteten Drittanbieter‑Medien erkennbar, die nicht‑essenzielle Cookies setzen würden. Es gibt
            deshalb <span className="text-foreground">keinen</span> Cookie‑Banner als UX‑Pflicht aus diesem Repo‑Stand.
          </p>
          <p className="mt-2 text-muted-foreground">
            <span className="text-foreground">TODO:</span> Sobald ihr Mess‑/Marketing‑Tools aktiviert, müsst ihr Consent,
            Zweckbindung und Dokumentation nachziehen (und ggf. einen Banner mit „Ablehnen/Anpassen“ implementieren).
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm" id="rechte">
          <h2 className="text-sm font-medium">Rechte betroffener Personen</h2>
          <p className="mt-2 text-muted-foreground">
            Du kannst je nach anwendbarem Recht Auskunft, Berichtigung, Löschung, Datenübertragbarkeit oder
            Einschränkung der Verarbeitung verlangen sowie Widerspruch erheben (soweit anwendbar). Für die Warteliste
            genügt in der Regel eine E‑Mail mit Betreff „Datenschutz / Warteliste“.
          </p>
          <p className="mt-2 text-muted-foreground">
            <span className="text-foreground">TODO:</span> zentrale Kontaktadresse für Datenschutzanfragen (kann identisch
            mit Impressum‑Kontakt sein).
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm" id="hinweise">
          <h2 className="text-sm font-medium">Hinweise zur Einordnung (kein medizinisches Angebot)</h2>
          <p className="mt-2 text-muted-foreground">
            Hausdiagnose fokussiert auf das Wohnumfeld und ersetzt keine medizinische Diagnostik oder Therapie. Wenn du
            Symptome oder gesundheitliche Risiken einordnen willst, wende dich an medizinische Fachpersonen.
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
