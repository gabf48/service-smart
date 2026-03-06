"use client";

export function AdminReviewCardAttachments({
  attachments,
  onPreview,
}: {
  attachments: string[];
  onPreview: (url: string) => void;
}) {
  if (!attachments.length) return null;

  return (
    <div className="mt-6">
      <div className="text-sm font-semibold">Attachments</div>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {attachments.slice(0, 3).map((url) => (
          <button
            key={url}
            type="button"
            onClick={() => onPreview(url)}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30 text-left"
          >
            <img
              src={url}
              alt="attachment"
              loading="lazy"
              decoding="async"
              className="h-28 w-full object-cover opacity-90 group-hover:opacity-100 transition"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/50" />
            <div className="absolute bottom-2 left-2 right-2 text-xs text-white/80 truncate">
              Preview
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}