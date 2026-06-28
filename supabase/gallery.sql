create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  alt_text text,
  image_path text not null,
  sort_order integer not null default 100,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.gallery_photos enable row level security;

create policy if not exists "Public can read published gallery photos"
  on public.gallery_photos
  for select
  using (is_published = true);

create policy if not exists "Authenticated users can manage gallery photos"
  on public.gallery_photos
  for all
  to authenticated
  using (true)
  with check (true);

create index if not exists gallery_photos_sort_idx
  on public.gallery_photos (sort_order, created_at desc);

insert into public.gallery_photos (title, description, alt_text, image_path, sort_order)
values
  ('Golden arrival', 'Warm light across the lawn and open-air guesthouse setting.', 'Heavenrock guesthouse at sunrise', 'gallery/sample-sunrise.jpg', 10),
  ('Evening gatherings', 'Flexible outdoor ambience for family evenings, dinners, and celebrations.', 'Evening event setup at Heavenrock', 20),
  ('Weekend retreat mood', 'A calm resort atmosphere suited for private stays and creative shoots.', 'Weekend retreat scene at Heavenrock', 30)
on conflict do nothing;

-- After running this SQL:
-- 1. Create a public bucket named heavenrock-gallery.
-- 2. Upload files into the gallery/ folder.
-- 3. Replace the sample image_path values with real uploaded file paths.
