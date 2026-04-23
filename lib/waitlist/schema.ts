import { z } from "zod";

import { WAITLIST_CONSENT_VERSION } from "../legal/waitlist-consent";

export const waitlistPayloadSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Bitte gib deinen Vornamen an.")
    .max(80, "Bitte nutze einen kürzeren Vornamen."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Bitte gib eine gültige E-Mail-Adresse an.")
    .max(254, "Bitte nutze eine kürzere E-Mail-Adresse."),
  region: z
    .string()
    .trim()
    .max(120, "Bitte nutze eine kürzere Angabe.")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  company: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  source: z
    .string()
    .trim()
    .max(120)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  consentLaunchEmails: z.literal(true, {
    error: "Bitte bestätige die Einwilligung für Launch‑Updates.",
  }),
  consentTextVersion: z.literal(WAITLIST_CONSENT_VERSION, {
    error: "Ungültige Einwilligungsversion — bitte Seite neu laden.",
  }),
});

export type WaitlistPayload = z.infer<typeof waitlistPayloadSchema>;

export const waitlistSubmitSchema = waitlistPayloadSchema.extend({
  consentLaunchEmails: z
    .boolean()
    .refine((v) => v === true, { message: "Bitte bestätige die Einwilligung für Launch‑Updates." }),
});

export type WaitlistSubmitValues = z.infer<typeof waitlistSubmitSchema>;

