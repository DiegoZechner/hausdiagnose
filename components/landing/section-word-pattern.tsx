import * as React from "react";

import { cn } from "@/lib/utils";

const REPEATS = Array.from({ length: 9 });

/**
 * Decorative tone-on-tone repeated-word texture for section backgrounds.
 *
 * Tweak points:
 * - opacity: `opacity` + `alternateOpacity` props (max recommended: 0.14)
 * - word size: clamp() in the className below
 * - spacing: `gap-[0.36em]` and row `justify-between`
 * - repetition density: REPEATS constant and `rows` prop
 * - section-specific word: `word` prop
 */
export function SectionWordPattern({
  word,
  rows,
  className,
  opacity = 0.1,
  alternateOpacity = 0.065,
}: {
  word: string;
  rows: number;
  className?: string;
  opacity?: number;
  alternateOpacity?: number;
}) {
  const rowItems = Array.from({ length: rows });
  const baseOpacity = Math.min(opacity, 0.14);
  const softOpacity = Math.min(alternateOpacity, 0.14);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden select-none",
        "[mask-image:linear-gradient(180deg,transparent,black_10%,black_88%,transparent)]",
        className,
      )}
    >
      <div className="absolute inset-x-[-12vw] inset-y-8 flex flex-col justify-between sm:inset-y-10">
        {rowItems.map((_, row) => {
          const rowOpacity = row % 2 === 0 ? baseOpacity : softOpacity;
          return (
            <div
              key={row}
              className={cn(
                "flex w-max gap-[0.36em] font-heading text-[clamp(3.8rem,10vw,9rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]",
                row % 2 === 1 && "-translate-x-[14vw]",
              )}
              style={{ color: `rgba(15, 118, 110, ${rowOpacity})` }}
            >
              {REPEATS.map((_, i) => (
                <span key={`${row}-${i}`} className="whitespace-nowrap">
                  {word}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
