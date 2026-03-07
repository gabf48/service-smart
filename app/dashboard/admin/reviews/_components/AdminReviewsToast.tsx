"use client";

type Notice = { type: "success" | "error"; text: string } | null;

export function AdminReviewsToast({
  notice,
  onClose,
}: {
  notice: Notice;
  onClose: () => void;
}) {
  if (!notice) return null;

  const style =
    notice.type === "success"
      ? "bg-emerald-600"
      : "bg-red-600";

  return (
    <div
      className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl text-white shadow-lg ${style}`}
      data-testid="admin-reviews-toast"
      role="alert"
    >
      <div className="flex items-center gap-4">
        <span data-testid="admin-reviews-toast-text">{notice.text}</span>

        <button
          onClick={onClose}
          data-testid="admin-reviews-toast-close"
          className="text-white/80 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}