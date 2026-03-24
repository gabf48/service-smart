"use client";

import Link from "next/link";

export function ServicesFinalCta({
  locationLabel,
  email,
  phoneDisplay,
  whatsappE164,
}: {
  locationLabel: string;
  email: string;
  phoneDisplay: string;
  whatsappE164: string;
}) {
  return (
    <section className="border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h3 className="text-2xl font-bold">Nu găsești exact ce cauți?</h3>
              <p className="mt-2 text-white/70">
                Scrie-ne ce ai nevoie și îți spunem rapid dacă putem ajuta + ce variantă e cea mai bună.
              </p>

              <div className="mt-4 text-sm text-white/70">
                <span className="mr-3">📍 {locationLabel}</span>
                <span className="mr-3">✉️ {email}</span>
                <span>📞 {phoneDisplay}</span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <Link
                href="/contact?motivo=Alte%20servicii"
                className="w-full rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold transition hover:bg-blue-700 active:scale-[0.99] lg:w-auto"
              >
                Spune-ne problema
              </Link>

              <a
                href={`https://wa.me/${whatsappE164}`}
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-xl bg-green-600/20 px-6 py-3 text-center font-semibold transition hover:bg-green-600/30 active:scale-[0.99] lg:w-auto"
              >
                WhatsApp rapid
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}