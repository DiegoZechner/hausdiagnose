export type RateLimitDecision =
  | { ok: true }
  | { ok: false; retryAfterSec: number };

/**
 * Distributed-safe rate limiting interface.
 * Implementations may use Redis/KV; the default uses process memory (dev / single instance).
 */
export interface RateLimiter {
  consume(key: string): Promise<RateLimitDecision>;
}
