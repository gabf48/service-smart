"use client";

import type { Service } from "../../_types/services";

export function Content({ service }: { service: Service }) {
  return (
    <div className="space-y-6 p-6 sm:p-7">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h4 className="mb-3 text-lg font-semibold">De ce merită</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {service.trustPoints.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="text-green-400">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h4 className="mb-3 text-lg font-semibold">Ce primești</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {service.deliverables.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="text-blue-400">•</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <h4 className="mb-4 text-lg font-semibold">Cum lucrăm</h4>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {service.processSteps.map((st, i) => (
            <div
              key={st.title}
              className="rounded-xl border border-white/10 bg-black/30 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                  {i + 1}
                </div>
                <div className="font-semibold">{st.title}</div>
              </div>

              <div className="mt-2 text-sm text-white/70">{st.desc}</div>
            </div>
          ))}
        </div>

        {service.notes?.length ? (
          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="text-sm font-semibold">Notă</div>
            <ul className="mt-2 space-y-1 text-sm text-white/70">
              {service.notes.map((n) => (
                <li key={n}>• {n}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}