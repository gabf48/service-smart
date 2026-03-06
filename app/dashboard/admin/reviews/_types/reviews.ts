// app/dashboard/admin/reviews/_types/reviews.ts

export type ReviewRow = {
  id: string;
  user_id: string | null;
  rating: number | null;
  comment: string | null;
  created_at: string | null;
  is_approved?: boolean | null;
  display_name?: string | null;
  email?: string | null;
  phone?: string | null;
  attachments?: string[] | null;
};

export type Notice = { type: "success" | "error"; text: string } | null;

export type ReviewsTab = "pending" | "approved";

export type SortMode = "newest" | "rating_desc" | "rating_asc";