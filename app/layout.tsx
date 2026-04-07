import type { Metadata } from "next";
import { Geist_Mono, Newsreader, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const heading = Newsreader({
  variable: "--font-heading",
  subsets: ["latin"],
});

const body = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: {
    default: "Hausdiagnose — Wohnumfeld & Gesundheit",
    template: "%s · Hausdiagnose",
  },
  description:
    "Hausdiagnose ordnet dein Wohnumfeld verständlich ein: Luft, Wasser, Feuchtigkeit/Schimmel, Radon & relevante Umweltfaktoren im Zuhause — Start in Kürze. Trag dich in die Warteliste ein.",
  applicationName: "Hausdiagnose",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Hausdiagnose",
    title: "Hausdiagnose — Wohnumfeld & Gesundheit",
    description:
      "Wissenschaftlich fundierte Analyse von relevanten Umweltfaktoren im Zuhause. Start in Kürze — Warteliste offen.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hausdiagnose — Wohnumfeld & Gesundheit",
    description:
      "Wissenschaftlich fundierte Analyse von relevanten Umweltfaktoren im Zuhause. Start in Kürze — Warteliste offen.",
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
      lang="de"
      className={`${body.variable} ${heading.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
