import crypto from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { WaitlistPayload } from "./schema";
import type { WaitlistInsertResult, WaitlistStore } from "./store";

function sha256Hex(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

type WaitlistSignupInsert = {
  email: string;
  email_normalized: string;
  first_name: string;
  region: string | null;
  source: string | null;
  consent_launch_emails: boolean;
  consent_text_version: string;
  consent_recorded_at: string;
  ip_hash: string | null;
  ua: string | null;
};

export function createWaitlistStoreSupabase(client: SupabaseClient): WaitlistStore {
  return {
    async insert(
      payload: WaitlistPayload,
      meta: { ip?: string; ua?: string; consentedAtIso: string }
    ): Promise<WaitlistInsertResult> {
      const emailNormalized = normalizeEmail(payload.email);

      const { data: existing, error: existsErr } = await client
        .from("waitlist_signups")
        .select("id")
        .eq("email_normalized", emailNormalized)
        .limit(1);

      if (existsErr) throw existsErr;
      if (existing && existing.length > 0) return { status: "exists" };

      const row: WaitlistSignupInsert = {
        email: payload.email,
        email_normalized: emailNormalized,
        first_name: payload.firstName,
        region: payload.region ?? null,
        source: payload.source ?? null,
        consent_launch_emails: payload.consentLaunchEmails === true,
        consent_text_version: payload.consentTextVersion,
        consent_recorded_at: meta.consentedAtIso,
        ip_hash: meta.ip ? sha256Hex(meta.ip) : null,
        ua: meta.ua ?? null,
      };

      const { error: insertErr } = await client.from("waitlist_signups").insert(row);
      if (!insertErr) return { status: "created" };

      // Unique violation -> treat as exists (race condition between exists check + insert).
      const anyErr = insertErr as unknown as { code?: string; message?: string };
      if (anyErr?.code === "23505") return { status: "exists" };

      throw insertErr;
    },
  };
}

