import { supabase } from "@/lib/supabase";

export async function fetchReviewsApi() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  return { data: data ?? [], error };
}

export async function updateReviewApproved(id: string, value: boolean) {
  const { error } = await supabase
    .from("reviews")
    .update({ is_approved: value })
    .eq("id", id);

  return { error };
}

export async function deleteReviewApi(id: string) {
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  return { error };
}

export async function bulkUpdateReviewsApproved(ids: string[], value: boolean) {
  const { error } = await supabase
    .from("reviews")
    .update({ is_approved: value })
    .in("id", ids);

  return { error };
}

export async function bulkDeleteReviews(ids: string[]) {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .in("id", ids);

  return { error };
}