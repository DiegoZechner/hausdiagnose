import crypto from "node:crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { rateLimit } from "@/lib/waitlist/rate-limit";
import { handleWaitlistSubmit } from "@/lib/waitlist/handler";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { createWaitlistStoreSupabase } from "@/lib/waitlist/store-supabase";
import { guardWaitlistRequest } from "@/lib/waitlist/api-guard";

export const runtime = "nodejs";

function methodNotAllowed() {
  return NextResponse.json(
    { ok: false, code: "method_not_allowed", message: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;

function getClientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return req.headers.get("x-real-ip") ?? undefined;
}

function ipKey(ip?: string) {
  if (!ip) return "unknown";
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const ua = req.headers.get("user-agent") ?? undefined;

  const rl = rateLimit({
    key: `waitlist:${ipKey(ip)}`,
    windowMs: 60_000,
    max: 6,
  });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, code: "rate_limited", retryAfterSec: rl.retryAfterSec },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  let body: unknown;
  try {
    const bytes = new Uint8Array(await req.arrayBuffer());
    const guarded = guardWaitlistRequest({
      method: "POST",
      origin: req.headers.get("origin"),
      contentType: req.headers.get("content-type"),
      contentLength: req.headers.get("content-length"),
      bodyBytes: bytes,
    });
    if (!guarded.ok) {
      return NextResponse.json(guarded.body, {
        status: guarded.status,
        headers: guarded.allow ? { Allow: guarded.allow } : undefined,
      });
    }
    body = guarded.body;
  } catch {
    return NextResponse.json(
      { ok: false, code: "bad_json", message: "Ungültige Anfrage." },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();
  const store = createWaitlistStoreSupabase(supabase);
  const result = await handleWaitlistSubmit({ body, ip, ua, store });
  return NextResponse.json(result.body, { status: result.httpStatus });
}

