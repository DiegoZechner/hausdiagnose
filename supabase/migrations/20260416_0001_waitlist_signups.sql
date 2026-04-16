-- Waitlist signups (Hausdiagnose)
-- Apply this in Supabase SQL Editor or via Supabase CLI migrations.

create extension if not exists pgcrypto;

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  email text not null,
  email_normalized text not null,
  first_name text not null,
  region text,
  source text,

  ip_hash text,
  ua text
);

create unique index if not exists waitlist_signups_email_normalized_uq
  on public.waitlist_signups (email_normalized);

create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);

alter table public.waitlist_signups enable row level security;

-- Default deny (no policies). Inserts/reads are intended to happen via server-side service role.
revoke all on table public.waitlist_signups from anon, authenticated;

