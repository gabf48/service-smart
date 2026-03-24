"use client";

import { WORK_STEPS } from "./home.constants";

export function HomeHowWeWork() {
  return (
    <section className="px-4 py-20">
      <h2 className="mb-12 text-center text-3xl font-bold">Cum lucrăm</h2>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 text-center sm:grid-cols-3">
        {WORK_STEPS.map((step) => (
          <div key={step.title} className="rounded-2xl bg-gray-800 p-6 shadow">
            <div className="mb-4 text-4xl">{step.icon}</div>
            <h3 className="mb-2 font-semibold">{step.title}</h3>
            <p className="text-gray-300">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}