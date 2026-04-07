import crypto from "node:crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { rateLimit } from "@/lib/waitlist/rate-limit";
import { waitlistPayloadSchema } from "@/lib/waitlist/schema";
import { createWaitlistStoreSqlite } from "@/lib/waitlist/store-sqlite";

export const runtime = "nodejs";

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
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "bad_json", message: "Ungültige Anfrage." },
      { status: 400 }
    );
  }

  const parsed = waitlistPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        code: "validation_error",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  // Honeypot: act like success, but do nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true, status: "created" }, { status: 201 });
  }

  const store = createWaitlistStoreSqlite();
  try {
    const result = store.insert(parsed.data, { ip, ua });
    return NextResponse.json({ ok: true, status: result.status }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, code: "server_error", message: "Das hat gerade nicht geklappt." },
      { status: 500 }
    );
  }
}

