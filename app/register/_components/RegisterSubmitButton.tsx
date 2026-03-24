"use client";

export function RegisterSubmitButton({
  loading,
}: {
  loading: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="relative z-10 mt-4 w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-500 active:scale-[0.99] disabled:opacity-60"
    >
      {loading ? "Se încarcă..." : "Creează cont"}
    </button>
  );
}