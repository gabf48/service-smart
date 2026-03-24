"use client";

import Link from "next/link";

export function ServicesHero({
  phoneE164,
  phoneDisplay,
  whatsappE164,
}: {
  phoneE164: string;
  phoneDisplay: string;
  whatsappE164: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/space.gif"
          alt="Space background"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Servicii
          </h1>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            Alege categoria și vezi serviciile. Pentru detalii, apasă “Detalii”.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact?motivo=Consultanță%20IT"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700 active:scale-[0.99]"
            >
              Cere o evaluare
            </Link>

            <a
              href={`tel:${phoneE164}`}
              className="rounded-xl bg-white/10 px-6 py-3 font-semibold transition hover:bg-white/15 active:scale-[0.99]"
            >
              Sună: {phoneDisplay}
            </a>

            <a
              href={`https://wa.me/${whatsappE164}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-green-600/20 px-6 py-3 font-semibold transition hover:bg-green-600/30 active:scale-[0.99]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}