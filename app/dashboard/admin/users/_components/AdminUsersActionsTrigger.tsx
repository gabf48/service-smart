"use client";

export function AdminUsersActionsTrigger({
  isBusy,
  onClick,
}: {
  isBusy: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isBusy}
      className={`inline-flex h-9 items-center justify-center rounded-lg px-3 text-xs font-semibold transition ${
        isBusy
          ? "cursor-not-allowed bg-white/10 opacity-40"
          : "bg-white/10 hover:bg-white/15"
      }`}
    >
      {isBusy ? "Processing..." : "Actions"}
    </button>
  );
}