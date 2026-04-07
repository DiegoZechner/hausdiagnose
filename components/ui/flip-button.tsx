"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export function FlipButton({
  className,
  idleText,
  loadingText = "Wird gesendet…",
  successText = "Early Access gesichert",
  state,
  disabled,
  ...props
}: React.ComponentProps<"button"> & {
  idleText: string;
  loadingText?: string;
  successText?: string;
  state: "idle" | "loading" | "success";
}) {
  const reduceMotion = useReducedMotion();

  const label =
    state === "idle" ? idleText : state === "loading" ? loadingText : successText;

  if (reduceMotion) {
    return (
      <button
        className={cn(
          "inline-flex h-11 w-full items-center justify-center rounded-xl bg-[color:var(--brand)] px-4 text-sm font-medium text-primary-foreground shadow-sm",
          "transition-colors duration-200 hover:bg-[color:var(--brand-hover)]",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
          disabled && "opacity-70",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {label}
      </button>
    );
  }

  const isSuccess = state === "success";

  return (
    <button
      className={cn(
        "relative h-11 w-full rounded-xl [perspective:1000px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
        disabled && "opacity-70",
        className
      )}
      disabled={disabled}
      {...props}
    >
      <motion.span
        className="absolute inset-0 grid place-items-center rounded-xl border border-border bg-[color:var(--brand)] px-4 text-sm font-medium text-primary-foreground shadow-sm"
        animate={{
          rotateX: isSuccess ? 180 : 0,
        }}
        transition={{ duration: 0.55, ease: [0.21, 0.61, 0.35, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <span style={{ backfaceVisibility: "hidden" }}>
          {state === "loading" ? loadingText : idleText}
        </span>
        <span
          className="text-primary-foreground"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
          }}
        >
          {successText}
        </span>
      </motion.span>
    </button>
  );
}

