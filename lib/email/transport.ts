import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

/**
 * SMTP configuration.
 *
 * All values are server-only (read from process.env). The transport is reused
 * via a module-level singleton to avoid creating a new TCP/TLS context per
 * waitlist signup.
 *
 * Required env:
 *   SMTP_HOST    e.g. mail.infomaniak.com
 *   SMTP_PORT    e.g. 587
 *   SMTP_SECURE  "true" for implicit TLS (port 465). Defaults to false (STARTTLS on 587).
 *   SMTP_USER    full email address used to authenticate
 *   SMTP_PASS    smtp password
 *   MAIL_FROM    visible From: address, e.g. kontakt@hausdiagnose.ch
 */
export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
};

export class SmtpNotConfiguredError extends Error {
  constructor() {
    super("SMTP not configured");
    this.name = "SmtpNotConfiguredError";
  }
}

function readSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const secureRaw = process.env.SMTP_SECURE?.trim().toLowerCase();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM?.trim();

  if (!host || !portRaw || !user || !pass || !from) return null;
  const port = Number.parseInt(portRaw, 10);
  if (!Number.isFinite(port) || port <= 0 || port > 65535) return null;

  const secure = secureRaw === "true" || secureRaw === "1";

  return { host, port, secure, user, pass, from };
}

let cachedTransport: Transporter | null = null;
let cachedConfig: SmtpConfig | null = null;

export function getSmtpTransport(): { transporter: Transporter; config: SmtpConfig } | null {
  if (cachedTransport && cachedConfig) {
    return { transporter: cachedTransport, config: cachedConfig };
  }
  const config = readSmtpConfig();
  if (!config) return null;

  cachedTransport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });
  cachedConfig = config;
  return { transporter: cachedTransport, config: cachedConfig };
}

export function isSmtpConfigured(): boolean {
  return readSmtpConfig() !== null;
}
