"use client";

import { SERVICES } from "./home.constants";

export function HomeServices() {
  return (
    <section className="bg-gray-900 px-4 py-20">
      <h2 className="mb-12 text-center text-3xl font-bold">Ce oferim</h2>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="cursor-pointer rounded-2xl bg-gray-800 p-6 shadow transition hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
            <p className="text-gray-300">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}