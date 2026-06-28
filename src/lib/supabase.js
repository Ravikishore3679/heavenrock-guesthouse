import { createClient } from "@supabase/supabase-js";

export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

export function getSupabaseBucket() {
  return process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "heavenrock-gallery";
}

export function createPublicSupabaseClient() {
  const url = getSupabaseUrl();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function createServiceSupabaseClient() {
  const url = getSupabaseUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function isGalleryUploadConfigured() {
  return Boolean(
    getSupabaseUrl() &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      process.env.GALLERY_UPLOAD_KEY,
  );
}