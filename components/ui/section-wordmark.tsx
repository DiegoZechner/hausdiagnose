import * as React from "react";

import { cn } from "@/lib/utils";

type SectionWordmarkTone = "evidenz" | "schweiz" | "prozess" | "default";

const REPEATS = Array.from({ length: 8 });

// Adjusted opacities for the new, lighter pastel green to remain visible but subtle
const TONE_OPACITY: Record<SectionWordmarkTone, { base: number; alternate: number }> = {
  default: { base: 0.4, alternate: 0.25 },
  evidenz: { base: 0.45, alternate: 0.3 },
  schweiz: { base: 0.35, alternate: 0.2 },
  prozess: { base: 0.4, alternate: 0.25 },
};

function clampOpacity(value: number) {
  return Math.max(0, Math.min(value, 0.8));
}

/**
 * Very subtle repeated-word background texture for premium section branding.
 *
 * It intentionally sits behind all real content (`z-0`, pointer-events none),
 * uses a light mint/teal RGBA to stay bright and soft, and fades at the edges.
 * 
 * Tweak points:
 * - row count: `rows`
 * - overall strength: `opacity` (internally capped)
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
        // Softened gradient mask to fade out smoothly at the edges
        "[mask-image:linear-gradient(180deg,transparent_0%,black_20%,black_80%,transparent_100%)]",
        className,
      )}
    >
      <div className="absolute inset-x-[-18vw] inset-y-14 overflow-hidden sm:inset-y-16">
        <div className="h-full [mask-image:linear-gradient(90deg,transparent_0%,black_15%,black_85%,transparent_100%)]">
          <div className="flex h-full flex-col justify-between">
            {rowItems.map((_, row) => {
              const rowOpacity = row % 2 === 0 ? baseOpacity : alternateOpacity;

              return (
                <div
                  key={row}
                  className={cn(
                    "flex w-max gap-[0.52em] font-heading text-[clamp(3rem,8.6vw,7.75rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]",
                    // Increased blur for a softer, texture-like quality
                    "blur-[1.5px]",
                    row % 2 === 1 && "-translate-x-[12vw]",
                  )}
                  // Pale, warm pastel green based on the provided reference image
                  style={{ color: `rgba(0, 0, 0, ${rowOpacity})` }}
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
