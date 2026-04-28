import * as React from "react";

import { cn } from "@/lib/utils";

const REPEATS = Array.from({ length: 7 });
const ROWS = Array.from({ length: 3 });

/**
 * Decorative low-contrast repeated-word texture for section intros.
 *
 * Tweak points:
 * - opacity: via the `opacity` prop
 * - word size: `text-[...]` classes below
 * - spacing: `gap-8 sm:gap-12 lg:gap-16` and `tracking-[0.18em]`
 * - repetition density: REPEATS / ROWS constants above
 * - section-specific word: `word` prop
 */
export function SectionWordPattern({
  word,
  className,
  opacity = 0.035,
}: {
  word: string;
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-0 h-52 overflow-hidden sm:h-64",
        "[mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
      style={{ opacity }}
    >
      <div className="-mx-16 mt-2 space-y-2 sm:mt-0 sm:space-y-4">
        {ROWS.map((_, row) => (
          <div
            key={row}
            className={cn(
              "flex w-max select-none gap-8 font-heading text-[2.7rem] font-bold uppercase leading-none tracking-[0.18em] text-foreground sm:gap-12 sm:text-[4.5rem] lg:gap-16 lg:text-[6rem]",
              row % 2 === 1 && "-translate-x-16 sm:-translate-x-28",
              row === 2 && "hidden sm:flex",
            )}
          >
            {REPEATS.map((_, i) => (
              <span key={`${row}-${i}`} className="whitespace-nowrap">
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
