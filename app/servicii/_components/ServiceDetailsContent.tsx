"use client";

import type { Service } from "../_types/services";

export function ServiceDetailsContent({ service }: { service: Service }) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h4>De ce merită</h4>
        {service.trustPoints.map((t) => (
          <div key={t}>{t}</div>
        ))}
      </div>

      <div>
        <h4>Ce primești</h4>
        {service.deliverables.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div>
        <h4>Cum lucrăm</h4>
        {service.processSteps.map((s) => (
          <div key={s.title}>
            {s.title} - {s.desc}
          </div>
        ))}
      </div>
    </div>
  );
}