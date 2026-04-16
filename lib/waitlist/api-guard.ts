import { parseJsonFromBytes } from "../http/json";
import { getSiteOrigin } from "../seo/site";

export type GuardOk = { ok: true; body: unknown };
export type GuardErr = {
  ok: false;
  status: 403 | 405 | 413 | 415 | 400;
  body: { ok: false; code: string; message: string };
  allow?: string;
};

function isJsonContentType(ct: string | null) {
  if (!ct) return false;
  return ct.toLowerCase().startsWith("application/json");
}

function originIsAllowed(origin: string | null) {
  if (!origin) return true; // allow non-browser clients / missing Origin
  return origin === getSiteOrigin();
}

export function guardWaitlistRequest(args: {
  method: string;
  origin: string | null;
  contentType: string | null;
  contentLength: string | null;
  bodyBytes: Uint8Array;
  limitBytes?: number;
}): GuardOk | GuardErr {
  if (args.method !== "POST") {
    return {
      ok: false,
      status: 405,
      allow: "POST",
      body: { ok: false, code: "method_not_allowed", message: "Method not allowed." },
    };
  }

  if (!originIsAllowed(args.origin)) {
    return { ok: false, status: 403, body: { ok: false, code: "forbidden", message: "Forbidden." } };
  }

  if (!isJsonContentType(args.contentType)) {
    return {
      ok: false,
      status: 415,
      body: { ok: false, code: "invalid_content_type", message: "Invalid content type." },
    };
  }

  const limitBytes = args.limitBytes ?? 8 * 1024;
  if (args.contentLength && Number(args.contentLength) > limitBytes) {
    return {
      ok: false,
      status: 413,
      body: { ok: false, code: "payload_too_large", message: "Payload too large." },
    };
  }

  const parsed = parseJsonFromBytes(args.bodyBytes, limitBytes);
  if (!parsed.ok) {
    return {
      ok: false,
      status: parsed.code === "too_large" ? 413 : 400,
      body: {
        ok: false,
        code: parsed.code === "too_large" ? "payload_too_large" : "bad_json",
        message: "Ungültige Anfrage.",
      },
    };
  }

  return { ok: true, body: parsed.value };
}

