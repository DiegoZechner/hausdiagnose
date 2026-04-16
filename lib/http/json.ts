export type JsonParseResult =
  | { ok: true; value: unknown }
  | { ok: false; code: "too_large" | "bad_json" };

export function parseJsonFromBytes(bytes: Uint8Array, limitBytes: number): JsonParseResult {
  if (bytes.byteLength > limitBytes) return { ok: false, code: "too_large" };
  try {
    const text = new TextDecoder().decode(bytes);
    return { ok: true, value: JSON.parse(text) };
  } catch {
    return { ok: false, code: "bad_json" };
  }
}

