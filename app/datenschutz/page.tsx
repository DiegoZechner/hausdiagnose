import type { Metadata } from "next";
import Link from "next/link";

import { WAITLIST_CONSENT_LABEL, WAITLIST_CONSENT_VERSION } from "@/lib/legal/waitlist-consent";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzhinweise von Hausdiagnose — Warteliste, Hosting, Cookies, Rechte.",
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Datenschutz</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Diese Hinweise beschreiben die aktuelle, technisch sichtbare Datenverarbeitung dieser Website (Stand:
        Pilotvorbereitung). Mit dem öffentlichen Launch wird die rechtliche Einordnung gegen das revidierte
        Datenschutzgesetz (DSG) geprüft und an dieser Stelle finalisiert.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Markt: Schweiz / deutschsprachige Schweiz (de‑CH). Sollten Personen im EWR aktiv angesprochen werden, werden
        die zusätzlichen DSGVO‑Pflichtangaben (Art. 13/14 DSGVO) zu diesem Zeitpunkt aufgenommen.
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed">
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-heading text-base font-semibold tracking-tight">Verantwortliche Stelle</h2>
          <p className="mt-2 text-muted-foreground">
            Hausdiagnose, vertreten durch das Pilotprojekt-Team. Kontakt:{" "}
            <a className="underline underline-offset-2" href="mailto:kontakt@hausdiagnose.ch">
              kontakt@hausdiagnose.ch
            </a>
            . Eine eingetragene juristische Person besteht aktuell noch nicht und wird mit dem öffentlichen Launch
            ergänzt.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm" id="warteliste">
          <h2 className="font-heading text-base font-semibold tracking-tight">
            Warteliste (Kernfunktion dieser Website)
          </h2>
          <p className="mt-2 text-muted-foreground">
            Über <span className="text-foreground">POST /api/waitlist</span> können Sie sich für Launch‑Informationen
            eintragen. Die Verarbeitung erfolgt serverseitig; es werden keine Datenbank‑Schlüssel im Browser
            verwendet.
          </p>

          <h3 className="mt-4 font-heading text-sm font-semibold tracking-tight text-foreground">Zwecke</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Wartelisten‑Verwaltung und Kontaktaufnahme zum Launch (Raum Zürich)</li>
            <li>Versand einer Bestätigungs‑E‑Mail nach erfolgreichem Eintrag</li>
            <li>Missbrauchsschutz (technische Begrenzung von Anfragen)</li>
          </ul>

          <h3 className="mt-4 font-heading text-sm font-semibold tracking-tight text-foreground">
            Kategorien personenbezogener Daten
          </h3>
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
              <span className="text-foreground">Quelle</span> (technisches Feld, z.&nbsp;B. <code>landing</code>)
            </li>
            <li>
              <span className="text-foreground">Einwilligung Launch‑Kommunikation</span> (Checkbox; Pflicht):{" "}
              <span className="text-foreground">consent_launch_emails = true</span>
            </li>
            <li>
              <span className="text-foreground">Einwilligungsnachweis</span>: gespeichert werden{" "}
              <span className="text-foreground">consent_text_version</span> (aktuell{" "}
              <code>{WAITLIST_CONSENT_VERSION}</code>) und{" "}
              <span className="text-foreground">consent_recorded_at</span> (Zeitpunkt laut Server‑Uhr,
              ISO‑Zeitstempel)
            </li>
            <li>
              <span className="text-foreground">IP‑Adresse (gehasht)</span>: aus der Verbindung wird optional ein{" "}
              <span className="text-foreground">SHA‑256‑Hash</span> der IP gespeichert (nicht die Klartext‑IP)
            </li>
            <li>
              <span className="text-foreground">User‑Agent</span> (optional): Browser/Client‑Kennung als Text
            </li>
          </ul>

          <h3 className="mt-4 font-heading text-sm font-semibold tracking-tight text-foreground">
            Honeypot‑Feld (Anti‑Spam)
          </h3>
          <p className="mt-2 text-muted-foreground">
            Das Formular enthält ein für Menschen unsichtbares Feld <code>company</code>. Wenn dieses Feld befüllt
            ist, antwortet der Server wie bei einer erfolgreichen Anmeldung, speichert aber{" "}
            <span className="text-foreground">keine</span> personenbezogenen Daten und versendet keine
            Bestätigungs‑E‑Mail.
          </p>

          <h3 className="mt-4 font-heading text-sm font-semibold tracking-tight text-foreground">
            Bestätigungs‑E‑Mail
          </h3>
          <p className="mt-2 text-muted-foreground">
            Nach einer erfolgreichen, erstmaligen Anmeldung versendet ein serverseitiger Mail‑Dienst über SMTP eine
            Bestätigung an die angegebene Adresse. Bei einer wiederholten Anmeldung mit derselben E‑Mail wird keine
            erneute Bestätigung versendet.
          </p>

          <h3 className="mt-4 font-heading text-sm font-semibold tracking-tight text-foreground">
            Speicherort / Infrastruktur
          </h3>
          <p className="mt-2 text-muted-foreground">
            Die Daten werden in einer Datenbank bei <span className="text-foreground">Supabase</span> (Cloud)
            gespeichert. Der Zugriff erfolgt ausschliesslich serverseitig über einen{" "}
            <span className="text-foreground">Service Role Key</span> (nicht im Browser). Die konkrete Region und
            ergänzende AVV‑Dokumentation werden mit dem Markteintritt veröffentlicht.
          </p>

          <h3 className="mt-4 font-heading text-sm font-semibold tracking-tight text-foreground">
            Aufbewahrung / Löschung
          </h3>
          <p className="mt-2 text-muted-foreground">
            Wartelistendaten werden verarbeitet, solange sie für Launch‑Kommunikation und den Nachweis der
            Einwilligung erforderlich sind. Nach Launch oder Widerruf werden sie gelöscht oder in ein separates
            System überführt.
          </p>

          <h3 className="mt-4 font-heading text-sm font-semibold tracking-tight text-foreground">Rechtsgrundlagen</h3>
          <p className="mt-2 text-muted-foreground">
            Für Launch‑E‑Mails liegt eine ausdrückliche{" "}
            <span className="text-foreground">Einwilligung</span> vor (Checkbox). Für technische Schutzmechanismen
            (Rate‑Limit, IP‑Hash) bestehen je nach Ausgestaltung zusätzliche Grundlagen, die mit dem Launch konkret
            zugeordnet werden.
          </p>

          <p className="mt-3 text-xs text-muted-foreground">
            Einwilligungskontext (UI): <span className="text-foreground">{WAITLIST_CONSENT_LABEL}</span> — Version{" "}
            <code>{WAITLIST_CONSENT_VERSION}</code>.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-heading text-base font-semibold tracking-tight">Hosting / Server‑Logs</h2>
          <p className="mt-2 text-muted-foreground">
            Beim Aufruf der Website verarbeitet der Hosting‑Anbieter typischerweise technische Daten (z.&nbsp;B.
            IP‑Adresse, Zeitstempel, angeforderte Ressource). Umfang und Speicherdauer hängen vom Hosting ab und
            werden mit dem Launch konkretisiert.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm" id="cookies">
          <h2 className="font-heading text-base font-semibold tracking-tight">
            Cookies / Tracking / Drittanbieter‑Skripte
          </h2>
          <p className="mt-2 text-muted-foreground">
            In der aktuellen Codebasis sind <span className="text-foreground">keine</span> Analytics‑Pixels,
            Werbe‑Tags oder eingebetteten Drittanbieter‑Medien aktiv, die nicht‑essenzielle Cookies setzen würden.
            Es gibt deshalb <span className="text-foreground">keinen</span> Cookie‑Banner.
          </p>
          <p className="mt-2 text-muted-foreground">
            Sollten künftig Mess‑ oder Marketing‑Tools eingebunden werden, wird Consent (Einwilligung,
            Zweckbindung, Dokumentation) entsprechend ergänzt — inkl. Banner mit „Ablehnen / Anpassen“.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm" id="rechte">
          <h2 className="font-heading text-base font-semibold tracking-tight">Rechte betroffener Personen</h2>
          <p className="mt-2 text-muted-foreground">
            Sie können je nach anwendbarem Recht Auskunft, Berichtigung, Löschung, Datenübertragbarkeit oder
            Einschränkung der Verarbeitung verlangen sowie Widerspruch erheben (soweit anwendbar). Für die
            Warteliste genügt eine kurze E‑Mail mit Betreff „Datenschutz / Warteliste“ an{" "}
            <a className="underline underline-offset-2" href="mailto:kontakt@hausdiagnose.ch">
              kontakt@hausdiagnose.ch
            </a>
            .
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm" id="hinweise">
          <h2 className="font-heading text-base font-semibold tracking-tight">
            Hinweise zur Einordnung (kein medizinisches Angebot)
          </h2>
          <p className="mt-2 text-muted-foreground">
            Hausdiagnose fokussiert auf das Wohnumfeld und ersetzt keine medizinische Diagnostik oder Therapie.
            Wenn Sie Symptome oder gesundheitliche Risiken einordnen möchten, wenden Sie sich bitte an
            medizinische Fachpersonen.
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
