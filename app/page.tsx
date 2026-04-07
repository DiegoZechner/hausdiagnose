import { Wordmark } from "@/components/brand/wordmark";
import { Container } from "@/components/landing/container";
import { Section } from "@/components/landing/section";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { ContainerScrollAnimation } from "@/components/ui/container-scroll-animation";
import { TextRotate } from "@/components/ui/text-rotate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(
    /\/$/,
    ""
  );

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

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hausdiagnose",
    url: `${base}/`,
  } as const;

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="relative overflow-hidden bg-background">
        {/* subtle background wash */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[640px] w-[1040px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(15,118,110,0.10)_0%,transparent_70%)] blur-2xl" />
          <div className="absolute -bottom-72 -left-56 h-[720px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(17,24,39,0.06)_0%,transparent_70%)] blur-2xl" />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-40">
          <Container className="flex items-center justify-between py-3">
            <a href="#" className="group">
              <Wordmark />
            </a>
            <a
              href="#waitlist"
              className="rounded-xl border border-border bg-[rgba(15,118,110,0.08)] px-3 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur transition-colors duration-200 hover:bg-[rgba(15,118,110,0.14)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
            >
              Warteliste
            </a>
          </Container>
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="h-px bg-border/70 opacity-80 transition-opacity duration-200 hover:opacity-100" />
          </div>
        </div>

        {/* 1) Intro / Hero Entry */}
        <Section className="pt-10 sm:pt-14">
          <Container>
            <div className="max-w-2xl">
              <div className="text-xs font-medium tracking-wide text-muted-foreground">
                Hausdiagnose · Homecheck · Start in Kürze im Raum Zürich
              </div>
            </div>
          </Container>
        </Section>

        {/* 2) Main Hero with Text Rotation */}
        <Section className="pt-0">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <h1 className="font-heading text-balance text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                  Ihr Zuhause beeinflusst Ihre Gesundheit —{" "}
                  <span className="text-[color:var(--brand)]">
                    <TextRotate
                      words={["ob Sie es merken", "was Sie einatmen", "was Sie trinken", "was Sie täglich berühren"]}
                      intervalMs={1600}
                    />
                  </span>
                  .
                </h1>
                <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Wir analysieren Ihr Zuhause wissenschaftlich: Luft, Wasser, Schimmel und mehr — und zeigen Ihnen genau,
                  was zu tun ist.
                </p>
                <div className="mt-6">
                  <a
                    href="#waitlist"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--brand)] px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-[color:var(--brand-hover)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
                  >
                    Auf die Warteliste
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-[28px] border border-border bg-surface p-3 shadow-sm">
                  <WaitlistForm />
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 3) Transition */}
        <Section className="pt-4">
          <Container>
            <ContainerScrollAnimation>
              <div className="px-5 py-6 sm:px-7 sm:py-8">
                <div className="font-heading text-pretty text-2xl tracking-tight sm:text-3xl">
                  Ein Besuch. Ein klarer Bericht. Konkrete Massnahmen.
                </div>
                <div className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Weniger Vermutung, mehr Evidenz — verständlich priorisiert.
                </div>
              </div>
            </ContainerScrollAnimation>
          </Container>
        </Section>

        {/* 4) Relevanz (ent-carded) */}
        <Section id="problem">
          <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                Wir verbringen über 90% unserer Zeit in Innenräumen.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Trotzdem wissen die meisten Menschen nicht, was sie täglich einatmen, trinken oder berühren.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  {
                    t: "Schlechte Luftqualität.",
                    d: "Feinstaub, VOCs, CO₂ und mehr.",
                  },
                  {
                    t: "Schimmel hinter Wänden.",
                    d: "Feuchte, Kondensation, versteckte Belastungen.",
                  },
                  {
                    t: "Schadstoffe im Leitungswasser.",
                    d: "Schwermetalle, PFAS und weitere Indikatoren.",
                  },
                ].map((x) => (
                  <div key={x.t} className="flex gap-3">
                    <div
                      className="mt-1.5 size-2 shrink-0 rounded-full bg-[color:var(--brand)]"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">{x.t}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{x.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                Diese Faktoren beeinflussen Schlaf, Energie und langfristige Gesundheit — messbar und real.
              </p>
            </div>
          </div>
          </Container>
        </Section>

        {/* 5) Scope (ent-carded) */}
        <Section id="scope">
          <Container>
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                  Homecheck analysiert Ihr Zuhause von Grund auf.
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="grid gap-3 text-sm sm:text-base">
                  {[
                    { k: "Luftqualität", v: "Feinstaub, VOCs, CO₂ u.a." },
                    { k: "Wasserqualität", v: "Schwermetalle, PFAS u.a." },
                    { k: "Schimmel & Feuchte", v: "Risiken sichtbar machen." },
                    { k: "Radon", v: "Belastung einordnen." },
                    { k: "Und vieles mehr", v: "relevante Umweltfaktoren im Zuhause." },
                  ].map((x) => (
                    <div key={x.k} className="flex items-start justify-between gap-6 border-b border-border/70 py-3">
                      <div className="font-medium text-foreground">{x.k}</div>
                      <div className="max-w-[26rem] text-right text-muted-foreground">
                        {x.v}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-sm font-medium text-foreground">
                  Ein Besuch. Ein klarer Bericht. Konkrete Massnahmen.
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 6) Process (ent-carded) */}
        <Section id="how">
          <Container>
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                  So läuft es ab.
                </h2>
                <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Klarer Ablauf, klare Resultate.
                </p>
              </div>
              <div className="lg:col-span-7">
                <ol className="grid gap-6">
                  {[
                    {
                      n: "1",
                      t: "Termin vereinbaren",
                      d: "Wir kommen zu dir nach Hause.",
                    },
                    {
                      n: "2",
                      t: "Analyse vor Ort",
                      d: "Unser Team misst systematisch alle relevanten Parameter. Dauer: 3–4 Stunden.",
                    },
                    {
                      n: "3",
                      t: "Dein persönlicher Bericht",
                      d: "Innerhalb von 10 Werktagen erhältst du einen detaillierten Bericht mit Bewertung und Prioritäten.",
                    },
                  ].map((x) => (
                    <li
                      key={x.n}
                      className="flex items-start gap-4"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-foreground text-sm font-semibold text-background shadow-sm">
                        {x.n}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{x.t}</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {x.d}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </Section>

        {/* 7) Privacy / Scientific Rigor / Trust (ent-carded) */}
        <Section id="trust">
          <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                Privatsphäre. Wissenschaftliche Sorgfalt. Klare Grenzen.
              </h2>
              <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Wir versprechen keine Heilung. Wir messen, ordnen ein und zeigen konkrete Massnahmen.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-4">
                {[
                  "Datensparsamkeit: Warteliste mit Vorname/E‑Mail, Region optional.",
                  "Keine Panikmache: klare Prioritäten statt Alarmismus.",
                  "Keine medizinische Diagnose: ersetzt keine ärztliche Abklärung.",
                  "Nachvollziehbarkeit: Messung, Einordnung, konkrete nächste Schritte.",
                ].map((t) => (
                  <div key={t} className="flex gap-3">
                    <div className="mt-1.5 size-2 shrink-0 rounded-full bg-[color:var(--brand)]" aria-hidden="true" />
                    <div className="text-sm text-muted-foreground">{t}</div>
                  </div>
                ))}
                <div className="pt-2 text-sm">
                  <a
                    className="font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
                    href="mailto:kontakt@hausdiagnose.ch"
                  >
                    kontakt@hausdiagnose.ch
                  </a>
                  <span className="text-muted-foreground"> · für Fragen</span>
                </div>
              </div>
            </div>
          </div>
          </Container>
        </Section>

        <div id="waitlist" className="sr-only" />

        {/* 8) Launch / Waitlist (card stays) */}
        <Section id="early-access">
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
                </div>
                <div className="lg:col-span-5">
                  <div className="rounded-2xl border border-border bg-background/70 p-5 shadow-sm">
                    <div className="text-sm font-medium text-foreground">
                      Was du erhältst
                    </div>
                    <div className="mt-3 space-y-3">
                      {[
                        "Zugang zum Start in deiner Region (sobald verfügbar)",
                        "Updates zu Vorgehen, Preisrahmen und Erkenntnissen",
                        "Kurzer Hinweis, wenn wir neue Termine freischalten",
                      ].map((t) => (
                        <div key={t} className="flex gap-3">
                          <div
                            className="mt-1.5 size-2 shrink-0 rounded-full bg-[color:var(--brand)]"
                            aria-hidden="true"
                          />
                          <div className="text-sm text-muted-foreground">{t}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5">
                      <a
                        href="#waitlist"
                        className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[color:var(--brand)] px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-[color:var(--brand-hover)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
                      >
                        Auf die Warteliste
                      </a>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Abmeldung jederzeit.
                      </div>
                    </div>
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
                    a: "Nein. Wir analysieren das Wohnumfeld und ersetzen keine ärztliche Abklärung.",
                  },
                  {
                    id: "item-2",
                    q: "Welche Daten braucht ihr für die Warteliste?",
                    a: "Vorname und E‑Mail. Region ist optional.",
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

        {/* 10) Final CTA */}
        <Section id="final">
          <Container>
            <div className="rounded-[28px] border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="grid gap-4 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                  <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                    Trage dich ein, bevor wir starten.
                  </h2>
                  <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Wir melden uns zum Launch in Zürich — und sobald wir neue Regionen öffnen.
                  </p>
                </div>
                <div className="lg:col-span-5 lg:flex lg:items-center">
                  <a
                    href="#waitlist"
                    className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[color:var(--brand)] px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-[color:var(--brand-hover)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 sm:w-auto"
                  >
                    Auf die Warteliste
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Footer */}
        <footer className="border-t border-border/60 bg-background">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-2">
              <Wordmark tone="muted" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a className="hover:text-foreground" href="/impressum">
                Impressum
              </a>
              <a className="hover:text-foreground" href="/datenschutz">
                Datenschutz
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
