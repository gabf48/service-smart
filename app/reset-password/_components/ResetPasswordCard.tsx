"use client";

export function ResetPasswordCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-md">
      <h1 className="text-2xl font-bold text-white">Resetează parola</h1>
      <p className="mt-2 text-sm text-white/60">
        Introdu parola nouă și confirm-o mai jos.
      </p>
      {children}
    </div>
  );
}