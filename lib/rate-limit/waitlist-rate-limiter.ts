import { createMemoryRateLimiter } from "./memory-rate-limiter";
import { createUpstashSlidingWindowRateLimiter } from "./upstash-rate-limiter";
import type { RateLimiter } from "./types";

const WINDOW_MS = 60_000;
const MAX = 6;

/**
 * Prefer Upstash when configured; otherwise fall back to in-memory limiting.
 * In-memory limiting is not reliable across serverless instances — see DEPLOYMENT.md.
 */
export function getWaitlistIpRateLimiter(): RateLimiter {
  const upstash =
    createUpstashSlidingWindowRateLimiter({
      prefix: "hausdiagnose:waitlist:ip",
      windowMs: WINDOW_MS,
      max: MAX,
    }) ?? null;

  return upstash ?? createMemoryRateLimiter({ windowMs: WINDOW_MS, max: MAX });
}
