"use client";

import Link from "next/link";

export function HomeFinalCta() {
  return (
    <section className="bg-gray-900 px-4 py-20 text-center">
      <h2 className="mb-6 text-3xl font-bold">Ai o problemă IT?</h2>

      <Link
        href="/contact?motivo=Problema%20laptop/PC"
        className="rounded-xl bg-blue-600 px-8 py-3 font-semibold shadow-lg transition hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-[0.98]"
      >
        Contactează-ne
      </Link>
    </section>
  );
}