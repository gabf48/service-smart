"use client";

export function AdminUsersHeader({
  total,
  onRefresh,
}: {
  total: number;
  onRefresh: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="mt-1 text-sm text-white/60">
          Total users: <span className="font-semibold text-white">{total}</span>
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
      >
        Refresh
      </button>
    </div>
  );
}