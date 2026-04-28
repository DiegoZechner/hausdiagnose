import Link from "next/link";

import { Wordmark } from "@/components/brand/wordmark";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/70 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-muted-foreground sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <Wordmark tone="muted" />
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <nav aria-label="Rechtliche Hinweise" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link className="transition-colors hover:text-foreground" href="/impressum">
              Impressum
            </Link>
            <Link className="transition-colors hover:text-foreground" href="/datenschutz">
              Datenschutz
            </Link>
            <a className="transition-colors hover:text-foreground" href="mailto:kontakt@hausdiagnose.ch">
              kontakt@hausdiagnose.ch
            </a>
          </nav>
          <p className="max-w-prose text-xs leading-relaxed lg:text-right">
            Hausdiagnose bewertet das Wohnumfeld (Luft, Wasser, Feuchte, Radon) und ersetzt keine medizinische
            Abklärung. Bei gesundheitlichen Beschwerden wenden Sie sich an medizinische Fachpersonen.
          </p>
        </div>
      </div>
    </footer>
  );
}
