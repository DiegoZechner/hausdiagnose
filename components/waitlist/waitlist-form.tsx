"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Controller, useForm } from "react-hook-form";

import { InputWithFeedback } from "@/components/ui/input-with-feedback";
import { SparklesText } from "@/components/ui/sparkles-text";
import {
  waitlistSubmitSchema,
  type WaitlistPayload,
  type WaitlistSubmitValues,
} from "@/lib/waitlist/schema";
import { WAITLIST_CONSENT_VERSION } from "@/lib/legal/waitlist-consent";

type ApiOk = { ok: true; status: "created" | "exists" };
type ApiErr =
  | { ok: false; code: "validation_error"; fieldErrors?: Record<string, string[]> }
  | { ok: false; code: "rate_limited"; retryAfterSec?: number }
  | { ok: false; code: "server_error"; message?: string }
  | { ok: false; code: "bad_json"; message?: string };

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; variant: "created" | "exists" }
  | { kind: "error"; message: string };

const formSchema = waitlistSubmitSchema.pick({
  firstName: true,
  lastName: true,
  region: true,
  email: true,
  phone: true,
  message: true,
  company: true,
  source: true,
  consentLaunchEmails: true,
  consentTextVersion: true,
});

export function WaitlistForm() {
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });

  const form = useForm<WaitlistSubmitValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      region: "",
      email: "",
      phone: "",
      message: "",
      company: "",
      source: "landing",
      consentLaunchEmails: false,
      consentTextVersion: WAITLIST_CONSENT_VERSION,
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: WaitlistSubmitValues) {
    setStatus({ kind: "submitting" });
    try {
      const payload = {
        ...values,
        consentLaunchEmails: true,
        consentTextVersion: WAITLIST_CONSENT_VERSION,
      } as WaitlistPayload;

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as ApiOk | ApiErr;
      if (!res.ok || !data.ok) {
        if (data && !data.ok && data.code === "validation_error") {
          const fieldErrors = data.fieldErrors ?? {};
          for (const [field, errors] of Object.entries(fieldErrors)) {
            const msg = errors?.[0];
            if (!msg) continue;
            form.setError(field as keyof WaitlistSubmitValues, { message: msg });
          }
          setStatus({
            kind: "error",
            message: "Bitte prüfe deine Angaben.",
          });
          return;
        }

        if (data && !data.ok && data.code === "rate_limited") {
          const sec = data.retryAfterSec ?? 30;
          setStatus({
            kind: "error",
            message: `Kurz zu schnell – bitte versuch es in ${sec}s erneut.`,
          });
          return;
        }

        setStatus({
          kind: "error",
          message:
            (data && !data.ok && "message" in data && data.message) ||
            "Das hat gerade nicht geklappt. Bitte versuch es nochmal.",
        });
        return;
      }

      setStatus({ kind: "success", variant: data.status });
    } catch {
      setStatus({
        kind: "error",
        message: "Keine Verbindung. Bitte versuch es nochmal.",
      });
    }
  }

  const submitting = status.kind === "submitting";
  const done = status.kind === "success";

  return (
    <div aria-label="Warteliste" className="rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium">Warteliste</div>
        </div>
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        {done ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 rounded-2xl border border-border bg-background/70 p-4"
          >
            <div className="text-sm font-medium">
              <SparklesText enabled>
                {status.variant === "created"
                  ? "Danke — wir halten dich auf dem Laufenden."
                  : "Du bist bereits eingetragen."}
              </SparklesText>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Du erhältst als Erste Zugang und Updates zum Launch.
            </div>
            <div className="mt-4">
              <a
                href="#faq"
                className="text-sm font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground"
              >
                Häufige Fragen ansehen
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <InputWithFeedback
                  label="Vorname"
                  autoComplete="given-name"
                  placeholder="z. B. Lea"
                  {...form.register("firstName")}
                  error={form.formState.errors.firstName?.message}
                />
                <InputWithFeedback
                  label="Nachname"
                  autoComplete="family-name"
                  placeholder="z. B. Meier"
                  {...form.register("lastName")}
                  error={form.formState.errors.lastName?.message}
                />
              </div>

              <InputWithFeedback
                label="Region"
                autoComplete="address-level1"
                placeholder="z. B. Zürich"
                {...form.register("region")}
                error={form.formState.errors.region?.message}
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <InputWithFeedback
                  label="E‑Mail"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="du@beispiel.ch"
                  {...form.register("email")}
                  error={form.formState.errors.email?.message}
                />
                <InputWithFeedback
                  label="Telefon"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+41 …"
                  {...form.register("phone")}
                  error={form.formState.errors.phone?.message}
                />
              </div>

              <div className="grid gap-1.5">
                <label
                  htmlFor="waitlist-message"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Nachricht (optional)
                </label>
                <textarea
                  id="waitlist-message"
                  rows={4}
                  placeholder="Gibt es etwas, das Sie uns vorab mitteilen möchten?"
                  aria-invalid={Boolean(form.formState.errors.message?.message) || undefined}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-[15px] text-foreground shadow-sm outline-none placeholder:text-muted-foreground transition-colors duration-200 focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-destructive/60"
                  {...form.register("message")}
                />
                {form.formState.errors.message?.message ? (
                  <div className="text-xs text-destructive">
                    {form.formState.errors.message.message}
                  </div>
                ) : null}
              </div>

              {/* Honeypot: should stay empty */}
              <div className="hidden">
                <label>
                  Firma
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    {...form.register("company")}
                  />
                </label>
              </div>

              <input type="hidden" {...form.register("source")} />
              <input type="hidden" {...form.register("consentTextVersion")} />

              <div className="rounded-2xl border border-border bg-background/70 p-3">
                <Controller
                  control={form.control}
                  name="consentLaunchEmails"
                  render={({ field }) => (
                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
                      <input
                        type="checkbox"
                        className="mt-1 size-4 shrink-0 rounded border-border"
                        checked={field.value === true}
                        onChange={(e) => field.onChange(e.target.checked)}
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                      <span className="text-muted-foreground">
                        Ich willige ein, dass Hausdiagnose mich per E‑Mail über den Launch und verwandte Updates im
                        Zusammenhang mit dem Homecheck informiert. Ich kann die Einwilligung jederzeit widerrufen
                        (Kontakt siehe{" "}
                        <a className="underline underline-offset-2" href="/datenschutz#rechte">
                          Datenschutz
                        </a>
                        ). Es gilt die dokumentierte Einwilligungsfassung (Version:{" "}
                        <span className="text-foreground">{WAITLIST_CONSENT_VERSION}</span>
                        ).
                      </span>
                    </label>
                  )}
                />
                {form.formState.errors.consentLaunchEmails?.message ? (
                  <div className="mt-2 text-xs text-destructive">
                    {form.formState.errors.consentLaunchEmails.message}
                  </div>
                ) : null}
              </div>

              <div className="grid gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl border px-4 py-3 text-sm font-medium"
                >
                  {submitting ? "Wird gesendet..." : "Auf die Warteliste"}
                </button>
                <div className="text-xs text-muted-foreground">
                  Hinweise zur Datenverarbeitung findest du in den{" "}
                  <a className="underline underline-offset-2" href="/datenschutz#warteliste">
                    Datenschutzhinweisen (Warteliste)
                  </a>
                  .
                </div>
              </div>

              <AnimatePresence initial={false}>
                {status.kind === "error" ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
                  >
                    {status.message}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

