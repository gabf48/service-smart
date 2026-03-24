"use client";

export function PasswordStrength({
  password,
  strengthLabel,
  strengthScore,
  barClass,
  req,
}: {
  password: string;
  strengthLabel: string;
  strengthScore: number;
  barClass: string;
  req: {
    length8: boolean;
    upper: boolean;
    digit: boolean;
    special: boolean;
  };
}) {
  if (!password.length) return null;

  const reqItem = (ok: boolean, label: string) => (
    <li
      className={`flex items-center gap-2 text-xs ${
        ok ? "text-emerald-200" : "text-white/55"
      }`}
    >
      <span
        className={`inline-flex h-4 w-4 items-center justify-center rounded-full border ${
          ok
            ? "border-emerald-400/50 bg-emerald-500/20"
            : "border-white/15 bg-white/5"
        }`}
      >
        {ok ? "✓" : ""}
      </span>
      <span>{label}</span>
    </li>
  );

  return (
    <div className="mt-1 rounded-xl border border-white/10 bg-white/5 p-3 transition-all">
      <div className="flex items-center justify-between text-xs text-white/70">
        <span>Putere parolă</span>
        <span>{strengthLabel}</span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${barClass} transition-all duration-300`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        />
      </div>

      <ul className="mt-3 grid grid-cols-1 gap-2">
        {reqItem(req.length8, "Minim 8 caractere")}
        {reqItem(req.upper, "O literă mare (A-Z)")}
        {reqItem(req.digit, "Un număr (0-9)")}
        {reqItem(req.special, "Un caracter special (!@#$...)")}
      </ul>
    </div>
  );
}