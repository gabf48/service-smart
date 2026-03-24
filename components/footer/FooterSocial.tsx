"use client";

export function FooterSocial() {
  return (
    <div className="min-w-[220px]">
      <div className="mb-2 text-sm font-semibold">Social</div>

      <div className="flex flex-wrap gap-2">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-white/10 px-3 py-2 text-sm transition hover:bg-white/15"
        >
          Facebook
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-white/10 px-3 py-2 text-sm transition hover:bg-white/15"
        >
          Instagram
        </a>
      </div>

      <div className="mt-3 text-xs text-white/60">
        Cluj-Napoca • (adaugi aici adresa)
      </div>
    </div>
  );
}