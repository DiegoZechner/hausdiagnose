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

  // Make nonce available to server components via request headers (for future use).
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });

  const headers = buildSecurityHeaders({ nonce, isProd });
  for (const [k, v] of Object.entries(headers)) res.headers.set(k, v);

  return res;
}

export const config = {
  matcher: [
    // Apply to all routes except Next.js internals.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

