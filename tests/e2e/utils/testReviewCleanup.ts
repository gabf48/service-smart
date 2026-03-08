import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PLAYWRIGHT_SUPABASE_URL;
const serviceRoleKey = process.env.PLAYWRIGHT_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing PLAYWRIGHT_SUPABASE_URL or PLAYWRIGHT_SUPABASE_SERVICE_ROLE_KEY"
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export async function cleanupPlaywrightReviews(prefix = "PW") {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .or(`comment.ilike.${prefix}%,display_name.ilike.${prefix}%`);

  if (error) {
    throw new Error(`Failed to cleanup test reviews: ${error.message}`);
  }
}