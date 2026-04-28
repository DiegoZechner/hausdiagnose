"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * CLS-safe rotating phrase.
 *
 * Layout strategy:
 * - All phrases share a single CSS grid cell. The cell's intrinsic size becomes
 *   the maximum of every phrase's natural box — so the wrapper always reserves
 *   space for the longest possible phrase at the current breakpoint, including
 *   multi-line wraps. This makes phrase changes 100% CLS-free.
 * - Only the active phrase is visible; others are aria-hidden + opacity-0.
 * - Animation is a subtle opacity crossfade (no slide, no layout-affecting motion).
 * - Respects `prefers-reduced-motion`: shows a single, fixed phrase without
 *   timers or animation.
 */
export function TextRotate({
  words,
  intervalMs = 2400,
  className,
}: {
  words: string[];
  intervalMs?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (reduceMotion) return;
    if (words.length <= 1) return;
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs, words.length, reduceMotion]);

  if (reduceMotion || words.length <= 1) {
    return <span className={className}>{words[0] ?? ""}</span>;
  }

  return (
    <span
      className={cn(
        "grid w-full",
        // Single grid area shared by every phrase.
        "[grid-template-areas:'stack']",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        {words.map((w, i) =>
          i === idx ? (
            <motion.span
              key={`active-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.21, 0.61, 0.35, 1] }}
              className="[grid-area:stack]"
            >
              {w}
            </motion.span>
          ) : null,
        )}
      </AnimatePresence>
      {/* Sizing ghosts: every phrase rendered invisibly into the same grid cell so
          the cell's intrinsic size = max(phrase). Pointer/keyboard inert. */}
      {words.map((w, i) => (
        <span
          key={`ghost-${i}`}
          aria-hidden="true"
          className="invisible select-none [grid-area:stack]"
        >
          {w}
        </span>
      ))}
    </span>
  );
}
