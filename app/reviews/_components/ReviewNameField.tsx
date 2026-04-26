"use client";

export function ReviewNameField({
  isLogged,
  computedLockedName,
  displayName,
  setDisplayName,
  submitting,
  nameError,
  setNameError,
}: {
  isLogged: boolean;
  computedLockedName: string;
  displayName: string;
  setDisplayName: (v: string) => void;
  submitting: boolean;
  nameError?: string;
  setNameError: (v: string) => void;
}) {
  return (
    <div data-testid="review-name-section">
      <label
        htmlFor="review-name"
        className="mb-1 block text-sm text-white/70"
      >
        Nume (obligatoriu)
      </label>

      <input
        id="review-name"
        name="review-name"
        value={isLogged ? computedLockedName : displayName}
        onChange={(e) => {
          setDisplayName(e.target.value);

          if (nameError) {
            setNameError("");
          }
        }}
        disabled={isLogged || submitting}
        placeholder="Numele tău"
        data-testid="review-input-name"
        className={[
          "w-full rounded-xl border p-3 transition",
          "focus:outline-none focus:ring-4",
          isLogged
            ? "cursor-not-allowed border-white/10 bg-gray-700/40 text-gray-300"
            : nameError
            ? "border-red-500 bg-gray-900/60 text-white focus:border-red-500 focus:ring-red-500/15"
            : "border-white/10 bg-gray-900/60 text-white focus:border-blue-500/60 focus:ring-blue-500/15",
        ].join(" ")}
      />

      {nameError && (
        <p className="mt-2 text-sm text-red-400">
          {nameError}
        </p>
      )}
    </div>
  );
}