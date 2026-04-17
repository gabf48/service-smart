"use client";

const PHONE_DISPLAY = "+40 757 180 250";
const PHONE_TEL = "+40757180250";

export function PhoneBadge() {
  return (
    <a
      href={`tel:${PHONE_TEL}`}
      className={[
        "group flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 shadow-lg backdrop-blur-xl",
        "whitespace-nowrap shrink-0 transition-all duration-300 hover:border-blue-500/40 hover:shadow-blue-500/25",
      ].join(" ")}
      aria-label={`Sună ${PHONE_DISPLAY}`}
    >
      <span className="relative flex h-3 w-3 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-70" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500" />
      </span>

      <span className="hidden whitespace-nowrap text-sm font-semibold tabular-nums text-white transition group-hover:text-blue-300 lg:inline">
        {PHONE_DISPLAY}
      </span>

      <span className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-white/5 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10 xl:inline-flex">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Disponibil&nbsp;acum
      </span>

      <span className="text-sm font-semibold text-white lg:hidden">Sună</span>
    </a>
  );
}