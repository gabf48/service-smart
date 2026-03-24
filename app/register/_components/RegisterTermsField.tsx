"use client";

export function RegisterTermsField({
  termsRef,
  acceptTerms,
  setAcceptTerms,
  loading,
}: {
  termsRef: React.RefObject<HTMLInputElement | null>;
  acceptTerms: boolean;
  setAcceptTerms: (value: boolean) => void;
  loading: boolean;
}) {
  return (
    <label className="mt-3 flex items-start gap-3 text-sm text-white/80">
      <input
        ref={termsRef}
        type="checkbox"
        className="mt-1 h-4 w-4 accent-white"
        checked={acceptTerms}
        onChange={(e) => setAcceptTerms(e.target.checked)}
        disabled={loading}
      />
      <span>
        Sunt de acord cu{" "}
        <a
          href="/termeni-si-conditii"
          className="underline underline-offset-4 hover:text-white/90"
          target="_blank"
          rel="noreferrer"
        >
          Termenii și condițiile
        </a>
        .
      </span>
    </label>
  );
}