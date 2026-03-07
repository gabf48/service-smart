"use client";

export function AdminReviewsPagination({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  return (
    <div
      className="mt-6 flex items-center justify-center gap-3"
      data-testid="admin-reviews-pagination"
    >
      <button
        type="button"
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        data-testid="admin-pagination-prev"
        className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition disabled:opacity-40"
      >
        Anterior
      </button>

      <div
        className="text-sm text-white/70"
        data-testid="admin-pagination-label"
      >
        Pagina{" "}
        <span
          className="font-semibold text-white"
          data-testid="admin-pagination-current"
        >
          {page}
        </span>{" "}
        din{" "}
        <span
          className="font-semibold text-white"
          data-testid="admin-pagination-total"
        >
          {totalPages}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages}
        data-testid="admin-pagination-next"
        className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition disabled:opacity-40"
      >
        Următor
      </button>
    </div>
  );
}