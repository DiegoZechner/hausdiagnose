import Link from "next/link";

import { Wordmark } from "@/components/brand/wordmark";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <Wordmark tone="muted" />
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Link className="hover:text-foreground" href="/impressum">
              Impressum
            </Link>
            <Link className="hover:text-foreground" href="/datenschutz">
              Datenschutz
            </Link>
            <Link className="hover:text-foreground" href="/datenschutz#hinweise">
              Hinweise
            </Link>
          </div>
          <p className="max-w-prose text-xs leading-relaxed sm:text-right">
            Hausdiagnose bewertet das Wohnumfeld (z. B. Luft, Wasser, Feuchte, Radon) und ersetzt keine
            medizinische Abklärung. Bei gesundheitlichen Beschwerden wende dich an medizinische Fachpersonen.
          </p>
        </div>
      </div>
    </footer>
  );
}
