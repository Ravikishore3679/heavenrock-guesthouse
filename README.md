# Heavenrock Guesthouse Website

This project is a Next.js website for Heavenrock Guesthouse with a Supabase-backed photo gallery. It is designed for Vercel deployment and can show newly added resort photos dynamically.

## Stack

- Next.js App Router for the website
- Supabase Storage for photo files
- Supabase Postgres for gallery metadata
- Vercel for hosting and deployment

## Local development

1. Open the project folder:

```bash
cd heavenrock-guesthouse
```

2. Copy the environment template and add your Supabase values:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000.

## Supabase setup

1. Create a Supabase project.
2. In Storage, create a public bucket named `heavenrock-gallery`.
3. Inside that bucket, upload photos into a `gallery/` folder.
4. Run the SQL in `supabase/gallery.sql` in the Supabase SQL editor.
5. Add these environment variables to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_BUCKET=heavenrock-gallery
```

## How photo updates work

- If `gallery_photos` rows exist and are marked `is_published = true`, the homepage reads them first.
- If no rows exist, the homepage falls back to listing files from the `gallery/` folder in Supabase Storage.
- Because the home page is server-rendered dynamically, new photos can appear without rebuilding the site.

## Adding new gallery images

1. Upload a photo to the `gallery/` folder in the `heavenrock-gallery` bucket.
2. Insert a matching row into `gallery_photos` with the `image_path`, title, description, and sort order.
3. Refresh the site.

Example `image_path`:

```text
gallery/sunset-lawn.jpg
```

## Deploy to Vercel

1. Push this project to GitHub.
2. In Vercel, import the repository.
3. Set the project root to `heavenrock-guesthouse` if you deploy from the current workspace structure.
4. Add the same three environment variables in the Vercel project settings.
5. Deploy.

## Notes

- Until Supabase is configured, the site shows built-in placeholder gallery artwork.
- The current content is based on the public Heavenrock listing and is structured so you can expand room, pricing, and amenity details later.
