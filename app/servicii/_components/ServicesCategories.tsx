"use client";

import type { Category } from "../_types/services";

export function ServicesCategories({
  categories,
  activeCategory,
  setActiveCategory,
}: {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (value: string) => void;
}) {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => {
          const active = c.key === activeCategory;

          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setActiveCategory(c.key)}
              className={[
                "rounded-2xl border text-left backdrop-blur-md transition-all duration-200",
                active
                  ? "border-white/25 bg-white/10 shadow-xl shadow-black/25"
                  : "border-white/10 bg-white/5 hover:border-white/15 hover:bg-white/7",
              ].join(" ")}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-white/60">Categorie</div>
                    <div className="mt-1 text-lg font-semibold">{c.title}</div>
                  </div>
                  <div className="shrink-0 rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/10">
                    <span className="text-lg">{c.icon}</span>
                  </div>
                </div>

                <div className="mt-2 text-sm text-white/70">{c.subtitle}</div>

                {active && (
                  <div className="mt-4">
                    <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/10">
                      Selectat
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}