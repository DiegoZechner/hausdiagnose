"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

import { InputWithFeedback } from "@/components/ui/input-with-feedback";
import { SparklesText } from "@/components/ui/sparkles-text";
import { waitlistPayloadSchema, type WaitlistPayload } from "@/lib/waitlist/schema";

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

const formSchema = waitlistPayloadSchema.pick({
  firstName: true,
  email: true,
  region: true,
  company: true,
  source: true,
});

export function WaitlistForm() {
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });

  const form = useForm<WaitlistPayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      region: "",
      company: "",
      source: "landing",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: WaitlistPayload) {
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await res.json()) as ApiOk | ApiErr;
      if (!res.ok || !data.ok) {
        if (data && !data.ok && data.code === "validation_error") {
          const fieldErrors = data.fieldErrors ?? {};
          for (const [field, errors] of Object.entries(fieldErrors)) {
            const msg = errors?.[0];
            if (!msg) continue;
            form.setError(field as keyof WaitlistPayload, { message: msg });
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
          <div className="mt-1 text-sm text-muted-foreground">
            Start in Kürze im Raum Zürich.
          </div>
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
                  label="E‑Mail"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="du@beispiel.ch"
                  {...form.register("email")}
                  error={form.formState.errors.email?.message}
                />
              </div>

              <InputWithFeedback
                label="Region (optional)"
                autoComplete="address-level1"
                placeholder="z. B. Zürich / Bern / Basel"
                {...form.register("region")}
                error={form.formState.errors.region?.message}
              />

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

              <div className="grid gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl border px-4 py-3 text-sm font-medium"
                >
                  {submitting ? "Wird gesendet..." : "Auf die Warteliste"}
                </button>
                <div className="text-xs text-muted-foreground">
                  Mit dem Eintrag akzeptierst du unsere{" "}
                  <a className="underline underline-offset-2" href="/datenschutz">
                    Datenschutzhinweise
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

