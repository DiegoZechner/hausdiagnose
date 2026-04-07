"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
          <div className="text-sm font-medium">Founding Member · Early Access</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Vorname + E‑Mail · Region optional · kein Spam
          </div>
        </div>
        <div className="hidden rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground sm:inline-flex">
          Start in Kürze
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
              {status.variant === "created"
                ? "Geschafft – du bist auf der Warteliste."
                : "Du bist schon auf der Warteliste."}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Du bekommst Early Access zum Launch. Datensparsam, kein Spam – und
              keine medizinische Diagnose.
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl bg-background"
                onClick={() => {
                  form.reset();
                  setStatus({ kind: "idle" });
                }}
              >
                Weitere Person eintragen
              </Button>
              <a
                href="#how"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30"
              >
                Ablauf ansehen
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
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Vorname
                  </label>
                  <Input
                    className="mt-1 h-11 rounded-xl bg-background shadow-sm"
                    autoComplete="given-name"
                    placeholder="z. B. Lea"
                    {...form.register("firstName")}
                    aria-invalid={Boolean(form.formState.errors.firstName)}
                  />
                  {form.formState.errors.firstName?.message ? (
                    <div className="mt-1 text-xs text-destructive">
                      {form.formState.errors.firstName.message}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    E‑Mail
                  </label>
                  <Input
                    className="mt-1 h-11 rounded-xl bg-background shadow-sm"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="du@beispiel.ch"
                    {...form.register("email")}
                    aria-invalid={Boolean(form.formState.errors.email)}
                  />
                  {form.formState.errors.email?.message ? (
                    <div className="mt-1 text-xs text-destructive">
                      {form.formState.errors.email.message}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Region (optional)
                </label>
                <Input
                  className="mt-1 h-11 rounded-xl bg-background shadow-sm"
                  autoComplete="address-level1"
                  placeholder="z. B. Zürich / Bern / Basel"
                  {...form.register("region")}
                  aria-invalid={Boolean(form.formState.errors.region)}
                />
                {form.formState.errors.region?.message ? (
                  <div className="mt-1 text-xs text-destructive">
                    {form.formState.errors.region.message}
                  </div>
                ) : null}
              </div>

              <input type="hidden" {...form.register("source")} />

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="submit"
                  className="h-11 rounded-xl bg-brand text-primary-foreground shadow-sm hover:bg-[color:var(--brand-hover)]"
                  disabled={submitting}
                >
                  {submitting ? "Wird eingetragen…" : "Auf die Warteliste"}
                </Button>
                <div className="text-xs text-muted-foreground">
                  Mit dem Eintrag akzeptierst du unsere{" "}
                  <a className="underline underline-offset-2" href="/datenschutz">
                    Datenschutzhinweise
                  </a>
                  .
                </div>
              </div>

              <div className="grid gap-1 pt-1 text-xs text-muted-foreground">
                <div>• Datensparsam (Vorname + E‑Mail)</div>
                <div>• Kein Spam · Abmeldung jederzeit</div>
                <div>• Keine medizinische Diagnose</div>
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

