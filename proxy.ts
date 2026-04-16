import { NextResponse, type NextRequest } from "next/server";
import { buildSecurityHeaders } from "@/lib/security/headers";

function base64FromBytes(bytes: Uint8Array) {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  return btoa(bin);
}

export function proxy(req: NextRequest) {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const nonce = base64FromBytes(bytes);
  const isProd = process.env.NODE_ENV === "production";

  // Make nonce available to server components and allow Next to extract it from CSP.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });

  const headers = buildSecurityHeaders({ nonce, isProd });
  // Next.js extracts the nonce from the CSP header present in the *request* during SSR.
  const csp = headers["Content-Security-Policy"];
  if (csp) requestHeaders.set("Content-Security-Policy", csp);

  for (const [k, v] of Object.entries(headers)) res.headers.set(k, v);

  return res;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

