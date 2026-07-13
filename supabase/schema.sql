-- ============================================================
-- OFAL Summer Club — Schéma Supabase
-- À exécuter dans Supabase > SQL Editor
-- ============================================================

-- Extension pour la génération d'UUID
create extension if not exists "pgcrypto";

-- Table des albums (ateliers)
create table if not exists albums (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  cover text,
  event_date date,
  description text,
  created_at timestamptz not null default now()
);

-- Table des photos
create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references albums(id) on delete cascade,
  image_url text not null,
  width int,
  height int,
  created_at timestamptz not null default now()
);

create index if not exists photos_album_id_idx on photos(album_id);
create index if not exists albums_slug_idx on albums(slug);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table albums enable row level security;
alter table photos enable row level security;

-- Lecture publique (les participantes n'ont pas de compte)
create policy "Albums visibles publiquement"
  on albums for select
  to anon, authenticated
  using (true);

create policy "Photos visibles publiquement"
  on photos for select
  to anon, authenticated
  using (true);

-- Écriture réservée aux administrateurs connectés
create policy "Admins peuvent gérer les albums"
  on albums for all
  to authenticated
  using (true)
  with check (true);

create policy "Admins peuvent gérer les photos"
  on photos for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- Storage : bucket public pour les photos
-- ============================================================

insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

create policy "Lecture publique du bucket photos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'photos');

create policy "Admins peuvent uploader dans photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'photos');

create policy "Admins peuvent supprimer dans photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'photos');

-- ============================================================
-- Compte administrateur
-- Créez l'utilisateur admin depuis Supabase > Authentication > Users
-- (email + mot de passe), aucune inscription publique n'est prévue.
-- ============================================================
