"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type InputWithFeedbackProps = React.ComponentProps<"input"> & {
  label: string;
  hint?: string;
  error?: string;
};

export function InputWithFeedback({
  label,
  hint,
  error,
  className,
  id,
  ...props
}: InputWithFeedbackProps) {
  const inputId = id ?? React.useId();
  const hintId = `${inputId}-hint`;
  const errId = `${inputId}-err`;
  const describedBy = error ? errId : hint ? hintId : undefined;

  return (
    <div className="grid gap-1.5">
      <label htmlFor={inputId} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedBy}
        className={cn(
          "h-11 w-full rounded-xl border border-input bg-background px-3 text-[15px] text-foreground shadow-sm outline-none placeholder:text-muted-foreground",
          "transition-colors duration-200",
          "focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40",
          "disabled:cursor-not-allowed disabled:opacity-60",
          error && "border-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/20",
          className
        )}
        {...props}
      />
      {error ? (
        <div id={errId} className="text-xs text-destructive">
          {error}
        </div>
      ) : hint ? (
        <div id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </div>
      ) : null}
    </div>
  );
}

