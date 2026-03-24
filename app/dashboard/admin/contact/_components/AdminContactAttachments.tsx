"use client";

export function AdminContactAttachments({
  attachments,
}: {
  attachments: string[] | null;
}) {
  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wide text-white/40">
        Atașamente
      </div>

      {attachments && attachments.length > 0 ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {attachments.map((url, index) => {
            const isImage = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url);
            const isVideo = /\.(mp4|webm|mov|m4v|avi)$/i.test(url);

            return (
              <div
                key={`${url}-${index}`}
                className="overflow-hidden rounded-xl border border-white/10 bg-black/30"
              >
                <div className="aspect-video w-full bg-black/40">
                  {isImage ? (
                    <img
                      src={url}
                      alt={`attachment-${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : isVideo ? (
                    <video
                      src={url}
                      controls
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-4 text-center text-sm text-white/60">
                      Preview indisponibil
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-300 transition hover:text-blue-200"
                  >
                    Deschide atașamentul
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-2 text-sm text-white/60">
          Nu există atașamente
        </div>
      )}
    </div>
  );
}