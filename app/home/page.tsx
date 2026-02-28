"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

// --- Leaflet (client-only)
const Map = dynamic(() => import("../../components/HomeMap"), { ssr: false });

const PHONE_DISPLAY = "+40 746 263 481";
const PHONE_TEL = "+40746263481";
const WHATSAPP_WA = "40746263481";
const EMAIL = "contact@service-smart.ro";

const ADDRESS_LABEL = "Str. Borhanciului 84A, Cluj-Napoca, România";
const ADDRESS_QUERY = "Strada Borhanciului 84A, Cluj-Napoca, Romania";

export default function HomePage() {
  const [availability] = useState<"online" | "offline">("online");

  return (
    <div className="relative min-h-screen text-white bg-black overflow-x-hidden">
      {/* TOP PHONE CHIP (subtil, premium) */}
      <div className="fixed top-5 right-6 z-50 hidden sm:flex items-center gap-3">
       
        
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/space.gif"
            alt="Space background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Probleme IT și hardware rezolvate rapid și profesionist
          </h1>

          <p className="text-lg sm:text-xl text-white/80 mb-10">
            De la laptopuri și PC-uri, la imprimante industriale, configurări rețea și instalări
            software – oferim soluții complete și rapide, adaptate nevoilor tale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact?motivo=Problema%20laptop/PC"
              className="relative group bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-xl font-semibold shadow-xl hover:shadow-blue-500/40 active:scale-[0.98]"
            >
              Contactează-ne
            </Link>

            <Link
              href="/servicii"
              className="bg-white text-black hover:bg-gray-200 transition px-8 py-3 rounded-xl font-semibold active:scale-[0.98]"
            >
              Vezi serviciile
            </Link>
          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-4 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">Ce oferim</h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Reparații hardware",
              desc: "Rezolvăm rapid probleme cu laptopuri și PC-uri.",
            },
            { title: "Consultanță software", desc: "Instalări, update-uri și suport software." },
            { title: "Probleme rețea / Wi-Fi", desc: "Configurări, optimizări și depanare." },
            { title: "Servicii personalizate", desc: "Soluții adaptate nevoilor tale IT." },
          ].map((service) => (
            <div
              key={service.title}
              className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-2xl hover:shadow-blue-500/10 transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Cum lucrăm</h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: "📩", title: "Raportează problema", desc: "Trimite detaliile prin formularul de contact." },
            { icon: "⚡", title: "Evaluare rapidă", desc: "Analizăm problema și pregătim soluția." },
            { icon: "✅", title: "Soluție imediată", desc: "Rezolvăm rapid, sigur și fără bătăi de cap." },
          ].map((step) => (
            <div key={step.title} className="bg-gray-800 p-6 rounded-2xl shadow">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION (dark map + custom pin + glow + overlay + distance) */}
      <section className="py-24 px-4 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-6">Unde mă găsești?</h2>
        <p className="text-center text-white/70 mb-10">{ADDRESS_LABEL}</p>

        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/30">
            <div className="absolute inset-0 pointer-events-none">
              {/* subtle glow on hover */}
              <div className="h-full w-full opacity-0 transition-opacity duration-300 hover:opacity-100" />
            </div>

            <div className="relative group">
              <div className="absolute inset-0 pointer-events-none group-hover:shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_0_50px_rgba(59,130,246,0.15)] transition-shadow duration-300 rounded-3xl" />
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

      {/* FINAL CTA */}
      <section className="py-20 px-4 text-center bg-gray-900">
        <h2 className="text-3xl font-bold mb-6">Ai o problemă IT?</h2>

        <Link
          href="/contact?motivo=Problema%20laptop/PC"
          className="bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]"
        >
          Contactează-ne
        </Link>
      </section>
    </div>
  );
}

/**
 * ---------------------------------------------------------
 * Client-only Map component (Leaflet + dark tiles + distance)
 * Place this file at: app/home/_components/HomeMap.tsx
 * or adjust the dynamic import path above accordingly.
 * ---------------------------------------------------------
 */