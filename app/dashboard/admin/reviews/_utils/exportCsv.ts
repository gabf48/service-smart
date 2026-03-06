import type { ReviewRow, ReviewsTab } from "../_types/reviews";

export function exportReviewsCsv(rows: ReviewRow[], tab: ReviewsTab) {
  const normalized = rows.map((r) => ({
    id: r.id,
    name: r.display_name ?? "",
    rating: r.rating ?? "",
    comment: r.comment ?? "",
    created_at: r.created_at ?? "",
    approved: r.is_approved === true ? "yes" : "no",
    email: r.email ?? "",
    phone: r.phone ?? "",
  }));

  const headers = Object.keys(
    normalized[0] ?? {
      id: "",
      name: "",
      rating: "",
      comment: "",
      created_at: "",
      approved: "",
      email: "",
      phone: "",
    }
  );

  const csv = [
    headers.join(","),
    ...normalized.map((row) =>
      headers
        .map((h) => `"${String(row[h as keyof typeof row] ?? "").replace(/"/g, '""')}"`)
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `reviews-${tab}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}