import {
  createPublicSupabaseClient,
  createServiceSupabaseClient,
  getSupabaseBucket,
  getSupabaseUrl,
} from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  const url = getSupabaseUrl();
  const bucket = getSupabaseBucket();
  const anonClient = createPublicSupabaseClient();
  const serviceClient = createServiceSupabaseClient();

  const diagnostics = {
    env: {
      hasSupabaseUrl: Boolean(url),
      hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      hasUploadKey: Boolean(process.env.GALLERY_UPLOAD_KEY),
      bucket,
      normalizedUrl: url || null,
    },
    checks: {},
  };

  if (anonClient) {
    const { count, error } = await anonClient
      .from("gallery_photos")
      .select("id", { count: "exact", head: true })
      .eq("is_published", true);

    diagnostics.checks.anonPublishedRows = {
      ok: !error,
      count: error ? null : count,
      error: error?.message || null,
    };
  } else {
    diagnostics.checks.anonPublishedRows = {
      ok: false,
      error: "Anon client is not configured.",
    };
  }

  if (serviceClient) {
    const { data: buckets, error: bucketError } = await serviceClient.storage.listBuckets();
    const bucketExists = buckets?.some((item) => item.name === bucket) || false;

    diagnostics.checks.serviceBucketAccess = {
      ok: !bucketError,
      bucketExists,
      error: bucketError?.message || null,
    };

    const { count, error: tableError } = await serviceClient
      .from("gallery_photos")
      .select("id", { count: "exact", head: true });

    diagnostics.checks.serviceTableAccess = {
      ok: !tableError,
      count: tableError ? null : count,
      error: tableError?.message || null,
    };
  } else {
    diagnostics.checks.serviceBucketAccess = {
      ok: false,
      error: "Service client is not configured.",
    };
    diagnostics.checks.serviceTableAccess = {
      ok: false,
      error: "Service client is not configured.",
    };
  }

  return Response.json(diagnostics);
}