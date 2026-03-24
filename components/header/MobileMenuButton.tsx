"use client";

export function MobileMenuButton({
  mobileOpen,
  onToggle,
}: {
  mobileOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="shrink-0 rounded-xl border border-white/15 bg-white/10 px-3 py-2 transition hover:bg-white/15 lg:hidden"
      aria-label="Deschide meniul"
      aria-expanded={mobileOpen}
    >
      <span className="relative block h-5 w-5">
        <span
          className={[
            "absolute left-0 right-0 h-0.5 rounded bg-white transition-all duration-200",
            mobileOpen ? "top-2.5 rotate-45" : "top-1",
          ].join(" ")}
        />
        <span
          className={[
            "absolute left-0 right-0 top-2.5 h-0.5 rounded bg-white transition-all duration-200",
            mobileOpen ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />
        <span
          className={[
            "absolute left-0 right-0 h-0.5 rounded bg-white transition-all duration-200",
            mobileOpen ? "top-2.5 -rotate-45" : "top-4",
          ].join(" ")}
        />
      </span>
    </button>
  );
}