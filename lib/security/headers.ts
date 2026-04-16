export function buildCsp(args: {
  nonce: string;
  isProd: boolean;
}): string {
  const { nonce, isProd } = args;
  const isDev = !isProd;

  // Notes:
  // Official Next.js nonce-based CSP model (App Router + proxy):
  // - script-src includes nonce + strict-dynamic
  // - dev additionally needs unsafe-eval for React enhanced debugging
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "base-uri": ["'self'"],
    "object-src": ["'none'"],
    "frame-ancestors": ["'none'"],
    "form-action": ["'self'"],
    "img-src": ["'self'", "blob:", "data:"],
    "font-src": ["'self'"],
    "script-src": [
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      ...(isDev ? ["'unsafe-eval'"] : []),
    ],
    // Next.js can apply nonces to its own generated styles in production.
    // In development, allow inline styles to reduce friction with dev tooling.
    "style-src": ["'self'", ...(isDev ? ["'unsafe-inline'"] : [`'nonce-${nonce}'`])],
    // Keep connect-src tight; this app does not call Supabase from the browser.
    // In development, Next dev HMR uses websockets.
    "connect-src": ["'self'", ...(isDev ? ["ws:", "wss:"] : [])],
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

