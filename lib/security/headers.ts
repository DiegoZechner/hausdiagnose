export function buildCsp(args: {
  nonce: string;
  isProd: boolean;
}): string {
  const { nonce, isProd } = args;

  // Notes:
  // - JSON-LD scripts are inline → we use a per-request nonce.
  // - Next.js may inject inline styles → allow 'unsafe-inline' for style-src.
  // - Keep connect-src tight; this app does not call Supabase from the browser.
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "base-uri": ["'self'"],
    "object-src": ["'none'"],
    "frame-ancestors": ["'none'"],
    "form-action": ["'self'"],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'", "data:"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "script-src": [
      "'self'",
      ...(isProd
        ? []
        : [
            // Next/React dev tooling uses eval() + inline bootstrapping in development.
            "'unsafe-eval'",
            "'unsafe-inline'",
            // Some dev tooling uses blob: URLs.
            "blob:",
          ]),
      `'nonce-${nonce}'`,
    ],
    "connect-src": [
      "'self'",
      ...(isProd
        ? []
        : [
            // Next dev HMR uses websockets.
            "ws:",
            "wss:",
          ]),
    ],
    "media-src": ["'self'"],
    "manifest-src": ["'self'"],
    ...(isProd ? { "upgrade-insecure-requests": [] } : {}),
  };

  return Object.entries(directives)
    .map(([k, v]) => (v.length ? `${k} ${v.join(" ")}` : k))
    .join("; ");
}

export function buildSecurityHeaders(args: {
  nonce: string;
  isProd: boolean;
}): Record<string, string> {
  const { nonce, isProd } = args;
  const csp = buildCsp({ nonce, isProd });

  const headers: Record<string, string> = {
    "Content-Security-Policy": csp,
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
    // Defense in depth (CSP frame-ancestors is the modern control).
    "X-Frame-Options": "DENY",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
  };

  if (isProd) {
    headers["Strict-Transport-Security"] =
      "max-age=31536000; includeSubDomains; preload";
  }

  return headers;
}

