import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");

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

  const payload = [organizationJsonLd, webSiteJsonLd, serviceJsonLd, faqJsonLd];

  return new NextResponse(JSON.stringify(payload), {
    status: 200,
    headers: {
      "content-type": "application/ld+json; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

