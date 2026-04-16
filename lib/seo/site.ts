export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return new URL("https://example.com");

  // Accept both "example.com" and "https://example.com".
  const withProtocol = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol);
  } catch {
    return new URL("https://example.com");
  }
}

export function getSiteOrigin(): string {
  const u = getSiteUrl();
  return u.origin;
}

