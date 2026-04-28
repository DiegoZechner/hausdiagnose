import { Wordmark } from "@/components/brand/wordmark";
import Image from "next/image";
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
import { getSiteOrigin } from "@/lib/seo/site";
import { headers } from "next/headers";
import { connection } from "next/server";
import { evidenceTopics } from "@/lib/content/evidence";

/**
 * Homepage — Hausdiagnose
 *
 * Layout philosophy:
 * - Two-tone section rhythm: Clean White (default) and a barely-tinted Fresh
 *   Breeze (`tone="alt"`) alternate, never feeling busy.
 * - Cards share a single premium look (border, soft shadow, hover lift via
 *   the `.card-premium` utility).
 * - Headings: Plus Jakarta Sans (`font-heading`) with tight tracking. Body:
 *   Inter (default `font-sans`).
 * - Color usage:
 *     - Vital Teal — primary accent (links, ring, primary CTA, brand mark dots).
 *     - Fresh Breeze (very light tint) — alternate section bg + chips.
 *     - Alert Amber — only used to mark the Schweiz/Radon risk chip; nowhere else.
 */

const FAQ_ENTRIES: ReadonlyArray<{ id: string; q: string; a: string }> = [
  {
    id: "was-prueft",
    q: "Was prüft Hausdiagnose genau?",
    a: "Hausdiagnose untersucht zentrale Faktoren des Wohnumfelds: Luftqualität (z. B. Feinstaub, VOCs, CO₂), Wasserqualität (z. B. Indikatoren wie Schwermetalle oder PFAS), Schimmel und Feuchte sowie Radon. Ergänzend werden weitere relevante Umweltfaktoren erfasst, sofern sie für Ihre Situation Sinn ergeben.",
  },
  {
    id: "ist-medizinisch",
    q: "Ist das eine medizinische Diagnose?",
    a: "Nein. Hausdiagnose ordnet Faktoren im Wohnumfeld technisch ein. Das ist keine medizinische Diagnose und ersetzt keine ärztliche oder therapeutische Abklärung. Bei gesundheitlichen Beschwerden wenden Sie sich an medizinische Fachpersonen.",
  },
  {
    id: "fuer-wen",
    q: "Für wen ist das Angebot geeignet?",
    a: "Für Privathaushalte im Raum Zürich, die wissen möchten, wie es um die zentralen Wohngesundheits-Faktoren bei ihnen steht — typischerweise vor einer Renovation, beim Einzug, mit Kindern im Haushalt, in Altbauten oder bei unspezifischen Komfort‑/Geruchsproblemen.",
  },
  {
    id: "wann-lohnt",
    q: "Wann lohnt sich ein Homecheck?",
    a: "Wenn Sie Klarheit über Luft, Wasser, Feuchte oder Radon im eigenen Zuhause möchten — besonders bei Neubezug, nach einer Renovation, in Gebäuden vor 1990, bei Verdacht auf Feuchteschäden oder in radonexponierten Regionen. Auch als Standortbestimmung für gezielte, statt pauschale Investitionen.",
  },
  {
    id: "ablauf",
    q: "Wie läuft die Analyse ab?",
    a: "In drei Schritten: 1) Termin vereinbaren, 2) Analyse vor Ort (in der Regel 3–4 Stunden mit systematischer Messung der zentralen Parameter), 3) Report mit Bewertung, Prioritäten und konkreten Massnahmen innerhalb von 10 Werktagen.",
  },
  {
    id: "danach",
    q: "Was passiert nach der Analyse?",
    a: "Sie erhalten einen schriftlichen Report mit nachvollziehbarer Einordnung, klaren Prioritäten und konkreten Massnahmen — vom einfachen Verhaltens‑Tipp bis zu baulichen Empfehlungen. Sie entscheiden, was umgesetzt wird; wir verkaufen keine Sanierungen.",
  },
  {
    id: "radon-ch",
    q: "Wie relevant ist Radon in der Schweiz?",
    a: "Die Schweiz gehört im europäischen Vergleich zu den Ländern mit erhöhter Radon-Exposition. Die Belastung ist regional sehr unterschiedlich. Radon lässt sich nur durch Messung zuverlässig feststellen; die WHO ordnet Radon als zweithäufigste Ursache von Lungenkrebs nach dem Rauchen ein.",
  },
  {
    id: "schimmel-gesundheit",
    q: "Kann Schimmel die Gesundheit beeinflussen?",
    a: "Innenraumfeuchte und Schimmel werden in der Forschung mit Atemwegsbeschwerden in Verbindung gebracht und gelten in Übersichten europäischer Gesundheitsbehörden als relevanter Risikofaktor. Wichtig ist, die Ursache zu finden (z. B. Wärmebrücke, Lüftung, Bauschaden), bevor saniert wird.",
  },
  {
    id: "faktoren",
    q: "Welche Faktoren im Zuhause können das Wohlbefinden beeinflussen?",
    a: "Vor allem Luftqualität (Feinstaub, VOCs, CO₂), Wasserqualität (z. B. Schwermetalle, PFAS, je nach Region), Feuchte/Schimmel und Radon. Daneben spielen Lüftungsverhalten, Materialien, Heiz- und Kochquellen sowie das umliegende Bauumfeld eine Rolle.",
  },
  {
    id: "warteliste-daten",
    q: "Welche Daten braucht ihr für die Warteliste?",
    a: "Pflichtfelder sind Vorname, Nachname, Region und E‑Mail. Telefonnummer und Nachricht sind optional. Zusätzlich speichern wir Ihre Einwilligung für Launch‑Updates (Version und Zeitpunkt), die Quelle (z. B. landing) sowie optional einen Hash der IP‑Adresse und den User‑Agent. Details stehen in den Datenschutzhinweisen.",
  },
];

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
    email: "kontakt@hausdiagnose.ch",
    areaServed: "CH",
    description:
      "Hausdiagnose analysiert das Wohnumfeld wissenschaftlich (Luft, Wasser, Schimmel/Feuchte, Radon) und liefert klare Prioritäten und Massnahmen. Pilotprojekt im Raum Zürich.",
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
    name: "Hausdiagnose (Homecheck für gesundes Wohnen)",
    url: `${base}/`,
    areaServed: { "@type": "City", name: "Zürich" },
    serviceType: "Wohnumfeld-Analyse / Homecheck",
    description:
      "Wissenschaftliche Analyse von Luft, Wasser, Schimmel/Feuchte, Radon und weiteren Umweltfaktoren im Zuhause — mit klaren Prioritäten und Massnahmen. Pilotprojekt im Raum Zürich.",
  } as const;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ENTRIES.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
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

      <div className="relative bg-background">
        {/* ───────────────────────────────── HEADER ───────────────────────────────── */}
        <header className="sticky top-0 z-40">
          <div className="border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <Container className="flex items-center justify-between py-3">
              <Link href="/" className="group" aria-label="Zur Startseite">
                <Wordmark />
              </Link>
              <nav
                aria-label="Hauptnavigation"
                className="hidden items-center gap-6 text-sm text-muted-foreground md:flex"
              >
                <a className="transition-colors hover:text-foreground" href="#problem">
                  Problem
                </a>
                <a className="transition-colors hover:text-foreground" href="#solution">
                  Lösung
                </a>
                <a className="transition-colors hover:text-foreground" href="#evidenz">
                  Evidenz
                </a>
                <a className="transition-colors hover:text-foreground" href="#schweiz">
                  Schweiz
                </a>
                <a className="transition-colors hover:text-foreground" href="#prozess">
                  Prozess
                </a>
                <a className="transition-colors hover:text-foreground" href="#faq">
                  FAQ
                </a>
              </nav>
              <a
                href="#waitlist"
                className="inline-flex h-9 items-center rounded-lg bg-[color:var(--brand)] px-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-[color:var(--brand-hover)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
              >
                Warteliste
              </a>
            </Container>
          </div>
        </header>

        {/* ─────────────────────────────────── HERO ─────────────────────────────────── */}
        <section
          aria-labelledby="hero-headline"
          className="relative min-h-[100svh] w-full overflow-hidden"
        >
          {/* Background image without extra wrapper */}
          <Image
            src="/new-hero.png"
            alt="Heller, hochwertiger Wohnraum mit natürlichem Licht"
            fill
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-slate-950/55 pointer-events-none" />

          {/* Content layer only. Container affects text/buttons, never the background media. */}
          <div className="relative z-10 flex min-h-[100svh] items-center w-full">
            <Container className="py-24 sm:py-28 lg:py-32">
              <div className="max-w-3xl">
                <h1
                  id="hero-headline"
                  className="font-heading text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
                >
                  Ihr Zuhause beeinflusst Ihre Gesundheit.
                </h1>

                {/* Rotating subhead — CLS-free via grid-stack inside TextRotate */}
                <div className="mt-3 max-w-2xl font-heading text-2xl font-medium leading-snug tracking-tight text-[color:var(--breeze)] sm:mt-4 sm:text-3xl lg:text-[2.25rem]">
                  <TextRotate
                    words={[
                      "Die Luft, die Sie einatmen.",
                      "Das Wasser, das Sie trinken.",
                      "Die Räume, in denen Sie leben.",
                    ]}
                    intervalMs={3200}
                  />
                </div>

                <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
                  Wissenschaftliche Analyse von Luft, Wasser, Schimmel und Radon — in einem Termin, mit klaren
                  Prioritäten und konkreten Massnahmen.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#waitlist"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-[#0b1220] shadow-sm transition-[background,box-shadow,transform] duration-200 hover:bg-white/95 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 active:translate-y-[1px]"
                  >
                    Auf die Warteliste
                  </a>
                  <a
                    href="#solution"
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 text-sm font-medium text-white shadow-sm backdrop-blur transition-[background,box-shadow] duration-200 hover:bg-white/15 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
                  >
                    So arbeitet Hausdiagnose
                  </a>
                </div>
              </div>
            </Container>
          </div>
        </section>

        {/* ─────────────────────────────────── PROBLEM ─────────────────────────────────── */}
        <Section id="problem" tone="alt" aria-labelledby="problem-h">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
                <span className="size-1.5 rounded-full bg-[color:var(--brand)]" />
                Problem
              </div>
              <h2 id="problem-h" className="font-heading text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                Unsichtbare Belastungen sind real — und bleiben oft unbemerkt
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Luftqualität, Leitungswasser, Feuchte und Radon können Wohlbefinden und Gesundheit beeinflussen.
                Weil diese Faktoren meist nicht sichtbar sind, bleiben sie im Alltag oft lange unentdeckt.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 sm:gap-4">
              {[
                { t: "Schlechte Luftqualität", d: "Feinstaub, VOCs, CO₂ — meist unsichtbar, oft alltagsrelevant." },
                { t: "Leitungswasser", d: "Indikatoren wie Schwermetalle oder PFAS, je nach Standort." },
                { t: "Schimmel & Feuchte", d: "Hinter Wänden, in Ecken, in Bauteilen — oft schon vor Sichtbarkeit." },
                { t: "Radon", d: "Regional unterschiedlich; in Teilen der Schweiz erhöht." },
              ].map((x) => (
                <div key={x.t} className="card-premium p-5">
                  <div className="font-heading text-lg font-semibold tracking-tight">{x.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* ─────────────────────────────────── SOLUTION ─────────────────────────────────── */}
        <Section id="solution" aria-labelledby="solution-h">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface-2)] px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-[color:var(--brand)]" />
                  Lösung
                </div>
                <h2 id="solution-h" className="font-heading text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                  Klarheit über die Faktoren, die wirklich relevant sind
                </h2>
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Hausdiagnose analysiert die zentralen Einflussfaktoren in Ihrem Zuhause vor Ort und zeigt, welche
                  Massnahmen in Ihrer Situation prioritär sind — ohne pauschale Empfehlungen.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="card-premium p-5 sm:p-6">
                  <div className="font-heading text-xl font-semibold tracking-tight">Was wir prüfen</div>
                  <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 sm:text-base">
                    {[
                      <span key="luft">
                        <a
                          className="font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
                          href="#evidenz-luft"
                        >
                          Luftqualität
                        </a>{" "}
                        (Feinstaub, VOCs, CO₂ u.&nbsp;a.)
                      </span>,
                      <span key="wasser">
                        <a
                          className="font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
                          href="#evidenz-wasser"
                        >
                          Wasserqualität
                        </a>{" "}
                        (Schwermetalle, PFAS u.&nbsp;a.)
                      </span>,
                      <span key="schimmel">
                        <a
                          className="font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
                          href="#evidenz-schimmel"
                        >
                          Schimmel &amp; Feuchte
                        </a>
                      </span>,
                      <span key="radon">
                        <a
                          className="font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
                          href="#evidenz-radon"
                        >
                          Radon
                        </a>
                      </span>,
                      "… und weitere relevante Umweltfaktoren",
                    ].map((t) => (
                      <div key={typeof t === "string" ? t : (t as { key: string }).key} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--brand)]" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-border bg-[color:var(--surface-2)] p-4">
                    <div className="font-heading text-base font-semibold tracking-tight">
                      Ein Termin. Ein klarer Report. Konkrete Massnahmen.
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Statt Einzelmessungen über Monate: eine systematische Aufnahme an einem Tag — und ein
                      schriftlicher Bericht, mit dem Sie etwas anfangen können.
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    <Link
                      className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
                      href="/prozess"
                    >
                      Prozess im Detail
                    </Link>
                    <span aria-hidden className="text-muted-foreground">
                      ·
                    </span>
                    <Link
                      className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
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

        {/* ─────────────────────────────────── EVIDENCE ─────────────────────────────────── */}
        <Section id="evidenz" tone="alt" aria-labelledby="evidenz-h">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
                <span className="size-1.5 rounded-full bg-[color:var(--brand)]" />
                Evidenz
              </div>
              <h2 id="evidenz-h" className="font-heading text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                Warum das wichtig ist
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Eine kurze, vorsichtige Einordnung zu jedem Thema — mit Quellen aus Forschung und öffentlichen
                Gesundheitsbehörden. Wir bewerten das Wohnumfeld und ersetzen keine medizinische Abklärung.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-4xl">
              <Accordion className="gap-3" multiple>
                {evidenceTopics.map((topic) => (
                  <AccordionItem
                    key={topic.id}
                    value={`evidenz-${topic.id}`}
                    id={`evidenz-${topic.id}`}
                    className="card-premium scroll-mt-24 px-4"
                  >
                    <AccordionTrigger className="py-4 font-heading text-base font-semibold tracking-tight">
                      {topic.title}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground">
                      <p className="text-sm leading-relaxed sm:text-[15px]">{topic.intro}</p>

                      <ul className="mt-4 space-y-2 text-sm leading-relaxed sm:text-[15px]">
                        {topic.bullets.map((b) => (
                          <li key={b} className="flex gap-3">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[color:var(--brand)]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-border bg-background p-4">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/70">
                            Warum relevant
                          </div>
                          <p className="mt-2 text-sm leading-relaxed">{topic.whyRelevant}</p>
                        </div>
                        {topic.causesOrPrevalence ? (
                          <div className="rounded-2xl border border-border bg-background p-4">
                            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/70">
                              Häufige Ursachen
                            </div>
                            <p className="mt-2 text-sm leading-relaxed">{topic.causesOrPrevalence}</p>
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-5">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/70">
                          {topic.sources.length === 1 ? "Quelle" : "Quellen"}
                        </div>
                        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                          {topic.sources.map((s) => (
                            <li key={s.href}>
                              <a
                                className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
                                href={s.href}
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                {s.label}
                                <span aria-hidden="true" className="ml-1 text-muted-foreground">
                                  ↗
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </Section>

        {/* ─────────────────────────────────── SCHWEIZ ─────────────────────────────────── */}
        <Section id="schweiz" aria-labelledby="schweiz-h">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface-2)] px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-[color:var(--brand)]" />
                  Schweiz
                </div>
                <h2 id="schweiz-h" className="font-heading text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                  Warum gerade in der Schweiz
                </h2>
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Auch in der Schweiz gibt es spezifische Risikofaktoren, die im Alltag oft unterschätzt werden.
                  Hausdiagnose ordnet diese Faktoren systematisch ein — pragmatisch und ohne Alarmismus.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      t: "Radon",
                      d: "CH gehört zu den radonexponierten Ländern Europas — regional sehr unterschiedlich.",
                      tone: "amber" as const,
                    },
                    {
                      t: "Hartes Wasser",
                      d: "Hohe Kalkbelastung in weiten Teilen der Schweiz; Indikator für Hausinstallation.",
                      tone: "default" as const,
                    },
                    {
                      t: "Altbauten",
                      d: "Feuchte, Schimmelrisiken und mögliche Schadstoffe in älteren Gebäuden.",
                      tone: "default" as const,
                    },
                    {
                      t: "PFAS",
                      d: "Forschungsarbeiten zeigen lokale Belastungen rund um Industriestandorte.",
                      tone: "default" as const,
                    },
                  ].map((it) => (
                    <li key={it.t} className="card-premium p-4">
                      <div className="flex items-center gap-2">
                        {it.tone === "amber" ? (
                          <span
                            className="inline-flex h-5 items-center rounded-full bg-[color:var(--warning)]/15 px-2 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--warning)]"
                            title="Erhöhter Risikofaktor"
                          >
                            erhöht
                          </span>
                        ) : (
                          <span
                            className="inline-flex h-5 items-center rounded-full bg-[color:var(--breeze)] px-2 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--brand)]"
                          >
                            relevant
                          </span>
                        )}
                        <div className="font-heading text-base font-semibold tracking-tight">{it.t}</div>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Bisher gibt es im Raum Zürich keinen Anbieter, der diese Faktoren systematisch und in einem Termin
                  zusammen analysiert.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* ─────────────────────────────────── PROZESS ─────────────────────────────────── */}
        <Section id="prozess" tone="alt" aria-labelledby="prozess-h">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-[color:var(--brand)]" />
                  Prozess
                </div>
                <h2 id="prozess-h" className="font-heading text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                  In drei Schritten zur Klarheit
                </h2>
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Termin vereinbaren, vor Ort prüfen, schriftlicher Report mit Prioritäten und Massnahmen.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ol className="relative grid gap-4">
                  {/* Vertical hairline behind the markers */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[18px] top-2 bottom-2 w-px bg-border sm:left-[18px]"
                  />
                  {[
                    {
                      n: "1",
                      t: "Termin vereinbaren",
                      d: "Wir kommen zu Ihnen nach Hause. Vorab klären wir kurz, was bei Ihnen relevant ist.",
                    },
                    {
                      n: "2",
                      t: "Analyse vor Ort",
                      d: "Systematische Messung und Aufnahme zentraler Parameter. Dauer in der Regel 3–4 Stunden.",
                    },
                    {
                      n: "3",
                      t: "Report mit Prioritäten",
                      d: "Innerhalb von 10 Werktagen: Bewertung, Prioritäten und konkrete Massnahmen — schriftlich.",
                    },
                  ].map((x) => (
                    <li key={x.n} className="relative flex items-start gap-4">
                      <div className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground font-heading text-sm font-semibold text-background shadow-sm ring-4 ring-[color:var(--surface-2)]">
                        {x.n}
                      </div>
                      <div className="card-premium flex-1 p-4">
                        <div className="font-heading text-base font-semibold tracking-tight text-foreground">
                          {x.t}
                        </div>
                        <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{x.d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </Section>

        {/* ─────────────────────────────────── WAITLIST ─────────────────────────────────── */}
        <Section id="waitlist" aria-labelledby="waitlist-h">
          <Container>
            <div
              className="relative overflow-hidden rounded-[28px] border border-border bg-surface p-6 shadow-sm sm:p-10"
              style={{
                backgroundImage:
                  "radial-gradient(70% 90% at 0% 0%, rgba(15,118,110,0.06), transparent 60%), radial-gradient(60% 70% at 100% 100%, rgba(204,251,241,0.45), transparent 70%)",
              }}
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-[color:var(--brand)]" />
                    Warteliste · Pilot
                  </div>
                  <h2
                    id="waitlist-h"
                    className="font-heading text-pretty text-3xl font-semibold tracking-tight sm:text-4xl"
                  >
                    Pilotprojekt Zürich
                  </h2>
                  <p className="mt-4 max-w-prose text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Hausdiagnose startet als Pilotprojekt im Raum Zürich. Tragen Sie sich unverbindlich ein —
                    Sie erfahren als Erste, wann die ersten Termine verfügbar sind.
                  </p>

                  <ul className="mt-6 grid gap-3 text-sm sm:text-[15px]">
                    {[
                      "Unverbindlich, jederzeit widerrufbar",
                      "Keine Werbung — nur Launch‑relevante Updates",
                      "Daten werden in der Schweiz/EU verarbeitet, serverseitig gespeichert",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3 text-muted-foreground">
                        <span
                          aria-hidden="true"
                          className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--breeze)] text-[color:var(--brand)]"
                        >
                          <svg
                            viewBox="0 0 16 16"
                            className="size-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                          >
                            <path d="M3 8.5l3.2 3 6.3-7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-2xl border border-border bg-background/85 p-3 shadow-sm backdrop-blur-sm">
                    <WaitlistForm />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* ─────────────────────────────────── FAQ ─────────────────────────────────── */}
        <Section id="faq" tone="alt" aria-labelledby="faq-h">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-[color:var(--brand)]" />
                  FAQ
                </div>
                <h2 id="faq-h" className="font-heading text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                  Häufige Fragen
                </h2>
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Klar, vorsichtig formuliert. Wenn etwas fehlt, schreiben Sie uns gern an{" "}
                  <a
                    className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
                    href="mailto:kontakt@hausdiagnose.ch"
                  >
                    kontakt@hausdiagnose.ch
                  </a>
                  .
                </p>
              </div>
              <div className="lg:col-span-7">
                <Accordion className="gap-3" defaultValue={["was-prueft"]} multiple>
                  {FAQ_ENTRIES.map((x) => (
                    <AccordionItem
                      key={x.id}
                      value={x.id}
                      className="card-premium px-4"
                    >
                      <AccordionTrigger className="py-4 font-heading text-base font-semibold tracking-tight">
                        {x.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 leading-relaxed text-muted-foreground">
                        {x.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </Container>
        </Section>

        {/* ─────────────────────────────── FINAL CTA ─────────────────────────────── */}
        <Section id="kontakt" aria-labelledby="kontakt-h">
          <Container>
            <div className="card-premium p-6 sm:p-10">
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                  <h2 id="kontakt-h" className="font-heading text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                    Bereit für Klarheit?
                  </h2>
                  <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Tragen Sie sich auf die Warteliste ein — oder schreiben Sie uns direkt. Wir melden uns zum
                    Launch im Raum Zürich.
                  </p>
                </div>
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end lg:col-span-5">
                  <a
                    href="#waitlist"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--brand)] px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-[color:var(--brand-hover)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
                  >
                    Auf die Warteliste
                  </a>
                  <a
                    href="mailto:kontakt@hausdiagnose.ch"
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-5 text-sm font-medium text-foreground shadow-sm transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30"
                  >
                    kontakt@hausdiagnose.ch
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
