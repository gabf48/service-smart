"use client";

export function ReviewNameField({
  isLogged,
  computedLockedName,
  displayName,
  setDisplayName,
  submitting,
}: {
  isLogged: boolean;
  computedLockedName: string;
  displayName: string;
  setDisplayName: (v: string) => void;
  submitting: boolean;
}) {
  return (
    <div data-testid="review-name-section">
      <label htmlFor="review-name" className="mb-1 block text-sm text-white/70">
        Nume (obligatoriu)
      </label>

      <input
        id="review-name"
        name="review-name"
        value={isLogged ? computedLockedName : displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        disabled={isLogged || submitting}
        placeholder="Numele tău"
        data-testid="review-input-name"
        className={[
          "w-full rounded-xl border p-3 transition",
          "focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/15",
          isLogged
            ? "cursor-not-allowed border-white/10 bg-gray-700/40 text-gray-300"
            : "border-white/10 bg-gray-900/60 text-white",
        ].join(" ")}
      />
    </div>
  );
}