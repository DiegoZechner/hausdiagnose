import "server-only";

import { getSmtpTransport, SmtpNotConfiguredError } from "./transport";

const CONTACT_EMAIL = "kontakt@hausdiagnose.ch";
const SUBJECT = "Ihre Anmeldung bei Hausdiagnose";

export type WaitlistConfirmationInput = {
  to: string;
  firstName: string;
};

/**
 * Plain-text body kept short and trustworthy. Mirrors the HTML version.
 */
function buildPlainText(firstName: string): string {
  const greeting = `Hallo ${firstName},`;
  return [
    greeting,
    "",
    "vielen Dank für Ihren Eintrag auf der Warteliste von Hausdiagnose.",
    "",
    "Wir starten als Pilotprojekt im Raum Zürich. Sobald die ersten Termine",
    "verfügbar sind, melden wir uns bei Ihnen — ohne Spam, nur mit relevanten",
    "Informationen zum Launch.",
    "",
    `Antworten auf diese E-Mail erreichen uns direkt: ${CONTACT_EMAIL}.`,
    "",
    "Hinweis: Hausdiagnose bewertet das Wohnumfeld (Luft, Wasser, Feuchte, Radon)",
    "und ersetzt keine medizinische Abklärung.",
    "",
    "Mit freundlichen Grüssen",
    "Hausdiagnose",
  ].join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(firstName: string): string {
  const safeName = escapeHtml(firstName);
  return `<!doctype html>
<html lang="de-CH">
  <body style="margin:0;padding:0;background:#f6f6f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f4;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 8px 28px;">
                <div style="font-size:14px;letter-spacing:0.06em;text-transform:uppercase;color:#6b7280;">Hausdiagnose</div>
                <h1 style="margin:8px 0 0 0;font-size:22px;line-height:1.25;color:#111827;">Ihre Anmeldung ist bei uns</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px 0 28px;font-size:15px;line-height:1.6;color:#111827;">
                <p style="margin:0 0 12px 0;">Hallo ${safeName},</p>
                <p style="margin:0 0 12px 0;">vielen Dank für Ihren Eintrag auf der Warteliste von Hausdiagnose.</p>
                <p style="margin:0 0 12px 0;">Wir starten als Pilotprojekt im Raum Zürich. Sobald die ersten Termine verfügbar sind, melden wir uns bei Ihnen — ohne Spam, nur mit relevanten Informationen zum Launch.</p>
                <p style="margin:0 0 12px 0;">Antworten auf diese E-Mail erreichen uns direkt: <a href="mailto:${CONTACT_EMAIL}" style="color:#0f766e;text-decoration:underline;">${CONTACT_EMAIL}</a>.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 28px 28px 28px;font-size:12px;line-height:1.6;color:#6b7280;border-top:1px solid #f3f4f6;margin-top:12px;">
                <p style="margin:16px 0 0 0;">Hinweis: Hausdiagnose bewertet das Wohnumfeld (Luft, Wasser, Feuchte, Radon) und ersetzt keine medizinische Abklärung.</p>
              </td>
            </tr>
          </table>
          <div style="margin-top:12px;font-size:12px;color:#6b7280;">© Hausdiagnose</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export type WaitlistConfirmationResult =
  | { ok: true; messageId?: string | null }
  | { ok: false; reason: "not_configured" | "send_failed"; error?: unknown };

/**
 * Send the waitlist confirmation email. NEVER throws.
 *
 * The waitlist signup must already have been persisted; failures here must
 * not roll back the signup. Callers should log a soft warning and move on.
 */
export async function sendWaitlistConfirmation(
  input: WaitlistConfirmationInput,
): Promise<WaitlistConfirmationResult> {
  const transport = getSmtpTransport();
  if (!transport) {
    return { ok: false, reason: "not_configured", error: new SmtpNotConfiguredError() };
  }

  const { transporter, config } = transport;
  const text = buildPlainText(input.firstName);
  const html = buildHtml(input.firstName);

  try {
    const info = await transporter.sendMail({
      from: config.from,
      to: input.to,
      subject: SUBJECT,
      text,
      html,
      replyTo: CONTACT_EMAIL,
      headers: {
        "X-Auto-Response-Suppress": "All",
        "Auto-Submitted": "auto-generated",
      },
    });
    return { ok: true, messageId: info.messageId ?? null };
  } catch (error) {
    return { ok: false, reason: "send_failed", error };
  }
}
