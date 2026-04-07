"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type Spark = {
  id: string;
  x: number;
  y: number;
  delay: number;
  s: number;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function SparklesText({
  children,
  className,
  enabled = true,
}: {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [sparks, setSparks] = React.useState<Spark[]>([]);

  React.useEffect(() => {
    if (!enabled || reduceMotion) return;
    const next: Spark[] = Array.from({ length: 8 }).map((_, i) => ({
      id: String(i) + "-" + String(Date.now()),
      x: rand(6, 94),
      y: rand(10, 90),
      delay: rand(0, 0.35),
      s: rand(0.75, 1.25),
    }));
    setSparks(next);
    const t = window.setTimeout(() => setSparks([]), 1400);
    return () => window.clearTimeout(t);
  }, [enabled, reduceMotion]);

  return (
    <span className={cn("relative inline-flex items-baseline", className)}>
      <span className="relative z-10">{children}</span>
      {enabled && !reduceMotion ? (
        <span aria-hidden className="pointer-events-none absolute inset-0 z-0">
          {sparks.map((s) => (
            <motion.span
              key={s.id}
              initial={{ opacity: 0, scale: 0.6, y: 2 }}
              animate={{ opacity: [0, 1, 0], scale: [0.6, s.s, 0.8], y: [2, -6, -10] }}
              transition={{
                duration: 0.9,
                delay: s.delay,
                ease: [0.21, 0.61, 0.35, 1],
              }}
              className="absolute"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              <span className="block size-1.5 rounded-full bg-[color:var(--brand)] opacity-70 blur-[0.2px]" />
            </motion.span>
          ))}
        </span>
      ) : null}
    </span>
  );
}

