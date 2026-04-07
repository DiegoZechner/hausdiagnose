"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export function ContainerScrollAnimation({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.2"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {reduceMotion ? (
        <div className="rounded-[28px] border border-border bg-surface shadow-sm">
          {children}
        </div>
      ) : (
        <motion.div
          style={{ scale, y, opacity }}
          className="rounded-[28px] border border-border bg-surface shadow-sm"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

