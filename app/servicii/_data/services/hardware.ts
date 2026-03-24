import type { Service } from "../../_types/services";

export const hardwareServices: Service[] = [
  {
    id: "diagnoza",
    title: "Diagnoză & evaluare defect",
    short: "Identificăm cauza și soluția.",
    category: "hardware",
    icon: "🩺",
    ctaMotivo: "Diagnoză laptop/PC",
    priceFrom: 80,
    trustPoints: ["Rapid", "Transparent"],
    deliverables: ["Diagnoză", "Estimare"],
    processSteps: [
      { title: "Testare", desc: "Verificăm problema." },
      { title: "Rezultat", desc: "Îți spunem soluția." },
    ],
  },
  {
    id: "curatare",
    title: "Curățare & mentenanță",
    short: "Reduci temperaturile și zgomotul.",
    category: "hardware",
    icon: "🧼",
    ctaMotivo: "Curățare laptop",
    priceFrom: 150,
    trustPoints: ["Temperaturi mai bune"],
    deliverables: ["Curățare", "Pastă termică"],
    processSteps: [
      { title: "Curățare", desc: "Eliminăm praful." },
    ],
  },
];