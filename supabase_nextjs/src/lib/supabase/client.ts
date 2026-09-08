import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Gracefully handle missing configuration for demo/development mode
  const validUrl =
    supabaseUrl && !supabaseUrl.includes("your-project-id")
      ? supabaseUrl
      : "https://placeholder-project.supabase.co";

  const validKey =
    supabaseAnonKey && !supabaseAnonKey.includes("your-anon-public-key")
      ? supabaseAnonKey
      : "placeholder-anon-key";

  return createBrowserClient(validUrl, validKey);
}

export const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
      key &&
      !url.includes("your-project-id") &&
      !key.includes("your-anon-public-key")
  );
};
