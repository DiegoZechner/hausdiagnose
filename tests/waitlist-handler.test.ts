import { describe, expect, it, vi } from "vitest";

import { handleWaitlistSubmit } from "../lib/waitlist/handler";
import type { WaitlistStore } from "../lib/waitlist/store";

function okStore(status: "created" | "exists"): WaitlistStore {
  return {
    insert: vi.fn(async () => ({ status })),
  };
}

describe("handleWaitlistSubmit", () => {
  it("accepts a valid entry", async () => {
    const store = okStore("created");

    const res = await handleWaitlistSubmit({
      body: { firstName: "Lea", email: "lea@example.ch", region: "Zürich", source: "landing" },
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
      body: { firstName: "Lea", email: "lea@example.ch", region: "", source: "landing" },
      store,
    });

    expect(res.httpStatus).toBe(201);
    expect(res.body).toEqual({ ok: true, status: "exists" });
  });

  it("rejects invalid payload", async () => {
    const store = okStore("created");

    const res = await handleWaitlistSubmit({
      body: { firstName: "", email: "not-an-email", extra: { $gt: "" } },
      store,
    });

    expect(res.httpStatus).toBe(422);
    expect(res.body.ok).toBe(false);
    if (!res.body.ok) {
      expect(res.body.code).toBe("validation_error");
      if (res.body.code === "validation_error") {
        expect(res.body.fieldErrors).toBeTruthy();
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
      body: { firstName: "Lea", email: "lea@example.ch", company: "spam", source: "landing" },
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
      body: { firstName: "Lea", email: "lea@example.ch", source: "landing" },
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

