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

  it("rejects invalid payload", async () => {
    const store = okStore("created");

    const res = await handleWaitlistSubmit({
      body: {
        firstName: "",
        lastName: "",
        region: "",
        email: "not-an-email",
        phone: "",
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
        expect(res.body.fieldErrors?.phone?.length).toBeGreaterThan(0);
      }
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
