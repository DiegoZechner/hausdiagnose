-- Waitlist consent evidence (Hausdiagnose)
-- Run after 20260416_0001_waitlist_signups.sql

alter table public.waitlist_signups
  add column if not exists consent_launch_emails boolean,
  add column if not exists consent_text_version text,
  add column if not exists consent_recorded_at timestamptz;

-- Existing rows (if any) pre-date explicit consent capture.
update public.waitlist_signups
set
  consent_launch_emails = coalesce(consent_launch_emails, false),
  consent_text_version = coalesce(consent_text_version, 'unknown-pre-consent-migration'),
  consent_recorded_at = coalesce(consent_recorded_at, created_at)
where consent_launch_emails is null
   or consent_text_version is null
   or consent_recorded_at is null;

alter table public.waitlist_signups
  alter column consent_launch_emails set not null,
  alter column consent_text_version set not null,
  alter column consent_recorded_at set not null;
