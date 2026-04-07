import * as React from "react";

import { cn } from "@/lib/utils";

export function HeroCanvas({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
      {/* cool “soft slate” light + petrol wash — intentionally subtle */}
      <div className="absolute -top-28 left-1/2 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(15,118,110,0.10)_0%,transparent_68%)] blur-2xl" />
      <div className="absolute -bottom-64 -left-44 h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(17,24,39,0.06)_0%,transparent_70%)] blur-2xl" />
      <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,rgba(248,250,252,0.72),transparent)]" />
    </div>
  );
}

