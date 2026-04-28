import { describe, expect, it, vi } from "vitest";

import { WAITLIST_CONSENT_VERSION } from "../lib/legal/waitlist-consent";
import { handleWaitlistSubmit } from "../lib/waitlist/handler";
import type { WaitlistStore } from "../lib/waitlist/store";

function okStore(status: "created" | "exists"): WaitlistStore {
  return {
    insert: vi.fn(async () => ({ status })),
  };
}

const baseValid = {
  firstName: "Lea",
  lastName: "Meier",
  region: "Zürich",
  email: "lea@example.ch",
  phone: "+41 79 123 45 67",
  source: "landing",
  consentLaunchEmails: true,
  consentTextVersion: WAITLIST_CONSENT_VERSION,
} as const;

describe("handleWaitlistSubmit", () => {
  it("accepts a valid entry", async () => {
    const store = okStore("created");

    const res = await handleWaitlistSubmit({
      body: { ...baseValid, message: "Freue mich auf den Launch." },
      ip: "1.2.3.4",
      ua: "test",
      store,
    });

    expect(res.httpStatus).toBe(201);
    expect(res.body).toEqual({ ok: true, status: "created" });
    expect(store.insert).toHaveBeenCalledTimes(1);
  });

  it("returns exists for duplicates", async () => {
    const store = okStore("exists");

    const res = await handleWaitlistSubmit({
      body: baseValid,
      store,
    });

    expect(res.httpStatus).toBe(201);
    expect(res.body).toEqual({ ok: true, status: "exists" });
  });

  it("rejects invalid payload (missing required fields)", async () => {
    const store = okStore("created");

    const res = await handleWaitlistSubmit({
      body: {
        firstName: "",
        lastName: "",
        region: "",
        email: "not-an-email",
        extra: { $gt: "" },
        consentLaunchEmails: true,
        consentTextVersion: WAITLIST_CONSENT_VERSION,
      },
      store,
    });

    expect(res.httpStatus).toBe(422);
    expect(res.body.ok).toBe(false);
    if (!res.body.ok) {
      expect(res.body.code).toBe("validation_error");
      if (res.body.code === "validation_error") {
        expect(res.body.fieldErrors).toBeTruthy();
        expect(res.body.fieldErrors?.firstName?.length).toBeGreaterThan(0);
        expect(res.body.fieldErrors?.lastName?.length).toBeGreaterThan(0);
        expect(res.body.fieldErrors?.region?.length).toBeGreaterThan(0);
        expect(res.body.fieldErrors?.email?.length).toBeGreaterThan(0);
      }
    }
  });

  it("accepts entry without phone (phone is optional)", async () => {
    const store = okStore("created");

    const { phone: _phone, ...withoutPhone } = baseValid;
    void _phone;

    const res = await handleWaitlistSubmit({
      body: withoutPhone,
      store,
    });

    expect(res.httpStatus).toBe(201);
    expect(res.body).toEqual({ ok: true, status: "created" });
  });

  it("rejects malformed phone when provided", async () => {
    const store = okStore("created");

    const res = await handleWaitlistSubmit({
      body: { ...baseValid, phone: "abc" },
      store,
    });

    expect(res.httpStatus).toBe(422);
    if (!res.body.ok && res.body.code === "validation_error") {
      expect(res.body.fieldErrors?.phone?.length).toBeGreaterThan(0);
    }
  });

  it("treats honeypot as success without insert", async () => {
    const store: WaitlistStore = {
      insert: vi.fn(async () => {
        throw new Error("should not be called");
      }),
    };

    const res = await handleWaitlistSubmit({
      body: { ...baseValid, company: "spam" },
      store,
    });

    expect(res.httpStatus).toBe(201);
    expect(res.body).toEqual({ ok: true, status: "created" });
    expect(store.insert).not.toHaveBeenCalled();
  });

  it("sends confirmation email on created (only once)", async () => {
    const store = okStore("created");
    const sendConfirmation = vi.fn(async () => undefined);

    const res = await handleWaitlistSubmit({
      body: baseValid,
      store,
      sendConfirmation,
    });

    expect(res.httpStatus).toBe(201);
    expect(res.body).toEqual({ ok: true, status: "created" });
    expect(sendConfirmation).toHaveBeenCalledTimes(1);
    expect(sendConfirmation).toHaveBeenCalledWith({
      to: baseValid.email,
      firstName: baseValid.firstName,
    });
  });

  it("does NOT send confirmation email on duplicate (exists)", async () => {
    const store = okStore("exists");
    const sendConfirmation = vi.fn(async () => undefined);

    const res = await handleWaitlistSubmit({
      body: baseValid,
      store,
      sendConfirmation,
    });

    expect(res.httpStatus).toBe(201);
    expect(res.body).toEqual({ ok: true, status: "exists" });
    expect(sendConfirmation).not.toHaveBeenCalled();
  });

  it("does NOT send confirmation email on honeypot", async () => {
    const store = okStore("created");
    const sendConfirmation = vi.fn(async () => undefined);

    const res = await handleWaitlistSubmit({
      body: { ...baseValid, company: "spam" },
      store,
      sendConfirmation,
    });

    expect(res.httpStatus).toBe(201);
    expect(sendConfirmation).not.toHaveBeenCalled();
  });

  it("never breaks signup when confirmation email throws", async () => {
    const store = okStore("created");
    const sendConfirmation = vi.fn(async () => {
      throw new Error("smtp boom");
    });
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const res = await handleWaitlistSubmit({
      body: baseValid,
      store,
      sendConfirmation,
    });

    expect(res.httpStatus).toBe(201);
    expect(res.body).toEqual({ ok: true, status: "created" });
    expect(sendConfirmation).toHaveBeenCalledTimes(1);
    warnSpy.mockRestore();
  });

  it("returns server_error on DB error", async () => {
    const store: WaitlistStore = {
      insert: vi.fn(async () => {
        throw new Error("db down");
      }),
    };

    const res = await handleWaitlistSubmit({
      body: baseValid,
      store,
    });

    expect(res.httpStatus).toBe(500);
    expect(res.body).toEqual({
      ok: false,
      code: "server_error",
      message: "Das hat gerade nicht geklappt.",
    });
  });
});
