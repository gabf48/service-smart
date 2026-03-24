"use client";

import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="absolute inset-0">
        <img
          src="/space.gif"
          alt="Space background"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
      </div>

      <div className="relative z-10 max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
          Probleme IT și hardware rezolvate rapid și profesionist
        </h1>

        <p className="mb-10 text-lg text-white/80 sm:text-xl">
          De la laptopuri și PC-uri, la imprimante industriale, configurări rețea și
          instalări software – oferim soluții complete și rapide, adaptate
          nevoilor tale.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact?motivo=Problema%20laptop/PC"
            className="group relative rounded-xl bg-blue-600 px-8 py-3 font-semibold shadow-xl transition hover:bg-blue-700 hover:shadow-blue-500/40 active:scale-[0.98]"
          >
            Contactează-ne
          </Link>

          <Link
            href="/servicii"
            className="rounded-xl bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-200 active:scale-[0.98]"
          >
            Vezi serviciile
          </Link>
        </div>
      </div>
    </section>
  );
}