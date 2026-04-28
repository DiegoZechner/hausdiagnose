"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

const PARALLAX_MAX_PX = 28;
const PARALLAX_FACTOR = -0.06;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Full-bleed hero background with a tiny scroll parallax.
 *
 * The image layer is intentionally larger than the hero (`-inset-y-[6%]`) and
 * softly scaled so scroll transforms never reveal blank edges. The scroll
 * handler is RAF-throttled and transform-only (GPU-friendly). Reduced-motion
 * users get the same full-bleed image without scroll animation.
 */
export function HeroParallaxImage({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (!root || reduceMotion) return;

    const update = () => {
      frameRef.current = null;
      const rect = root.getBoundingClientRect();
      const y = clamp(rect.top * PARALLAX_FACTOR, -PARALLAX_MAX_PX, PARALLAX_MAX_PX);
      root.style.setProperty("--hero-parallax-y", `${y.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(
        "absolute inset-0 overflow-hidden",
        "motion-safe:will-change-transform",
        className,
      )}
      style={{
        transform: "translate3d(0, var(--hero-parallax-y, 0px), 0) scale(1.06)",
      }}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
