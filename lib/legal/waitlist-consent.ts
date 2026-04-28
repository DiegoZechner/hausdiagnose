/**
 * Version string persisted with waitlist consent records.
 * Bump when the consent wording materially changes.
 */
export const WAITLIST_CONSENT_VERSION = "2026-04-19-waitlist-v1";

/** Short label for privacy notice / Impressum cross-references */
export const WAITLIST_CONSENT_LABEL = "Warteliste / Launch‑Kommunikation";

/**
 * --- Future newsletter extension point (intentionally NOT shipped yet) ---
 *
 * The current consent covers ONLY launch-related updates for the Hausdiagnose
 * pilot in Zürich. It does NOT cover a recurring newsletter / marketing
 * campaigns. When/if a broader newsletter is introduced, do all of the following
 * (do not reuse the launch consent):
 *
 *   1. Add a separate, distinctly-labeled checkbox in the form (default OFF).
 *      Suggested constant name: `NEWSLETTER_CONSENT_VERSION` with its own
 *      versioned wording.
 *   2. Add a `consent_newsletter_emails boolean not null default false` column
 *      and a `consent_newsletter_text_version text` + `consent_newsletter_recorded_at timestamptz`
 *      pair via a new forward-only migration.
 *   3. Update the privacy page to describe the additional purpose, lawful basis,
 *      retention period, and opt-out mechanism.
 *   4. Implement an unsubscribe / preference page (one-click opt-out is a
 *      DSG/DSGVO best practice and required by major mailbox providers).
 *
 * Until those steps land, do NOT auto-subscribe pilot waitlist signups to a
 * broader newsletter — that would invalidate the captured consent.
 */
