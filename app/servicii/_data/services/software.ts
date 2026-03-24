import type { Service } from "../../_types/services";

export const softwareServices: Service[] = [
  {
    id: "windows",
    title: "Instalare Windows",
    short: "Instalare curată + drivere.",
    category: "software",
    icon: "🪟",
    ctaMotivo: "Instalare Windows",
    priceFrom: 200,
    trustPoints: ["Rapid"],
    deliverables: ["Windows + drivere"],
    processSteps: [
      { title: "Instalare", desc: "Setup complet." },
    ],
  },
  {
    id: "office",
    title: "Instalare Office",
    short: "Office + configurare.",
    category: "software",
    icon: "📎",
    ctaMotivo: "Instalare Office",
    priceFrom: 120,
    trustPoints: ["Configurare corectă"],
    deliverables: ["Office instalat"],
    processSteps: [
      { title: "Instalare", desc: "Setup Office." },
    ],
  },
];