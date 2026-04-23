import type { RateLimiter } from "./types";

type Bucket = { count: number; resetAt: number };

declare global {
  var __hausdiagnose_rl_memory__: Map<string, Bucket> | undefined;
}

function getStore() {
  if (!globalThis.__hausdiagnose_rl_memory__) {
    globalThis.__hausdiagnose_rl_memory__ = new Map();
  }
  return globalThis.__hausdiagnose_rl_memory__;
}

export function createMemoryRateLimiter(opts: { windowMs: number; max: number }): RateLimiter {
  return {
    async consume(key: string) {
      const now = Date.now();
      const store = getStore();

      const prev = store.get(key);
      if (!prev || prev.resetAt <= now) {
        store.set(key, { count: 1, resetAt: now + opts.windowMs });
        return { ok: true };
      }

      if (prev.count >= opts.max) {
        return { ok: false, retryAfterSec: Math.ceil((prev.resetAt - now) / 1000) };
      }

      prev.count += 1;
      store.set(key, prev);
      return { ok: true };
    },
  };
}
