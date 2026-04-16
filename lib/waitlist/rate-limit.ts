type Bucket = { count: number; resetAt: number };

declare global {
  var __hausdiagnose_waitlist_rl__: Map<string, Bucket> | undefined;
}

function getStore() {
  if (!globalThis.__hausdiagnose_waitlist_rl__) {
    globalThis.__hausdiagnose_waitlist_rl__ = new Map();
  }
  return globalThis.__hausdiagnose_waitlist_rl__;
}

export function rateLimit(opts: {
  key: string;
  windowMs: number;
  max: number;
}): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const store = getStore();

  const prev = store.get(opts.key);
  if (!prev || prev.resetAt <= now) {
    store.set(opts.key, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true };
  }

  if (prev.count >= opts.max) {
    return { ok: false, retryAfterSec: Math.ceil((prev.resetAt - now) / 1000) };
  }

  prev.count += 1;
  store.set(opts.key, prev);
  return { ok: true };
}

