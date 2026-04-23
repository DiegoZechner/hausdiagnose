import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import type { RateLimiter } from "./types";

/**
 * Upstash Redis–backed limiter for serverless / multi-instance deployments.
 * Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
 */
export function createUpstashSlidingWindowRateLimiter(opts: {
  prefix: string;
  windowMs: number;
  max: number;
}): RateLimiter | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;

  const redis = new Redis({ url, token });
  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(opts.max, `${opts.windowMs} ms`),
    prefix: opts.prefix,
    analytics: false,
  });

  return {
    async consume(key: string) {
      const res = await limiter.limit(key);
      if (res.success) return { ok: true };
      const retryAfterSec = Math.max(1, Math.ceil((res.reset - Date.now()) / 1000));
      return { ok: false, retryAfterSec };
    },
  };
}
