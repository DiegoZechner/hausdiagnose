import type { WaitlistPayload } from "./schema";

export type WaitlistInsertResult = { status: "created" } | { status: "exists" };

export interface WaitlistStore {
  insert(payload: WaitlistPayload, meta: { ip?: string; ua?: string }): Promise<WaitlistInsertResult>;
}

