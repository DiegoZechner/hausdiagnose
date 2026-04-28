import * as React from "react";

import { cn } from "@/lib/utils";

type SectionTone = "default" | "alt" | "bare";

/**
 * Section provides consistent vertical rhythm across the homepage and an
 * optional `tone` for alternating section backgrounds.
 *
 * - `default` (Clean White) is used for the canonical content sections.
 * - `alt` uses --surface-2, a barely-tinted Fresh Breeze, to create a calm,
 *   premium two-tone alternation between sections without ever feeling busy.
 * - `bare` removes the vertical padding entirely — used by the hero, which
 *   provides its own framing.
 */
export function Section({
  className,
  tone = "default",
  ...props
}: React.ComponentProps<"section"> & { tone?: SectionTone }) {
  return (
    <section
      data-tone={tone}
      className={cn(
        tone === "bare" ? "" : "py-14 sm:py-20",
        tone === "alt" && "bg-[color:var(--surface-2)]",
        className,
      )}
      {...props}
    />
  );
}
