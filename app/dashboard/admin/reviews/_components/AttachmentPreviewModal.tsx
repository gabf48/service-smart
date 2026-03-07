"use client";

export function AttachmentPreviewModal({
  open,
  imageUrl,
  onClose,
}: {
  open: boolean;
  imageUrl: string | null;
  onClose: () => void;
}) {
  if (!open || !imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Attachment preview"
      data-testid="admin-attachment-preview-modal"
    >
      <div
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
        data-testid="admin-attachment-preview-container"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 rounded-xl bg-white/10 px-3 py-2 text-white hover:bg-white/15"
          aria-label="Închide preview"
          data-testid="admin-attachment-preview-close"
        >
          ✕
        </button>

        <img
          src={imageUrl}
          alt="attachment preview"
          className="max-h-[85vh] w-full object-contain rounded-2xl border border-white/10 bg-black"
          data-testid="admin-attachment-preview-image"
        />
      </div>
    </div>
  );
}