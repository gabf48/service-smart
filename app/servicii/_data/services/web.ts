import type { Service } from "../../_types/services";

export const webServices: Service[] = [
  {
    id: "website",
    title: "Website prezentare",
    short: "Site modern și rapid.",
    category: "web",
    icon: "🌐",
    ctaMotivo: "Website",
    priceFrom: 1200,
    trustPoints: ["Design modern"],
    deliverables: ["Website complet"],
    processSteps: [
      { title: "Build", desc: "Implementare." },
    ],
  },
];