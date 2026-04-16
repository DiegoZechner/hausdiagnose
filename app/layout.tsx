import type { Metadata } from "next";
import { Geist_Mono, Newsreader, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/seo/site";

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

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Hausdiagnose — Homecheck für gesundes Wohnen",
    template: "%s · Hausdiagnose",
  },
  description:
    "Hausdiagnose (Homecheck) analysiert Ihr Zuhause wissenschaftlich: Luft, Wasser, Schimmel/Feuchte, Radon und weitere Faktoren – mit klaren Prioritäten und Massnahmen. Start in Kürze im Raum Zürich.",
  applicationName: "Hausdiagnose",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Hausdiagnose",
    title: "Hausdiagnose — Homecheck für gesundes Wohnen",
    description:
      "Wissenschaftliche Analyse von Luft, Wasser, Schimmel/Feuchte und Radon – mit klaren Massnahmen. Start in Kürze im Raum Zürich.",
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
      "Wissenschaftliche Analyse von Luft, Wasser, Schimmel/Feuchte und Radon – mit klaren Massnahmen. Start in Kürze im Raum Zürich.",
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
      lang="de"
      className={`${body.variable} ${heading.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
