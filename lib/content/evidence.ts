/**
 * Evidence content for the four core indoor-environment topics shown on the
 * landing page. Sources point to public-health institutions and peer-reviewed
 * literature. Wording is intentionally cautious ("kann", "steht in Verbindung
 * mit", "gilt als") and never frames Hausdiagnose as a medical diagnosis.
 *
 * If you change a source URL, double-check the claim it backs is still
 * accurate at that source — we don't want stale citations on a public page.
 */

export type EvidenceSource = {
  label: string;
  href: string;
};

export type EvidenceTopic = {
  id: "luft" | "wasser" | "schimmel" | "radon";
  title: string;
  intro: string;
  bullets: string[];
  whyRelevant: string;
  causesOrPrevalence?: string;
  sources: EvidenceSource[];
};

export const evidenceTopics: readonly EvidenceTopic[] = [
  {
    id: "luft",
    title: "Luftqualität",
    intro:
      "Innenraumluft kann Partikel, flüchtige organische Verbindungen (VOCs) und erhöhte CO₂-Werte enthalten — alles Faktoren, die das Wohlbefinden und die Gesundheit beeinflussen können.",
    bullets: [
      "Luftverschmutzung (auch in Innenräumen) gilt laut WHO als einer der grössten umweltbedingten Gesundheitsrisikofaktoren weltweit.",
      "VOCs (z. B. aus Möbeln, Reinigern, Renovierungen) und Feinstaub können Atemwege, Schlaf und Konzentration belasten.",
      "Dauerhaft hohe CO₂-Werte stehen in Verbindung mit Müdigkeit, Kopfschmerzen und reduzierter kognitiver Leistung.",
    ],
    whyRelevant:
      "Wir verbringen einen grossen Teil unseres Lebens in Innenräumen. Schon einfache Massnahmen (Lüftung, Quellenkontrolle, Filter) können messbar wirken.",
    causesOrPrevalence:
      "Häufige Quellen: Möbel/Materialien, Heizen, Kochen, Reinigungsprodukte, mangelnde Lüftung in dicht gebauten Gebäuden.",
    sources: [
      {
        label: "WHO — Health impacts of air pollution",
        href: "https://www.who.int/teams/environment-climate-change-and-health/air-quality-energy-and-health/health-impacts",
      },
      {
        label: "U.S. EPA — Indoor Air Quality",
        href: "https://www.epa.gov/report-environment/indoor-air-quality",
      },
      {
        label: "Peer-reviewed Übersicht (PMC)",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12052406/",
      },
    ],
  },
  {
    id: "wasser",
    title: "Wasserqualität",
    intro:
      "Leitungswasser ist in der Schweiz im Allgemeinen gut, aber nicht überall gleich. Lokale Faktoren wie Hausinstallation, Region oder Industriealtlasten können relevante Unterschiede erzeugen.",
    bullets: [
      "PFAS („Forever Chemicals“) wurden in Forschungsarbeiten in Teilen des Schweizer Grundwassers nachgewiesen; ihre gesundheitliche Bedeutung ist Gegenstand laufender Forschung.",
      "PFAS stehen laut US-Bundesgesundheitsbehörde (NIEHS) in Verbindung mit verschiedenen Gesundheitsrisiken — u. a. Cholesterin, Schilddrüse, Immunsystem.",
      "Blei aus älteren Hausinstallationen kann in Einzelfällen ins Wasser übergehen; selbst geringe Bleiexpositionen gelten als gesundheitlich relevant.",
    ],
    whyRelevant:
      "Sie trinken jeden Tag dasselbe Wasser. Es lohnt sich zu wissen, welche Indikatoren in Ihrer Situation wirklich relevant sind — und welche nicht.",
    causesOrPrevalence:
      "Häufige Auslöser: lokale Quellen/Aufbereitung, alte Hausleitungen (Blei-Lötstellen, Kupfer), regionale PFAS-Hotspots in der Nähe von Industriestandorten.",
    sources: [
      {
        label: "NIEHS — PFAS Health Topic",
        href: "https://www.niehs.nih.gov/health/topics/agents/pfc",
      },
      {
        label: "PMC — Lead exposure and health",
        href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12692638/",
      },
      {
        label: "Recherche zu PFAS im Schweizer Trinkwasser (Euronews)",
        href: "https://www.euronews.com/green/2023/10/13/swiss-drinking-water-is-contaminated-with-forever-chemicals-research-shows",
      },
    ],
  },
  {
    id: "schimmel",
    title: "Schimmel & Feuchte",
    intro:
      "Feuchte und Schimmel im Innenraum entwickeln sich oft schleichend, hinter Bauteilen oder in Ecken. Sie können das Raumklima und die Atemwegsgesundheit messbar beeinträchtigen.",
    bullets: [
      "Die Europäische Umweltagentur (EEA) weist Innenraumfeuchte und Schimmel als relevanten Risikofaktor für chronische Atemwegserkrankungen aus.",
      "Meta-Analysen zeigen einen statistischen Zusammenhang zwischen Feuchte/Schimmel im Wohnraum und Atemwegssymptomen, einschliesslich Asthma-Verschlechterung.",
      "Schimmel ist häufig Folge eines anderen Problems (Wärmebrücke, Bauschaden, Lüftungsverhalten) — die Ursache ist meist wichtiger als das sichtbare Symptom.",
    ],
    whyRelevant:
      "Schimmel ist mehr als ein optisches Problem. Eine systematische Analyse hilft, die tatsächliche Ursache zu finden, bevor saniert wird.",
    causesOrPrevalence:
      "Häufige Auslöser: Wärmebrücken, ungünstiges Lüftungsverhalten in dicht sanierten Gebäuden, Wasserschäden, Kondensation an Fenstern/Aussenwänden.",
    sources: [
      {
        label: "EEA — Indoor environment, mould and dampness",
        href: "https://www.eea.europa.eu/en/analysis/publications/beating-chronic-respiratory-disease/indoor-environment-mould-and-dampness",
      },
      {
        label: "Meta-Analyse (PMC)",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4667360/",
      },
    ],
  },
  {
    id: "radon",
    title: "Radon",
    intro:
      "Radon ist ein natürliches radioaktives Edelgas, das aus dem Untergrund in Gebäude eindringen kann. Die Konzentration ist regional sehr unterschiedlich — in Teilen der Schweiz erhöht.",
    bullets: [
      "Die WHO ordnet Radon als zweithäufigste Ursache von Lungenkrebs nach dem Rauchen ein.",
      "Studien zeigen, dass die Schweiz im europäischen Vergleich zu den Ländern mit erhöhter Radon-Exposition gehört.",
      "Radon lässt sich nur durch eine Messung zuverlässig feststellen — eine Einschätzung „nach Bauchgefühl“ ist nicht möglich.",
    ],
    whyRelevant:
      "Wer in einer betroffenen Region lebt oder im Untergeschoss schläft, profitiert von einer einmaligen Einordnung — und einer klaren Empfehlung, ob eine Messung sinnvoll ist.",
    causesOrPrevalence:
      "Hauptursache ist der Untergrund. Eintrittswege: undichte Bodenplatten, Kellerräume, Risse, Versorgungsleitungen.",
    sources: [
      {
        label: "WHO — Radon and health",
        href: "https://www.who.int/news-room/fact-sheets/detail/radon-and-health",
      },
      {
        label: "Schweizer Prävalenzstudie (PubMed)",
        href: "https://pubmed.ncbi.nlm.nih.gov/33387778/",
      },
      {
        label: "Frontiers in Public Health (2025)",
        href: "https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2025.1625922/full",
      },
    ],
  },
] as const;
