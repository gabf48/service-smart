"use client";

export function FooterCollapsedBar({
  expanded,
  latestVersion,
  onToggle,
  onHoverOpen,
}: {
  expanded: boolean;
  latestVersion: string;
  onToggle: () => void;
  onHoverOpen: () => void;
}) {
  return (
    <div className="pointer-events-auto">
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={onHoverOpen}
        className="w-full border-t border-white/10 bg-gray-900/90 px-4 py-2 text-sm text-gray-200 transition hover:text-white backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span>Versiunea {latestVersion}</span>
          <span className="text-xs text-white/70">
            {expanded ? "Click pentru a închide" : "Hover / click pentru detalii"}
          </span>
        </div>
      </button>
    </div>
  );
}