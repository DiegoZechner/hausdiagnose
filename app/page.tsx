import { Wordmark } from "@/components/brand/wordmark";
import { HeroCanvas } from "@/components/landing/hero-canvas";
import { Container } from "@/components/landing/container";
import { InlineTrust } from "@/components/landing/inline-trust";
import { ScopeList } from "@/components/landing/scope-list";
import { Section } from "@/components/landing/section";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

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
        name: "Kann schlechte Luft zuhause Symptome wie Kopfschmerzen oder schlechten Schlaf auslösen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Möglich – das hängt stark von Ursache und Kontext ab. Wir versprechen keine medizinischen Effekte, helfen aber dabei, Wohnumfeld‑Faktoren verständlich einzuordnen und Prioritäten zu setzen.",
        },
      },
      {
        "@type": "Question",
        name: "Woran erkenne ich Schimmel oder zu hohe Luftfeuchtigkeit – auch wenn man nichts sieht?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Typisch sind wiederkehrende Kondensation, Gerüche, Flecken oder dauerhaft hohe Luftfeuchte. Wir helfen beim strukturierten Check und beim Einordnen, welche nächsten Schritte sinnvoll sind.",
        },
      },
      {
        "@type": "Question",
        name: "Ist Radon in der Schweiz ein Thema – und wo ist das Risiko höher?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Radon kann regional unterschiedlich relevant sein. Wir ordnen das Risiko anhand von Lage/Gegebenheiten ein und sagen klar, wann Messung sinnvoll ist – und wann nicht.",
        },
      },
      {
        "@type": "Question",
        name: "Welche Daten braucht ihr für die Warteliste – und bekomme ich Spam?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vorname + E‑Mail, Region optional. Wir schicken nur Updates zum Launch. Abmeldung jederzeit.",
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
        <HeroCanvas />

        {/* Header */}
        <div className="sticky top-0 z-40 border-b border-border/70 bg-background/78 backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <Container className="flex items-center justify-between py-3">
            <a href="#" className="group">
              <Wordmark />
            </a>
            <a
              href="#waitlist"
              className="rounded-xl bg-foreground px-3 py-2 text-sm font-medium text-background shadow-sm ring-1 ring-foreground/10 transition-colors duration-200 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
            >
              Warteliste
            </a>
          </Container>
        </div>

        {/* Hero */}
        <Section className="pt-8 sm:pt-12 lg:pt-14">
          <Container>
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              {/* poster-like copy block */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground shadow-sm">
                  <span className="inline-flex size-1.5 rounded-full bg-brand" />
                  Start in Kürze · Founding Member Early Access
                </div>

                <h1 className="mt-5 font-heading text-balance text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                  Fühlst du dich zuhause nicht ganz wohl? Wir ordnen dein Wohnumfeld
                  verständlich ein.
                </h1>

                <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Luft, Wasser, Feuchtigkeit/Schimmel und Radon – ruhig eingeordnet,
                  ohne Panikmache und ohne medizinische Versprechen. Start in Kürze
                  (zuerst Raum Zürich).
                </p>

                <InlineTrust
                  className="mt-5"
                  items={["Datensparsam", "Kein Spam", "Keine Diagnose"]}
                />

                <div className="mt-6">
                  <a
                    href="#how"
                    className="text-sm font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
                  >
                    Wie das abläuft
                  </a>
                </div>

                <div className="mt-8 inline-flex max-w-xl items-start gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm">
                  <div
                    className="mt-0.5 size-2 rounded-full bg-[color:var(--brand)]"
                    aria-hidden="true"
                  />
                  <div className="text-sm text-muted-foreground">
                    Early Access ist limitiert in der Launch‑Phase – die Warteliste
                    priorisiert nach Region und Kapazität.
                  </div>
                </div>
              </div>

              {/* inset enrollment */}
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-[28px] bg-[radial-gradient(closest-side,var(--brand-soft)_0%,transparent_72%)] blur-xl" />
                  <div className="relative rounded-[28px] border border-border bg-[color:var(--surface)] p-3 shadow-[0_12px_30px_rgba(17,24,39,0.10)]">
                    {/* Signature moment: “enrollment + seal” */}
                    <div className="relative overflow-hidden rounded-2xl border border-border bg-background/70 p-3">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(to_bottom,rgba(248,250,252,0.85),transparent)]" />
                      <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium tracking-wide text-foreground shadow-sm">
                        Founding Member
                      </div>
                      <WaitlistForm />
                    </div>
                    <div className="mt-3">
                      <ScopeList
                        items={[
                          { k: "Luft", v: "CO₂ · VOC · Partikel" },
                          { k: "Wasser", v: "Indikatoren · Einordnung" },
                          { k: "Feuchte", v: "Schimmelrisiko · Kondensation" },
                          { k: "Radon", v: "Lage‑Check · Risiko" },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Problem / Relevanz */}
        <Section id="problem">
          <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                Wir verbringen den Großteil unserer Zeit zuhause – und merken oft erst spät,
                wenn etwas nicht stimmt.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Oft bleibt nur ein Gefühl. Wir helfen, das Wohnumfeld ruhig einzuordnen –
                damit du wieder klare Entscheidungen treffen kannst.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  {
                    t: "Relevanz erkennen",
                    d: "Welche Hinweise sind plausibel – und welche eher Zufall?",
                  },
                  {
                    t: "Prioritäten setzen",
                    d: "Was lohnt sich zuerst, ohne sich zu verlieren?",
                  },
                  {
                    t: "Handlungsfähig werden",
                    d: "Konkrete nächste Schritte, verständlich erklärt.",
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
            </div>
          </div>
          </Container>
        </Section>

        {/* How it works */}
        <Section id="how">
          <Container>
          <div className="rounded-[28px] border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                  So funktioniert’s – ohne Overload.
                </h2>
                <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Du bekommst eine klare, strukturierte Einschätzung deines
                  Wohnumfelds – mit pragmatischen nächsten Schritten.
                </p>
              </div>
              <div className="lg:col-span-7">
                <ol className="grid gap-3">
                  {[
                    {
                      n: "1",
                      t: "Kurz-Check",
                      d: "Ein paar gezielte Fragen, damit wir Kontext verstehen.",
                    },
                    {
                      n: "2",
                      t: "Einordnung",
                      d: "Wir ordnen Hinweise aus deinem Wohnumfeld verständlich ein.",
                    },
                    {
                      n: "3",
                      t: "Nächste Schritte",
                      d: "Du erhältst klare Prioritäten, ohne Panikmache.",
                    },
                    {
                      n: "Optional",
                      t: "Messung (falls sinnvoll)",
                      d: "Nur wenn Daten vor Ort wirklich einen Unterschied machen.",
                    },
                  ].map((x) => (
                    <li
                      key={x.n}
                      className="flex items-start gap-4 rounded-2xl border border-border bg-background/40 p-4"
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
          </div>
          </Container>
        </Section>

        {/* Trust */}
        <Section id="trust">
          <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                Vertrauen entsteht durch Ruhe, Substanz und Grenzen.
              </h2>
              <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Keine Panikmache. Keine Heil‑Versprechen. Dafür klare Einordnung,
                nachvollziehbar und menschlich.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-[28px] border border-border bg-surface p-5 shadow-sm sm:p-6">
                <div className="grid gap-4">
                  {[
                    {
                      t: "Datensparsame Warteliste",
                      d: "Vorname + E‑Mail. Region optional. Wir nutzen das nur für Launch‑Updates.",
                    },
                    {
                      t: "Kein Spam",
                      d: "Wir schreiben selten und nur, wenn es echte Neuigkeiten gibt. Abmeldung jederzeit.",
                    },
                    {
                      t: "Keine medizinische Diagnose",
                      d: "Wir ersetzen keine ärztliche Abklärung. Wir helfen beim Einordnen des Wohnumfelds.",
                    },
                    {
                      t: "Start zuerst im Raum Zürich",
                      d: "Launch‑Phase lokal, dann Ausbau nach Nachfrage und Kapazität.",
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
              </div>
              <div className="mt-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
                <div className="text-sm font-medium">Kontakt (direkt)</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Fragen oder Kontext? Schreib uns:{" "}
                  <a
                    className="underline underline-offset-4 decoration-border hover:decoration-foreground"
                    href="mailto:kontakt@hausdiagnose.ch"
                  >
                    kontakt@hausdiagnose.ch
                  </a>
                </div>
              </div>
            </div>
          </div>
          </Container>
        </Section>

        <div id="waitlist" className="sr-only" />

        {/* Early Access / Founding Member (no form repeat) */}
        <Section id="early-access">
          <Container>
            <div className="rounded-[28px] border border-border bg-[color:var(--surface)] p-6 shadow-sm sm:p-8">
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                    Founding Member
                  </div>
                  <h2 className="mt-4 font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                    Früh dabei – bevor wir breit starten.
                  </h2>
                  <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Founding Members bekommen priorisierten Zugang in der Launch‑Phase.
                    Du hilfst uns mit einem klaren Signal: „Ja, das ist relevant.“
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <div className="rounded-2xl border border-border bg-background/70 p-5 shadow-sm">
                    <div className="text-sm font-medium text-foreground">
                      Dein Vorteil als Founding Member
                    </div>
                    <div className="mt-3 space-y-3">
                      {[
                        "Priorität beim Start (Launch‑Fenster)",
                        "Transparenter Ablauf + Preisrahmen zum Launch",
                        "Region optional (hilft uns bei Planung)",
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
                        Datensparsam · Kein Spam · Abmeldung jederzeit
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section id="faq">
          <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                FAQ
              </h2>
              <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Fragen, wie sie wirklich gesucht werden – kurz beantwortet.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-3">
                {[
                  {
                    q: "Kann schlechte Luft zuhause Symptome wie Kopfschmerzen oder schlechten Schlaf auslösen?",
                    a: "Möglich – das hängt stark von Ursache und Kontext ab. Wir versprechen keine medizinischen Effekte, helfen aber dabei, Wohnumfeld‑Faktoren verständlich einzuordnen und Prioritäten zu setzen.",
                  },
                  {
                    q: "Woran erkenne ich Schimmel oder zu hohe Luftfeuchtigkeit – auch wenn man nichts sieht?",
                    a: "Typisch sind wiederkehrende Kondensation, Gerüche, Flecken oder dauerhaft hohe Luftfeuchte. Wir helfen beim strukturierten Check und beim Einordnen, welche nächsten Schritte sinnvoll sind.",
                  },
                  {
                    q: "Ist Radon in der Schweiz ein Thema – und wo ist das Risiko höher?",
                    a: "Radon kann regional unterschiedlich relevant sein. Wir ordnen das Risiko anhand von Lage/Gegebenheiten ein und sagen klar, wann Messung sinnvoll ist – und wann nicht.",
                  },
                  {
                    q: "Ist Hausdiagnose eine medizinische Diagnose oder Beratung?",
                    a: "Nein. Hausdiagnose ersetzt keine ärztliche Abklärung. Es geht um das Wohnumfeld und potenzielle Einflussfaktoren – verständlich erklärt, ohne Panikmache.",
                  },
                  {
                    q: "Welche Daten braucht ihr für die Warteliste – und bekomme ich Spam?",
                    a: "Vorname + E‑Mail, Region optional. Wir schicken nur Updates zum Launch. Abmeldung jederzeit.",
                  },
                  {
                    q: "Wann startet Hausdiagnose und in welchen Regionen zuerst?",
                    a: "Wir sind in der Aufbauphase. Geplant ist der Start zuerst im Raum Zürich; danach erweitern wir. Den Starttermin kommunizieren wir per E‑Mail an die Warteliste.",
                  },
                ].map((x) => (
                  <details
                    key={x.q}
                    className="group rounded-2xl border border-border bg-surface p-4 shadow-sm"
                  >
                    <summary className="cursor-pointer list-none text-sm font-medium outline-none">
                      <span className="inline-flex items-center justify-between gap-3">
                        {x.q}
                        <span className="text-muted-foreground transition group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {x.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
          </Container>
        </Section>

        <Section id="final">
          <Container>
            <div className="rounded-[28px] border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="grid gap-4 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                  <h2 className="font-heading text-pretty text-3xl tracking-tight sm:text-4xl">
                    Wenn du spürst, dass „etwas“ im Zuhause nicht passt.
                  </h2>
                  <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Trag dich ein, wenn du möchtest, dass es dieses Angebot gibt.
                    Das ist der direkteste Weg, uns zu zeigen: „Ja – das ist relevant.“
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
