-- Readers' drawings: run once in the Supabase dashboard → SQL Editor.
-- Safe to run again; it skips anything that already exists.

create table if not exists public.drawings (
  id          uuid primary key,
  created_at  timestamptz not null default now(),
  name        text check (char_length(name) <= 40),
  image_path  text not null,
  status      text not null default 'pending'
              check (status in ('pending', 'approved', 'rejected'))
);

create index if not exists drawings_status_created_idx
  on public.drawings (status, created_at desc);

-- Row level security on, with no policies: the public anon key can't read or
-- write anything. Only the site's server, using the secret key, can.
alter table public.drawings enable row level security;

-- Private bucket for the PNGs. The site hands out short-lived signed links,
-- and only for approved drawings (or to you on the approval page).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('drawings', 'drawings', false, 1048576, array['image/png'])
on conflict (id) do nothing;
