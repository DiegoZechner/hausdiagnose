import { describe, expect, it } from "vitest";

import { buildCsp, buildSecurityHeaders } from "../lib/security/headers";
import { parseJsonFromBytes } from "../lib/http/json";
import { guardWaitlistRequest } from "../lib/waitlist/api-guard";

describe("security headers", () => {
  it("builds CSP with nonce and frame-ancestors none", () => {
    const csp = buildCsp({ nonce: "abc", isProd: true });
    expect(csp).toContain("script-src 'self' 'nonce-abc'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
  });

  it("includes required security headers (prod has HSTS)", () => {
    const h = buildSecurityHeaders({ nonce: "abc", isProd: true });
    expect(h["Content-Security-Policy"]).toBeTruthy();
    expect(h["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["X-Content-Type-Options"]).toBe("nosniff");
    expect(h["Permissions-Policy"]).toContain("camera=()");
    expect(h["X-Frame-Options"]).toBe("DENY");
    expect(h["Strict-Transport-Security"]).toContain("max-age=");
  });

  it("does not set HSTS in non-prod", () => {
    const h = buildSecurityHeaders({ nonce: "abc", isProd: false });
    expect(h["Strict-Transport-Security"]).toBeUndefined();
  });
});

describe("json parsing limit", () => {
  it("rejects oversized payload", () => {
    const bytes = new Uint8Array(9);
    const r = parseJsonFromBytes(bytes, 8);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("too_large");
  });

  it("rejects invalid json", () => {
    const bytes = new TextEncoder().encode("{bad json");
    const r = parseJsonFromBytes(bytes, 1024);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("bad_json");
  });
});

describe("waitlist API guards", () => {
  it("rejects invalid content-type", () => {
    const bytes = new TextEncoder().encode(JSON.stringify({ firstName: "Lea", email: "lea@example.ch" }));
    const r = guardWaitlistRequest({
      method: "POST",
      origin: null,
      contentType: "text/plain",
      contentLength: String(bytes.byteLength),
      bodyBytes: bytes,
      limitBytes: 1024,
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.status).toBe(415);
  });

  it("rejects oversized payload via content-length", () => {
    const bytes = new Uint8Array(5);
    const r = guardWaitlistRequest({
      method: "POST",
      origin: null,
      contentType: "application/json",
      contentLength: "9999",
      bodyBytes: bytes,
      limitBytes: 8,
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.status).toBe(413);
  });
});

