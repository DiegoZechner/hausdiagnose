import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Brand wordmark. The mark is a 9×9 rounded square with a small Vital Teal
 * gradient and a tightly tracked "HD" set in the heading typeface.
 *
 * `tone="muted"` is used inside the footer to lower contrast vs the page.
 */
export function Wordmark({
  className,
  tone = "default",
  ...props
}: React.ComponentProps<"div"> & { tone?: "default" | "muted" }) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)} {...props}>
      <div
        className={cn(
          "relative inline-flex size-9 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface shadow-sm",
          tone === "muted" && "bg-background/70",
        )}
        aria-hidden="true"
      >
        <span
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(110% 100% at 0% 0%, rgba(15,118,110,0.18), transparent 60%), linear-gradient(180deg, rgba(15,118,110,0.06), transparent)",
          }}
        />
        <span className="relative font-heading text-[13px] font-semibold tracking-[-0.02em] text-foreground">
          HD
        </span>
      </div>
      <div className="leading-none">
        <div className="font-heading text-[15px] font-semibold tracking-[-0.01em] text-foreground">
          Hausdiagnose
        </div>
        <div className="mt-1 text-[11px] tracking-wide text-muted-foreground">
          Wohnumfeld · Gesundheit · Schweiz
        </div>
      </div>
    </div>
  );
}
