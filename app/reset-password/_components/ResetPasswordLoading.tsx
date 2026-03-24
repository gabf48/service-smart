"use client";

export function ResetPasswordLoading() {
  return (
    <div className="flex h-dvh items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/15 border-t-blue-500" />
        <p className="text-sm text-white/70">Se verifică linkul de resetare...</p>
      </div>
    </div>
  );
}