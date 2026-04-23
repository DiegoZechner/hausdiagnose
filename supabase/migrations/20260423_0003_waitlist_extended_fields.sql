-- Waitlist: extended fields for pilot (last_name, phone required; region now required; message optional)
-- Forward-only. Run after 20260419_0002_waitlist_consent.sql.

alter table public.waitlist_signups
  add column if not exists last_name text,
  add column if not exists phone text,
  add column if not exists message text;

-- Backfill safe defaults for any pre-existing rows (pre-pilot data).
update public.waitlist_signups
set
  last_name = coalesce(last_name, ''),
  phone = coalesce(phone, ''),
  region = coalesce(region, '')
where last_name is null
   or phone is null
   or region is null;

alter table public.waitlist_signups
  alter column last_name set not null,
  alter column phone set not null,
  alter column region set not null;
