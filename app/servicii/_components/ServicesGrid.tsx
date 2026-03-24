"use client";

import Link from "next/link";
import type { Category, Service } from "../_types/services";

export function ServicesGrid({
  categories,
  activeCategory,
  services,
  onOpenDetails,
}: {
  categories: Category[];
  activeCategory: string;
  services: Service[];
  onOpenDetails: (id: string) => void;
}) {
  const activeCategoryData = categories.find((c) => c.key === activeCategory);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {activeCategoryData?.title}
          </h2>
          <p className="mt-1 text-white/70">{activeCategoryData?.subtitle}</p>
        </div>

        <Link
          href={`/contact?motivo=${encodeURIComponent(
            activeCategoryData?.title ?? "Servicii"
          )}`}
          className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/15"
        >
          Cere ofertă pentru categoria asta
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.id}
            className="group rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/7"
          >
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-white/60">Serviciu</div>
                  <h3 className="mt-1 text-xl font-semibold leading-snug">
                    {s.title}
                  </h3>
                </div>

                <div className="shrink-0 rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/10">
                  <span className="text-lg">{s.icon}</span>
                </div>
              </div>

              <p className="mt-3 text-sm text-white/75">{s.short}</p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/10">
                <span className="text-white/70">de la</span>
                <span className="font-semibold">{s.priceFrom} RON</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onOpenDetails(s.id)}
                  className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/15 active:scale-[0.99]"
                >
                  Detalii
                </button>

                <Link
                  href={`/contact?motivo=${encodeURIComponent(s.ctaMotivo)}`}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-700 active:scale-[0.99]"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}