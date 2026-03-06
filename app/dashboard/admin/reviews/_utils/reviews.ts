import type { ReviewRow, SortMode } from "../_types/reviews";

export const PAGE_SIZE = 6;

export function filterReviews(
  reviews: ReviewRow[],
  search: string,
  ratingFilter: number | "all"
) {
  const q = search.trim().toLowerCase();

  return reviews.filter((r) => {
    const matchesRating =
      ratingFilter === "all" ? true : Number(r.rating ?? 0) === ratingFilter;

    const haystack = [
      r.display_name ?? "",
      r.comment ?? "",
      r.email ?? "",
      r.phone ?? "",
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = q ? haystack.includes(q) : true;
    return matchesRating && matchesSearch;
  });
}

export function sortReviews(reviews: ReviewRow[], sortMode: SortMode) {
  const arr = [...reviews];

  arr.sort((a, b) => {
    if (sortMode === "rating_desc") {
      return Number(b.rating ?? 0) - Number(a.rating ?? 0);
    }

    if (sortMode === "rating_asc") {
      return Number(a.rating ?? 0) - Number(b.rating ?? 0);
    }

    return Date.parse(b.created_at ?? "") - Date.parse(a.created_at ?? "");
  });

  return arr;
}

export function paginateReviews<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    totalPages,
    list: items.slice(start, start + pageSize),
  };
}

export function getAverageRating(reviews: ReviewRow[]) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + Number(r.rating ?? 0), 0);
  return sum / reviews.length;
}