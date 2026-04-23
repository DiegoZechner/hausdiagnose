import { z } from "zod";

import { WAITLIST_CONSENT_VERSION } from "../legal/waitlist-consent";

// Lenient phone check: digits plus common separators. Strict normalization is out of scope for a waitlist.
const phoneRegex = /^[+0-9][0-9 ()/\-.]{5,31}$/;

export const waitlistPayloadSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Bitte gib deinen Vornamen an.")
    .max(80, "Bitte nutze einen kürzeren Vornamen."),
  lastName: z
    .string()
    .trim()
    .min(1, "Bitte gib deinen Nachnamen an.")
    .max(80, "Bitte nutze einen kürzeren Nachnamen."),
  region: z
    .string()
    .trim()
    .min(1, "Bitte gib deine Region an.")
    .max(120, "Bitte nutze eine kürzere Angabe."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Bitte gib eine gültige E-Mail-Adresse an.")
    .max(254, "Bitte nutze eine kürzere E-Mail-Adresse."),
  phone: z
    .string()
    .trim()
    .min(6, "Bitte gib eine gültige Telefonnummer an.")
    .max(32, "Bitte nutze eine kürzere Telefonnummer.")
    .regex(phoneRegex, "Bitte gib eine gültige Telefonnummer an."),
  message: z
    .string()
    .trim()
    .max(2000, "Bitte nutze eine kürzere Nachricht.")
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
