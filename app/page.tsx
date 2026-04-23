import { Wordmark } from "@/components/brand/wordmark";
import { Container } from "@/components/landing/container";
import { Section } from "@/components/landing/section";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { TextRotate } from "@/components/ui/text-rotate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";
import Pic1 from "@/lib/Pic1.png";
import { getSiteOrigin } from "@/lib/seo/site";
import { headers } from "next/headers";
import { connection } from "next/server";

export default async function Home() {
  // Nonce-based CSP requires dynamic rendering (official Next.js model).
  await connection();
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const base = getSiteOrigin();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hausdiagnose",
    url: `${base}/`,
  } as const;

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hausdiagnose",
    url: `${base}/`,
    inLanguage: "de-CH",
  } as const;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Hausdiagnose (Homecheck)",
    url: `${base}/`,
    areaServed: "CH",
    serviceType: "Wohnumfeld-Analyse",
    description:
      "Wissenschaftliche Analyse von Luft, Wasser, Schimmel/Feuchte, Radon und weiteren Umweltfaktoren im Zuhause – mit klaren Prioritäten und Massnahmen.",
  } as const;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Ist Hausdiagnose eine medizinische Diagnose?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nein. Wir analysieren das Wohnumfeld (z. B. Luft, Wasser, Feuchte, Radon) und ersetzen keine ärztliche Abklärung.",
        },
      },
      {
        "@type": "Question",
        name: "Wie läuft die Analyse ab und wie lange dauert sie?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In der Regel: Termin, Analyse vor Ort (ca. 3–4 Stunden) und danach ein Bericht mit Bewertung und Prioritäten innerhalb von 10 Werktagen.",
        },
      },
      {
        "@type": "Question",
        name: "Welche Daten braucht ihr für die Warteliste?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vorname und E‑Mail. Region ist optional.",
        },
      },
      {
        "@type": "Question",
        name: "Wo startet ihr?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wir starten in Kürze im Raum Zürich und erweitern danach.",
        },
      },
    ],
  } as const;

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[640px] w-[1040px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(15,118,110,0.08)_0%,transparent_70%)] blur-2xl" />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-40">
          <div className="border-b border-border/70 bg-background/70 backdrop-blur">
            <Container className="flex items-center justify-between py-3">
            <Link href="/" className="group" aria-label="Zur Startseite">
              <Wordmark />
            </Link>
            <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
              <a className="hover:text-foreground" href="#problem">
                Problem
              </a>
              <a className="hover:text-foreground" href="#solution">
                Lösung
              </a>
              <a className="hover:text-foreground" href="#prozess">
                Prozess
              </a>
              <a className="hover:text-foreground" href="#schweiz">
                Schweiz
              </a>
              <a className="hover:text-foreground" href="#faq">
                FAQ
              </a>
            </nav>
            <a
              href="#waitlist"
              className="rounded-xl bg-[color:var(--brand)] px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-[color:var(--brand-hover)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
            >
              Warteliste
            </a>
            </Container>
          </div>
        </div>

        {/* Hero (full-bleed image + message) */}
        <Section className="pt-0">
          <div className="relative w-full">
            <div className="relative h-[620px] w-full sm:h-[680px] lg:h-[640px]">
              <Image
                src={Pic1}
                alt="Wohnraum-Detail — Atmosphäre für ein gesundes Zuhause"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(17,24,39,0.78),rgba(17,24,39,0.38),rgba(17,24,39,0.82))]" />
              <div className="absolute inset-0 bg-[radial-gradient(closest-side_at_70%_20%,rgba(15,118,110,0.22),transparent_60%)]" />
            </div>

            <div className="absolute inset-0 flex items-end">
              <Container className="pb-10 sm:pb-12 lg:pb-14">
                <div className="max-w-3xl">
                  <div className="text-xs font-medium tracking-wide text-white/70">
                    Start in Kürze im Raum Zürich
                  </div>
                  <h1 className="mt-3 font-heading text-balance text-4xl leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Ihr Zuhause beeinflusst Ihre Gesundheit —{" "}
                    <span className="text-[color:var(--brand)]">
                      <TextRotate
                        words={[
                          "ob Sie es merken oder nicht",
                          "was Sie täglich einatmen",
                          "was Sie täglich trinken",
                          "was Sie täglich berühren",
                        ]}
                        intervalMs={1700}
                      />
                    </span>
                    .
                  </h1>
                  <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
                    Wir analysieren Ihr Zuhause wissenschaftlich: Luft, Wasser, Schimmel und mehr — und zeigen Ihnen genau,
                    was zu tun ist.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href="#waitlist"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-medium text-[#111827] shadow-sm transition-colors transition-shadow duration-200 hover:bg-white/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                    >
                      Warteliste öffnen
                    </a>
                    <a
                      href="#solution"
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 text-sm font-medium text-white shadow-sm backdrop-blur transition-colors transition-shadow duration-200 hover:bg-white/14 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
                    >
                      So arbeitet Homecheck
                    </a>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </Section>

        {/* 1) Problem */}
        <Section id="problem">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                  Unsichtbare Belastungen im Zuhause sind real — und bleiben oft unbemerkt.
                </h2>
                <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Wir verbringen sehr viel Zeit in Innenräumen, prüfen das Wohnumfeld aber selten systematisch.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      t: "Schlechte Luftqualität",
                      d: "Feinstaub, VOCs, CO₂ und mehr.",
                    },
                    {
                      t: "Schimmel & Feuchte",
                      d: "Hinter Wänden, in Ecken, in Bauteilen.",
                    },
                    {
                      t: "Leitungswasser",
                      d: "Indikatoren wie Schwermetalle oder PFAS.",
                    },
                    {
                      t: "Radon",
                      d: "Regional unterschiedlich relevant.",
                    },
                  ].map((x) => (
                    <div key={x.t} className="rounded-[28px] border border-border bg-surface p-5 shadow-sm">
                      <div className="font-heading text-xl tracking-tight">{x.t}</div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2) Solution */}
        <Section id="solution">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                  Eine Hausdiagnose, die einordnet — und konkrete Massnahmen ableitet.
                </h2>
                <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Homecheck analysiert zentrale Faktoren in einem Besuch und zeigt klar, was sich wirklich lohnt.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="rounded-[28px] border border-border bg-surface p-5 shadow-sm">
                  <div className="font-heading text-xl tracking-tight">Was wir prüfen</div>
                  <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 sm:text-base">
                    {[
                      <span key="luft">
                        <Link
                          className="underline underline-offset-4 decoration-border hover:decoration-foreground"
                          href="/leistungen/luftqualitaet"
                        >
                          Luftqualität
                        </Link>{" "}
                        (Feinstaub, VOCs, CO₂ u.a.)
                      </span>,
                      <span key="wasser">
                        <Link
                          className="underline underline-offset-4 decoration-border hover:decoration-foreground"
                          href="/leistungen/wasserqualitaet"
                        >
                          Wasserqualität
                        </Link>{" "}
                        (Schwermetalle, PFAS u.a.)
                      </span>,
                      <span key="schimmel">
                        <Link
                          className="underline underline-offset-4 decoration-border hover:decoration-foreground"
                          href="/leistungen/schimmel-feuchte"
                        >
                          Schimmel &amp; Feuchte
                        </Link>
                      </span>,
                      <span key="radon">
                        <Link
                          className="underline underline-offset-4 decoration-border hover:decoration-foreground"
                          href="/leistungen/radon"
                        >
                          Radon
                        </Link>
                      </span>,
                      "… und weitere relevante Umweltfaktoren",
                    ].map((t) => (
                      <div key={typeof t === "string" ? t : (t as { key: string }).key} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--brand)]" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 font-heading text-xl tracking-tight">
                    Ein Besuch. Ein klarer Bericht. Konkrete Massnahmen.
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <Link
                      className="underline underline-offset-4 decoration-border hover:decoration-foreground"
                      href="/prozess"
                    >
                      Prozess im Detail
                    </Link>
                    <span aria-hidden>·</span>
                    <Link
                      className="underline underline-offset-4 decoration-border hover:decoration-foreground"
                      href="/schweiz"
                    >
                      Warum Schweiz
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 3) Prozess */}
        <Section id="prozess">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                  Prozess
                </h2>
                <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Vorbeikommen, prüfen, Bericht mit Prioritäten und Massnahmen.
                </p>
              </div>
              <div className="lg:col-span-7">
                <ol className="grid gap-6">
                  {[
                    {
                      n: "1",
                      t: "Termin vereinbaren",
                      d: "Wir kommen zu Ihnen nach Hause.",
                    },
                    {
                      n: "2",
                      t: "Analyse vor Ort",
                      d: "Systematische Messung zentraler Parameter. Dauer: 3–4 Stunden.",
                    },
                    {
                      n: "3",
                      t: "Bericht & Prioritäten",
                      d: "Innerhalb von 10 Werktagen: Bewertung, Prioritäten, konkrete Massnahmen.",
                    },
                  ].map((x) => (
                    <li key={x.n} className="flex items-start gap-4">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-foreground text-sm font-semibold text-background shadow-sm">
                        {x.n}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{x.t}</div>
                        <div className="mt-1 text-sm text-muted-foreground">{x.d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </Section>

        {/* 6) Why Switzerland */}
        <Section id="schweiz">
          <Container>
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                  Warum in der Schweiz.
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Obwohl es in der Schweiz besondere Risikofaktoren gibt, wird noch viel zu wenig unternommen.
                </p>
                <div className="mt-6 space-y-3 text-sm text-muted-foreground sm:text-base">
                  {[
                    "Radon — CH gehört zu den radonbelastetsten Ländern Europas",
                    "Hartes Wasser — hohe Kalkbelastung in weiten Teilen der Schweiz",
                    "Altbauten — Schimmel und Schadstoffe in älteren Gebäuden",
                    "PFAS — Belastungen rund um Industriestandorte",
                  ].map((t) => (
                    <div key={t} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--brand)]" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Bisher gibt es keinen Anbieter in der Schweiz, der diese Faktoren systematisch und in einem Besuch analysiert.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* 8) Waitlist / Early Access */}
        <Section id="waitlist">
          <Container>
            <div className="rounded-[28px] border border-border bg-[color:var(--surface)] p-6 shadow-sm sm:p-8">
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                  <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                    Warteliste
                  </h2>
                  <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Wir starten in Kürze im Raum Zürich. Trage dich ein — erhalte als Erste Zugang und werde über unsere Erkenntnisse informiert.
                  </p>
                  <div className="mt-4 rounded-2xl border border-border bg-background/70 p-4 text-sm leading-relaxed text-muted-foreground">
                    <div className="font-medium text-foreground">Hinweis zur Einordnung</div>
                    <p className="mt-2">
                      Hausdiagnose fokussiert auf das <span className="text-foreground">Wohnumfeld</span> (z. B. Luft,
                      Wasser, Feuchte, Radon) und liefert keine medizinische Diagnose. Ergebnisse hängen von Messungen,
                      Annahmen und Grenzen der Methode ab und ersetzen keine ärztliche Abklärung, wenn du Symptome oder
                      gesundheitliche Risiken einordnen willst.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="rounded-2xl border border-border bg-background/70 p-3 shadow-sm">
                    <WaitlistForm />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 9) FAQ (Accordion) */}
        <Section id="faq">
          <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                FAQ
              </h2>
              <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Kurz beantwortet.
              </p>
            </div>
            <div className="lg:col-span-7">
              <Accordion className="gap-3" defaultValue={["item-1"]} multiple>
                {[
                  {
                    id: "item-1",
                    q: "Ist Hausdiagnose eine medizinische Diagnose?",
                    a: "Nein. Hausdiagnose ordnet Faktoren im Wohnumfeld (z. B. Luft, Wasser, Feuchte, Radon) technisch ein. Das ist keine medizinische Diagnose und ersetzt keine ärztliche oder therapeutische Abklärung, wenn es um Symptome oder Erkrankungen geht.",
                  },
                  {
                    id: "item-2",
                    q: "Welche Daten braucht ihr für die Warteliste?",
                    a: "Vorname, E‑Mail und eine ausdrückliche Einwilligung für Launch‑Updates. Die Region ist optional. Zusätzlich speichern wir eine Quelle (z. B. landing), optional einen Hash der IP‑Adresse und den User‑Agent, sowie Zeitpunkt und Version der Einwilligung — Details stehen in den Datenschutzhinweisen.",
                  },
                  {
                    id: "item-3",
                    q: "Wie lange dauert die Analyse vor Ort?",
                    a: "In der Regel 3–4 Stunden, je nach Situation vor Ort.",
                  },
                  {
                    id: "item-4",
                    q: "Wann bekomme ich den Bericht?",
                    a: "Innerhalb von 10 Werktagen nach dem Termin erhältst du den Bericht mit Bewertung und Prioritäten.",
                  },
                ].map((x) => (
                  <AccordionItem
                    key={x.id}
                    value={x.id}
                    className="rounded-2xl border border-border bg-surface px-4 shadow-sm"
                  >
                    <AccordionTrigger className="py-4 text-base">
                      {x.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground">
                      {x.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          </Container>
        </Section>

        {/* 10) Final CTA / contact moment */}
        <Section id="kontakt">
          <Container>
            <div className="rounded-[28px] border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="grid gap-4 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                  <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                    Fragen? Oder direkt auf die Warteliste.
                  </h2>
                  <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Schreib uns oder trage dich ein — wir melden uns zum Launch in Zürich und sobald wir neue Regionen öffnen.
                  </p>
                </div>
                <div className="lg:col-span-5 lg:flex lg:items-center">
                  <a
                    href="#waitlist"
                    className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[color:var(--brand)] px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-[color:var(--brand-hover)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 sm:w-auto"
                  >
                    Auf die Warteliste
                  </a>
                  <a
                    href="mailto:kontakt@hausdiagnose.ch"
                    className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30 sm:mt-0 sm:ml-3 sm:w-auto"
                  >
                    Kontakt
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </Section>

      </div>
    </main>
  );
}
