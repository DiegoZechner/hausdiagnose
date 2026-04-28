-- Waitlist: phone is now optional. Forward-only.
-- Run after 20260423_0003_waitlist_extended_fields.sql.
--
-- Rationale: pilot UX accepts E-Mail-only contact; phone remains supported for
-- callers who want a faster line. Existing rows are unaffected.

alter table public.waitlist_signups
  alter column phone drop not null;

-- Normalize prior placeholder backfills ('' -> NULL) so reporting reflects truth.
update public.waitlist_signups
set phone = null
where phone = '';
