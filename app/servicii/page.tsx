"use client";

import { useState } from "react";

import {
  services,
  categories,
  PHONE_E164,
  PHONE_DISPLAY,
  WHATSAPP_E164,
} from "./_data";

import { ServicesHero } from "./_components/ServicesHero";
import { ServicesCategories } from "./_components/ServicesCategories";
import { ServicesGrid } from "./_components/ServicesGrid";
import { ServiceDetailsModal } from "./_components/ServiceDetailsModal";

import type { Service } from "./_types/services";

export default function ServiciiPage() {
  const [active, setActive] = useState<Service | null>(null);
  const [activeCategory, setActiveCategory] = useState("hardware");

  const filteredServices = services.filter(
    (s) => s.category === activeCategory
  );

  return (
    <div className="space-bg min-h-dvh text-white">
      {/* overlay pentru contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* HERO */}
        <ServicesHero
          phoneE164={PHONE_E164}
          phoneDisplay={PHONE_DISPLAY}
          whatsappE164={WHATSAPP_E164}
        />

        {/* CATEGORIES */}
        <div className="mt-10">
          <ServicesCategories
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        {/* GRID */}
        <div className="mt-14">
          <ServicesGrid
            categories={categories}
            activeCategory={activeCategory}
            services={filteredServices}
            onOpenDetails={(id: string) => {
              const found = services.find((s) => s.id === id);
              if (found) setActive(found);
            }}
          />
        </div>
      </div>

      {/* MODAL */}
      <ServiceDetailsModal
        active={active}
        onClose={() => setActive(null)}
        phoneE164={PHONE_E164}
        phoneDisplay={PHONE_DISPLAY}
        whatsappE164={WHATSAPP_E164}
      />
    </div>
  );
}