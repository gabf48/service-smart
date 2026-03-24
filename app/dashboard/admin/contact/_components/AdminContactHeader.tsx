"use client";

export function AdminContactHeader({
  total,
  selectedCount,
  onRefresh,
  onExportCsv,
  onSelectAllVisible,
  onClearSelection,
  onBulkReopen,
  onBulkMarkResolved,
}: {
  total: number;
  selectedCount: number;
  onRefresh: () => void;
  onExportCsv: () => void;
  onSelectAllVisible: () => void;
  onClearSelection: () => void;
  onBulkReopen: () => void;
  onBulkMarkResolved: () => void;
}) {
  const disabled = total === 0;
  const bulkDisabled = selectedCount === 0;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold">Mesaje de contact</h1>
        <p className="mt-1 text-sm text-white/60">
          Total mesaje: <span className="font-semibold text-white">{total}</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onSelectAllVisible}
          disabled={disabled}
          className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Selectează tot
        </button>

        <button
          type="button"
          onClick={onClearSelection}
          disabled={bulkDisabled}
          className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Golește selecția
        </button>

        <button
          type="button"
          onClick={onBulkMarkResolved}
          disabled={bulkDisabled}
          className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Marchează rezolvate
        </button>
        <button
  type="button"
  onClick={onBulkReopen}
  disabled={bulkDisabled}
  className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
>
  Redeschide
</button>

        <button
          type="button"
          onClick={onExportCsv}
          disabled={disabled}
          className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Export CSV
        </button>

        <button
          type="button"
          onClick={onRefresh}
          className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
        >
          Reîncarcă
        </button>
      </div>
    </div>
  );
}