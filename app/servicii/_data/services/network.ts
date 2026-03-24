import type { Service } from "../../_types/services";

export const networkServices: Service[] = [
  {
    id: "wifi",
    title: "Optimizare Wi-Fi",
    short: "Semnal stabil.",
    category: "network",
    icon: "📶",
    ctaMotivo: "WiFi",
    priceFrom: 150,
    trustPoints: ["Stabilitate"],
    deliverables: ["Wi-Fi optimizat"],
    processSteps: [
      { title: "Audit", desc: "Verificare rețea." },
    ],
  },
];