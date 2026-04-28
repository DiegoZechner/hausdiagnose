import * as React from "react";

import { cn } from "@/lib/utils";

type SectionWordmarkTone = "evidenz" | "schweiz" | "prozess" | "default";

const REPEATS = Array.from({ length: 8 });

const TONE_OPACITY: Record<SectionWordmarkTone, { base: number; alternate: number }> = {
  default: { base: 0.052, alternate: 0.032 },
  evidenz: { base: 0.056, alternate: 0.036 },
  schweiz: { base: 0.044, alternate: 0.028 },
  prozess: { base: 0.052, alternate: 0.032 },
};

function clampOpacity(value: number) {
  return Math.max(0, Math.min(value, 0.12));
}

/**
 * Very subtle repeated-word background texture for premium section branding.
 *
 * It intentionally sits behind all real content (`z-0`, pointer-events none),
 * uses mint/teal RGBA rather than foreground/navy, and fades at the edges.
 *
 * Tweak points:
 * - row count: `rows`
 * - overall strength: `opacity` (internally capped at 0.12)
 * - section-specific default strength: `tone`
 * - type size: clamp() class below
 * - spacing/density: REPEATS, `gap-[0.52em]`, and the row container insets
 */
export function SectionWordmark({
  word,
  rows,
  className,
  opacity,
  tone = "default",
}: {
  word: string;
  rows: number;
  className?: string;
  opacity?: number;
  tone?: SectionWordmarkTone;
}) {
  const rowItems = Array.from({ length: rows });
  const toneOpacity = TONE_OPACITY[tone] ?? TONE_OPACITY.default;
  const baseOpacity = clampOpacity(opacity ?? toneOpacity.base);
  const alternateOpacity = clampOpacity(Math.min(baseOpacity * 0.64, toneOpacity.alternate));

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden select-none",
        "[mask-image:linear-gradient(180deg,transparent_0%,black_18%,black_78%,transparent_100%)]",
        className,
      )}
    >
      <div className="absolute inset-x-[-18vw] inset-y-14 overflow-hidden sm:inset-y-16">
        <div className="h-full [mask-image:linear-gradient(90deg,transparent_0%,black_16%,black_84%,transparent_100%)]">
          <div className="flex h-full flex-col justify-between">
            {rowItems.map((_, row) => {
              const rowOpacity = row % 2 === 0 ? baseOpacity : alternateOpacity;

              return (
                <div
                  key={row}
                  className={cn(
                    "flex w-max gap-[0.52em] font-heading text-[clamp(3rem,8.6vw,7.75rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]",
                    "blur-[0.15px]",
                    row % 2 === 1 && "-translate-x-[12vw]",
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
      </div>
    </div>
  );
}
