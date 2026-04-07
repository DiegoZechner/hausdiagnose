import * as React from "react";

import { cn } from "@/lib/utils";

export function InlineTrust({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((t) => (
        <span
          key={t}
          className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

