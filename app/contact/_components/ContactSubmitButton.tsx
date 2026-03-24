"use client";

export function ContactSubmitButton({
  loading,
  onClick,
}: {
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="rounded-xl bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-700 transition disabled:opacity-60 active:scale-[0.99]"
    >
      {loading ? "Se încarcă fișierele și se trimite..." : "Trimite"}
    </button>
  );
}