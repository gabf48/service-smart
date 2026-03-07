"use client";

export function AdminReviewCardActions({
  approved,
  busy,
  id,
  onApprove,
  onMoveToPending,
  onReject,
}: {
  approved: boolean;
  busy: boolean;
  id: string;
  onApprove: (id: string) => void;
  onMoveToPending: (id: string) => void;
  onReject: (id: string) => void;
}) {
  return (
    <div
      className="flex gap-3 shrink-0"
      data-testid="admin-review-actions"
      data-review-id={id}
    >
      {!approved ? (
        <>
          <button
            type="button"
            disabled={busy}
            onClick={() => onApprove(id)}
            data-testid="admin-review-approve"
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-700 transition disabled:opacity-60"
          >
            {busy ? "..." : "Approve"}
          </button>

          <button
            type="button"
            disabled={busy}
            onClick={() => onReject(id)}
            data-testid="admin-review-reject"
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-700 transition disabled:opacity-60"
          >
            {busy ? "..." : "Reject"}
          </button>
        </>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => onMoveToPending(id)}
          data-testid="admin-review-move-pending"
          className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition disabled:opacity-60"
        >
          {busy ? "..." : "Move to pending"}
        </button>
      )}
    </div>
  );
}