"use client";

import dynamic from "next/dynamic";
import {
  ADDRESS_LABEL,
  ADDRESS_QUERY,
  PHONE_TEL,
  WHATSAPP_WA,
} from "./home.constants";

const Map = dynamic(() => import("../../../components/HomeMap"), {
  ssr: false,
});

export function HomeLocation() {
  return (
    <section className="bg-gray-900 px-4 py-24">
      <h2 className="mb-6 text-center text-3xl font-bold">Unde mă găsești?</h2>
      <p className="mb-10 text-center text-white/70">{ADDRESS_LABEL}</p>

      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-2xl">
          <div className="absolute inset-0 pointer-events-none">
            <div className="h-full w-full opacity-0 transition-opacity duration-300 hover:opacity-100" />
          </div>

          <div className="group relative">
            <div className="pointer-events-none absolute inset-0 rounded-3xl transition-shadow duration-300 group-hover:shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_0_50px_rgba(59,130,246,0.15)]" />
            <Map
              addressQuery={ADDRESS_QUERY}
              addressLabel={ADDRESS_LABEL}
              phoneTel={PHONE_TEL}
              whatsappWa={WHATSAPP_WA}
            />
          </div>
        </div>
      </div>
    </section>
  );
}