"use client";

export function AdminReviewsToolbarMeta({
  totalFiltered,
  onExportCsv,
}: {
  totalFiltered: number;
  onExportCsv: () => void;
}) {
  return (
    <div
      className="flex flex-wrap items-center gap-3 text-sm"
      data-testid="admin-reviews-toolbar-meta"
    >
      <span className="text-white/60" data-testid="admin-reviews-results-count">
        Rezultate: <span className="font-semibold text-white">{totalFiltered}</span>
      </span>

      <button
        type="button"
        onClick={onExportCsv}
        data-testid="admin-reviews-export-csv"
        className="rounded-xl bg-white/10 px-4 py-2 font-semibold transition hover:bg-white/15"
      >
        Export CSV
      </button>
    </div>
  );
}