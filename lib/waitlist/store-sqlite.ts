import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

import type { WaitlistPayload } from "./schema";

export type WaitlistInsertResult =
  | { status: "created" }
  | { status: "exists" };

type WaitlistRow = {
  email: string;
};

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function sha256Hex(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function getProjectRoot() {
  // app router route handlers execute from project root in dev, but we keep this explicit.
  return process.cwd();
}

function getDbFilePath() {
  const root = getProjectRoot();
  const dataDir = path.join(root, "data");
  ensureDir(dataDir);
  return path.join(dataDir, "waitlist.sqlite");
}

function initDb(db: Database.Database) {
  db.pragma("journal_mode = WAL");
  db.pragma("synchronous = NORMAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      first_name TEXT NOT NULL,
      region TEXT,
      created_at INTEGER NOT NULL,
      ip_hash TEXT,
      ua TEXT,
      source TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);
  `);
}

declare global {
  // eslint-disable-next-line no-var
  var __hausdiagnose_waitlist_db__: Database.Database | undefined;
}

function getDb() {
  if (globalThis.__hausdiagnose_waitlist_db__) return globalThis.__hausdiagnose_waitlist_db__;
  const db = new Database(getDbFilePath());
  initDb(db);
  globalThis.__hausdiagnose_waitlist_db__ = db;
  return db;
}

export function createWaitlistStoreSqlite() {
  const db = getDb();

  const insertStmt = db.prepare(
    `INSERT INTO waitlist (email, first_name, region, created_at, ip_hash, ua, source)
     VALUES (@email, @first_name, @region, @created_at, @ip_hash, @ua, @source)`
  );

  const existsStmt = db.prepare(`SELECT email FROM waitlist WHERE email = ? LIMIT 1`);

  return {
    insert(payload: WaitlistPayload, meta: { ip?: string; ua?: string }) {
      const already = existsStmt.get(payload.email) as WaitlistRow | undefined;
      if (already) return { status: "exists" } satisfies WaitlistInsertResult;

      const ipHash = meta.ip ? sha256Hex(meta.ip) : null;
      insertStmt.run({
        email: payload.email,
        first_name: payload.firstName,
        region: payload.region ?? null,
        created_at: Date.now(),
        ip_hash: ipHash,
        ua: meta.ua ?? null,
        source: payload.source ?? null,
      });
      return { status: "created" } satisfies WaitlistInsertResult;
    },
  };
}

