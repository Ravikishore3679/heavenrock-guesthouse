import { createPublicSupabaseClient, getSupabaseBucket } from "@/lib/supabase";

const fallbackPhotos = [
  {
    id: "sunrise-lawn",
    title: "Golden arrival",
    description: "Warm light across the lawn and open-air guesthouse setting.",
    src: "/gallery/golden-arrival.svg",
    alt: "Illustration of the Heavenrock guesthouse grounds at sunrise",
  },
  {
    id: "courtyard-evening",
    title: "Evening gatherings",
    description: "Flexible outdoor ambience for family evenings, dinners, and celebrations.",
    src: "/gallery/evening-gathering.svg",
    alt: "Illustration of an evening setup for a gathering at Heavenrock guesthouse",
  },
  {
    id: "weekend-stay",
    title: "Weekend retreat mood",
    description: "A calm resort atmosphere suited for private stays and creative shoots.",
    src: "/gallery/weekend-retreat.svg",
    alt: "Illustration of a resort-style weekend stay at Heavenrock guesthouse",
  },
];

function toPublicImageUrl(client, bucket, imagePath) {
  if (!imagePath) {
    return null;
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  return client.storage.from(bucket).getPublicUrl(imagePath).data.publicUrl;
}

function mapDatabasePhotos(client, bucket, rows) {
  return rows
    .map((row, index) => {
      const src = toPublicImageUrl(client, bucket, row.image_path);

      if (!src) {
        return null;
      }

      return {
        id: row.id ?? `${row.image_path}-${index}`,
        title: row.title || `Heavenrock view ${index + 1}`,
        description:
          row.description || "Freshly uploaded gallery image from Heavenrock Guesthouse.",
        src,
        alt: row.alt_text || row.title || `Heavenrock gallery image ${index + 1}`,
      };
    })
    .filter(Boolean);
}

function mapStoragePhotos(client, bucket, objects) {
  return objects
    .filter((item) => item.name && !item.name.endsWith("/"))
    .map((item, index) => ({
      id: item.id || `${item.name}-${index}`,
      title: `Heavenrock photo ${index + 1}`,
      description: "Automatically discovered from the Supabase gallery bucket.",
      src: toPublicImageUrl(client, bucket, `gallery/${item.name}`),
      alt: `Heavenrock gallery image ${index + 1}`,
    }));
}

export async function getGalleryPhotos() {
  const client = createPublicSupabaseClient();
  const bucket = getSupabaseBucket();

  if (!client) {
    return fallbackPhotos;
  }

  const { data: rows, error: rowsError } = await client
    .from("gallery_photos")
    .select("id, title, description, alt_text, image_path, sort_order, created_at")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (!rowsError && rows?.length) {
    const mappedRows = mapDatabasePhotos(client, bucket, rows);

    if (mappedRows.length) {
      return mappedRows;
    }
  }

  const { data: objects, error: storageError } = await client.storage
    .from(bucket)
    .list("gallery", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });

  if (!storageError && objects?.length) {
    const mappedStorage = mapStoragePhotos(client, bucket, objects);

    if (mappedStorage.length) {
      return mappedStorage;
    }
  }

  return fallbackPhotos;
}
