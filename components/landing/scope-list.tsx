import * as React from "react";

export type ScopeItem = { k: string; v: string };

export function ScopeList({ items }: { items: ScopeItem[] }) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-4">
      <div className="text-xs font-medium tracking-wide text-muted-foreground">
        Was wir einordnen (Auszug)
      </div>
      <div className="mt-3 grid gap-2 text-sm">
        {items.map((x) => (
          <div key={x.k} className="flex items-baseline justify-between gap-3">
            <div className="font-medium text-foreground">{x.k}</div>
            <div className="text-right text-muted-foreground">{x.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

