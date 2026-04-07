import { z } from "zod";

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
});

export type WaitlistPayload = z.infer<typeof waitlistPayloadSchema>;

