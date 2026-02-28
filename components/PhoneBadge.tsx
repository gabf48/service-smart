"use client";

type Props = {
  phoneDisplay: string; // "+40 746 263 481"
  phoneTel: string;     // "+40746263481"
  availabilityText?: string; // "Disponibil acum"
};

export default function PhoneBadge({
  phoneDisplay,
  phoneTel,
  availabilityText = "Disponibil acum",
}: Props) {
  return (
    <a
      href={`tel:${phoneTel}`}
      className="group inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 px-4 py-2 shadow-lg transition-all duration-300 hover:border-blue-500/40 hover:shadow-blue-500/25"
      aria-label={`Sună ${phoneDisplay}`}
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
      </span>

      <div className="hidden sm:flex flex-col leading-tight">
        <span className="text-[11px] text-white/60">Telefon</span>
        <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition">
          {phoneDisplay}
        </span>
      </div>

      <span className="hidden xl:inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {availabilityText}
      </span>

      {/* pe mobil afișează doar icon + număr scurt */}
      <span className="sm:hidden text-sm font-semibold text-white">
        {phoneDisplay}
      </span>
    </a>
  );
}