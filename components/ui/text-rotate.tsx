"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export function TextRotate({
  words,
  intervalMs = 1400,
  className,
}: {
  words: string[];
  intervalMs?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (words.length <= 1) return;
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs, words.length]);

  const current = words[idx] ?? "";

  if (reduceMotion) {
    return <span className={className}>{current}</span>;
  }

  return (
    <span className={cn("inline-flex min-w-[8ch] justify-start", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={current}
          initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
          transition={{ duration: 0.28, ease: [0.21, 0.61, 0.35, 1] }}
          className="inline-block"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

