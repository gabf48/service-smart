"use client";

export function AdminContactEmailCard({ email }: { email: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wide text-white/40">
        Email
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="break-all text-sm text-white">{email || "-"}</span>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(email)}
            className="rounded-lg bg-white/10 px-2 py-1 text-xs hover:bg-white/15"
          >
            Copy
          </button>

          <a
            href={`mailto:${email}?subject=Răspuns solicitare&body=Bună ziua,%0D%0A%0D%0AAm primit solicitarea dumneavoastră.`}
            className="rounded-lg bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  );
}