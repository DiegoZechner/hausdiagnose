import * as React from "react";

import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  tone = "default",
  ...props
}: React.ComponentProps<"div"> & { tone?: "default" | "muted" }) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)} {...props}>
      <div
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-xl border border-border bg-surface shadow-sm",
          tone === "muted" && "bg-background/60"
        )}
        aria-hidden="true"
      >
        <span className="font-heading text-sm tracking-tight">HD</span>
      </div>
      <div className="leading-none">
        <div className="text-sm font-medium tracking-tight text-foreground">
          Hausdiagnose
        </div>
        <div className="mt-1 text-[11px] text-muted-foreground">
          Wohnumfeld · Gesundheit · Schweiz
        </div>
      </div>
    </div>
  );
}

