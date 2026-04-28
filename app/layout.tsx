import type { Metadata } from "next";
import { Geist_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { getSiteUrl } from "@/lib/seo/site";

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Headings: Plus Jakarta Sans — modern, premium, slightly tight.
const heading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

// Body / UI: Inter — neutral, highly readable.
const body = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Hausdiagnose — Homecheck für gesundes Wohnen in der Schweiz",
    template: "%s · Hausdiagnose",
  },
  description:
    "Hausdiagnose analysiert das Wohnumfeld wissenschaftlich: Luft, Wasser, Schimmel/Feuchte, Radon. Klare Prioritäten und Massnahmen für ein gesundes Zuhause. Pilotprojekt im Raum Zürich.",
  applicationName: "Hausdiagnose",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Hausdiagnose",
    "Homecheck",
    "Wohngesundheit",
    "gesundes Wohnen",
    "Luftqualität Zuhause",
    "Wasserqualität Zuhause",
    "Schimmel Wohnung",
    "Radon Schweiz",
    "Wohnumfeld Analyse",
    "Zürich",
  ],
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: "Hausdiagnose",
    title: "Hausdiagnose — Homecheck für gesundes Wohnen",
    description:
      "Wissenschaftliche Analyse von Luft, Wasser, Schimmel/Feuchte und Radon — mit klaren Massnahmen. Pilotprojekt im Raum Zürich.",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hausdiagnose — Healthy Home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hausdiagnose — Homecheck für gesundes Wohnen",
    description:
      "Wissenschaftliche Analyse von Luft, Wasser, Schimmel/Feuchte und Radon — mit klaren Massnahmen. Pilotprojekt im Raum Zürich.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de-CH"
      className={`${body.variable} ${heading.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
