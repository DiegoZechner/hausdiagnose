import type { WaitlistPayload } from "./schema";
import { waitlistPayloadSchema } from "./schema";
import type { WaitlistStore } from "./store";

export type WaitlistApiOk = { ok: true; status: "created" | "exists" };
export type WaitlistApiErr =
  | { ok: false; code: "bad_json"; message: string }
  | { ok: false; code: "validation_error"; fieldErrors: Record<string, string[]> }
  | { ok: false; code: "server_error"; message: string };

export async function handleWaitlistSubmit(args: {
  body: unknown;
  ip?: string;
  ua?: string;
  store: WaitlistStore;
}): Promise<
  | { httpStatus: 201; body: WaitlistApiOk }
  | { httpStatus: 400 | 422 | 500; body: WaitlistApiErr }
> {
  const parsed = waitlistPayloadSchema.safeParse(args.body);
  if (!parsed.success) {
    return {
      httpStatus: 422,
      body: { ok: false, code: "validation_error", fieldErrors: parsed.error.flatten().fieldErrors },
    };
  }

  const payload: WaitlistPayload = parsed.data;

  // Honeypot: behave like success, but do nothing.
  if (payload.company) {
    return { httpStatus: 201, body: { ok: true, status: "created" } };
  }

  try {
    const result = await args.store.insert(payload, { ip: args.ip, ua: args.ua });
    return { httpStatus: 201, body: { ok: true, status: result.status } };
  } catch {
    return {
      httpStatus: 500,
      body: { ok: false, code: "server_error", message: "Das hat gerade nicht geklappt." },
    };
  }
}

