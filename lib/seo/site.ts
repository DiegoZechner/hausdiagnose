const DEV_FALLBACK = "http://localhost:3000";

function isNonProductionNodeEnv() {
  // Vitest sets NODE_ENV=test; local dev uses development.
  return process.env.NODE_ENV !== "production";
}

function isVercelPreview() {
  return process.env.VERCEL_ENV === "preview";
}

function isVercelProduction() {
  return process.env.VERCEL_ENV === "production";
}

function isLocalDevRuntime() {
  // `next dev` sets NODE_ENV=development. Builds use NODE_ENV=production.
  return process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
}

function parseHttpUrl(raw: string): URL | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withProtocol =
    trimmed.startsWith("http://") || trimmed.startsWith("https://") ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(withProtocol);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    if (!u.host) return null;
    return u;
  } catch {
    return null;
  }
}

/**
 * Production / preview deployments must ship a canonical public origin.
 * Local `next dev` may fall back to http://localhost:3000.
 * Local `next build` runs with NODE_ENV=production — set NEXT_PUBLIC_SITE_URL for builds.
 */
export function assertProductionPublicSiteUrl(): void {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const parsed = raw ? parseHttpUrl(raw) : null;

  if (parsed && parsed.protocol === "https:") return;

  if (isVercelProduction() || isVercelPreview()) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be set to a valid https URL for Vercel deployments (preview + production)."
    );
  }

  if (isNonProductionNodeEnv()) return;

  // production Node without Vercel signals (e.g. `next build` / `next start` locally)
  if (!parsed || parsed.protocol !== "https:") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be set to a valid https URL when NODE_ENV=production (e.g. `pnpm build`, `pnpm start`). For local dev, use `pnpm dev` or provide NEXT_PUBLIC_SITE_URL."
    );
  }
}

/**
 * Canonical site URL for metadata, robots, sitemap, JSON-LD, and same-origin checks.
 */
export function getSiteUrl(): URL {
  assertProductionPublicSiteUrl();

  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const parsed = raw ? parseHttpUrl(raw) : null;
  if (parsed) return parsed;

  if (isLocalDevRuntime()) {
    return new URL(DEV_FALLBACK);
  }

  // Should be unreachable if assertProductionPublicSiteUrl ran, but keep a hard failure.
  throw new Error("NEXT_PUBLIC_SITE_URL is missing or invalid.");
}

export function getSiteOrigin(): string {
  return getSiteUrl().origin;
}
