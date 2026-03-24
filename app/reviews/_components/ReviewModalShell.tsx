"use client";

export function ReviewModalShell({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      data-testid="review-modal"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex min-h-dvh items-start justify-center px-4 py-6 sm:py-10">
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          data-testid="review-modal-overlay"
        />

        <div
          className="relative w-full max-w-2xl"
          data-testid="review-modal-container"
        >
          {children}
        </div>

        <style jsx>{`
          @media (prefers-reduced-motion: reduce) {
            * {
              scroll-behavior: auto !important;
              transition: none !important;
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}