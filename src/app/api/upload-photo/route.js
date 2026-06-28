import { revalidatePath } from "next/cache";
import { createServiceSupabaseClient, getSupabaseBucket } from "@/lib/supabase";

export const runtime = "nodejs";

function slugifyFileName(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function createFilePath(title, file) {
  const safeTitle = slugifyFileName(title || file.name || "heavenrock-photo");
  const extension = file.name.includes(".")
    ? file.name.split(".").pop().toLowerCase()
    : "jpg";

  return `gallery/${Date.now()}-${safeTitle}.${extension}`;
}

async function ensureGalleryBucket(client, bucket) {
  const { data: buckets, error: listError } = await client.storage.listBuckets();

  if (listError) {
    return listError;
  }

  const existingBucket = buckets?.find((item) => item.name === bucket);

  if (existingBucket) {
    return null;
  }

  const { error: createError } = await client.storage.createBucket(bucket, {
    public: true,
  });

  return createError || null;
}

export async function POST(request) {
  const client = createServiceSupabaseClient();
  const uploadKey = String(process.env.GALLERY_UPLOAD_KEY || "").trim();

  if (!client || !uploadKey) {
    return Response.json(
      { error: "Upload is not configured on the server." },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const providedUploadKey = String(formData.get("uploadKey") || "").trim();
  const file = formData.get("photo");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const altText = String(formData.get("altText") || "").trim();
  const sortOrder = Number(formData.get("sortOrder") || 100);

  if (providedUploadKey !== uploadKey) {
    return Response.json(
      { error: "Upload key is invalid. Use the private key from your .env.local file." },
      { status: 401 },
    );
  }

  if (!(file instanceof File)) {
    return Response.json({ error: "Choose a valid image file." }, { status: 400 });
  }

  if (!title || !description || !altText) {
    return Response.json(
      { error: "Title, description, and alt text are required." },
      { status: 400 },
    );
  }

  const filePath = createFilePath(title, file);
  const fileBytes = Buffer.from(await file.arrayBuffer());
  const bucket = getSupabaseBucket();

  const bucketError = await ensureGalleryBucket(client, bucket);

  if (bucketError) {
    return Response.json(
      { error: `Unable to create or access bucket "${bucket}": ${bucketError.message}` },
      { status: 500 },
    );
  }

  const { error: uploadError } = await client.storage.from(bucket).upload(filePath, fileBytes, {
    cacheControl: "3600",
    contentType: file.type || "image/jpeg",
    upsert: false,
  });

  if (uploadError) {
    return Response.json({ error: uploadError.message }, { status: 500 });
  }

  const { error: insertError } = await client.from("gallery_photos").insert({
    title,
    description,
    alt_text: altText,
    image_path: filePath,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 100,
    is_published: true,
  });

  if (insertError) {
    await client.storage.from(bucket).remove([filePath]);

    if (insertError.message?.toLowerCase().includes("could not find the table")) {
      return Response.json(
        {
          error:
            'Supabase table "gallery_photos" is missing. Run supabase/gallery.sql in the Supabase SQL editor, then refresh the schema cache and try again.',
        },
        { status: 500 },
      );
    }

    return Response.json({ error: insertError.message }, { status: 500 });
  }

  revalidatePath("/");

  return Response.json({ success: true, filePath });
}