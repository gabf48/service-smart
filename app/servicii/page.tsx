"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
type Service = {
  id: string;
  title: string;
  short: string;
  category: string;
  icon: string;
  ctaMotivo: string;

  priceFrom: number; // RON

  heroImage?: string;
  trustPoints: string[];
  deliverables: string[];
  processSteps: { title: string; desc: string }[];
  notes?: string[];
};

type Category = {
  key: string;
  title: string;
  subtitle: string;
  icon: string;
};

const PHONE_E164 = "+40746263481";
const PHONE_DISPLAY = "+40 746 263 481";
const WHATSAPP_E164 = "40746263481";
const EMAIL = "contact@service-smart.ro";
const LOCATION_LABEL = "Cluj-Napoca";

export default function ServiciiPage() {
 const categories: Category[] = [
  {
    key: "hardware",
    title: "Hardware & Reparații",
    subtitle: "Laptop/PC: upgrade, reparații, înlocuiri piese, build-uri.",
    icon: "🧩",
  },
  {
    key: "software",
    title: "Software & Instalări",
    subtitle: "Windows/macOS/Linux, Office, virtualizare, Docker, setup complet.",
    icon: "⚙️",
  },
  {
    key: "network",
    title: "Rețea & Infrastructură",
    subtitle: "Wi-Fi, routere, imprimante în rețea, birouri, securizare.",
    icon: "📡",
  },
  {
    key: "web",
    title: "Web & Business",
    subtitle: "Website de prezentare, audit SEO, B2B, colaborări.",
    icon: "🌐",
  },
];


  const services: Service[] = [
  // =========================
  // HARDWARE & REPARAȚII
  // =========================
  {
    id: "diagnoza",
    title: "Diagnoză & evaluare defect (Laptop/PC)",
    short: "Identificăm cauza, îți spunem clar ce merită reparat și ce nu.",
    category: "hardware",
    icon: "🩺",
    ctaMotivo: "Diagnoză laptop/PC",
    priceFrom: 80,
    heroImage: "/services/diagnostic.webp",
    trustPoints: [
      "Evaluare rapidă și realistă",
      "Transparență: cost/beneficiu înainte de reparație",
      "Recomandări alternative (upgrade vs înlocuire)",
    ],
    deliverables: ["Diagnoză + concluzie", "Estimare costuri", "Plan de acțiune"],
    processSteps: [
      { title: "Testare", desc: "Simptome, verificări bază, temperaturi, alimentare." },
      { title: "Confirmare", desc: "Validăm componenta/zonele cu probleme." },
      { title: "Recomandare", desc: "Îți propunem varianta optimă." },
      { title: "Decizie", desc: "Continui doar dacă merită." },
    ],
  },
  {
    id: "curatare-mentenanta",
    title: "Curățare & mentenanță (praf + pastă termică)",
    short: "Scazi temperaturile, reduci zgomotul, prelungești viața componentelor.",
    category: "hardware",
    icon: "🧼",
    ctaMotivo: "Curățare laptop/PC",
    priceFrom: 150,
    heroImage: "/services/cleaning.webp",
    trustPoints: ["Curățare internă corectă", "Pastă termică aplicată corect", "Test temperaturi înainte/după"],
    deliverables: ["Curățare completă", "Înlocuire pastă termică", "Test temperaturi"],
    processSteps: [
      { title: "Demontare", desc: "Acces la sistemul de răcire." },
      { title: "Curățare", desc: "Praf + radiatoare + ventilatoare." },
      { title: "Termic", desc: "Pastă termică / pad-uri (dacă e cazul)." },
      { title: "Test", desc: "Stabilitate și temperaturi." },
    ],
  },
  {
    id: "upgrade-ssd-ram",
    title: "Upgrade SSD / RAM (Laptop/PC)",
    short: "Upgrade pentru viteză și multitasking. Migrare Windows opțional.",
    category: "hardware",
    icon: "⚡",
    ctaMotivo: "Upgrade SSD / RAM",
    priceFrom: 120,
    heroImage: "/services/upgrade.webp",
    trustPoints: ["Compatibilitate verificată", "Opțional: clonare/migrare sistem", "Test performanță"],
    deliverables: ["SSD/RAM montat", "Test boot + stabilitate", "Opțional: migrare OS"],
    processSteps: [
      { title: "Compatibilitate", desc: "Sloturi, capacități, frecvențe, NVMe/SATA." },
      { title: "Montaj", desc: "Instalare SSD/RAM." },
      { title: "Migrare", desc: "Clonare/instalare curată (opțional)." },
      { title: "Test", desc: "Verificare stabilitate." },
    ],
  },
  {
    id: "display-tastatura",
    title: "Înlocuire display / tastatură / trackpad (Mac & Windows)",
    short: "Schimbare ecran, tastatură, balamale, cablaje, componente input.",
    category: "hardware",
    icon: "🖥️",
    ctaMotivo: "Înlocuire display/tastatură",
    priceFrom: 250,
    heroImage: "/services/display.webp",
    trustPoints: ["Compatibilitate verificată înainte", "Montaj curat", "Test complet"],
    deliverables: ["Piesă montată", "Test complet", "Recomandări piese"],
    processSteps: [
      { title: "Diagnoză", desc: "Confirmăm piesa defectă." },
      { title: "Piesă", desc: "Propunem opțiuni (nou/SH/buget/premium)." },
      { title: "Montaj", desc: "Înlocuire + verificări." },
      { title: "Test", desc: "Imagine/keyboard/touch/trackpad." },
    ],
  },
  {
    id: "build-pc",
    title: "Build PC complet (de la 0)",
    short: "Asamblare completă + cable management + airflow + BIOS.",
    category: "hardware",
    icon: "🧱",
    ctaMotivo: "Build PC complet",
    priceFrom: 250,
    heroImage: "/services/build-pc.webp",
    trustPoints: ["Compatibilitate componente", "BIOS setări stabile", "Test temperaturi"],
    deliverables: ["PC asamblat + testat", "BIOS configurat", "Opțional: instalare Windows"],
    processSteps: [
      { title: "Verificare listă", desc: "Compatibilitate și riscuri." },
      { title: "Asamblare", desc: "Montaj complet." },
      { title: "Config", desc: "BIOS, fan curves, XMP/EXPO." },
      { title: "Test", desc: "Stabilitate și temperaturi." },
    ],
  },
  {
    id: "schimbare-mb",
    title: "Înlocuire placă de bază (Laptop/PC)",
    short: "Evaluare dacă merită + înlocuire + test complet.",
    category: "hardware",
    icon: "🧠",
    ctaMotivo: "Înlocuire placă de bază",
    priceFrom: 350,
    heroImage: "/services/motherboard.webp",
    trustPoints: ["Îți spunem înainte dacă merită", "Transfer corect componente", "Test complet"],
    deliverables: ["Montaj MB", "Test boot/drivere", "Recomandări"],
    processSteps: [
      { title: "Diagnoză", desc: "Confirmăm defectul." },
      { title: "Alegere piesă", desc: "Nou/SH + compatibilitate." },
      { title: "Montaj", desc: "Înlocuire + transfer." },
      { title: "Test", desc: "Stabilitate + temperaturi." },
    ],
  },
  {
    id: "upgrade-cpu",
    title: "Upgrade procesor PC (CPU)",
    short: "Schimbare CPU + BIOS + teste de stabilitate/temperaturi.",
    category: "hardware",
    icon: "🔧",
    ctaMotivo: "Upgrade CPU PC",
    priceFrom: 150,
    heroImage: "/services/cpu.webp",
    trustPoints: ["Verificare chipset/BIOS", "Montaj corect", "Test stabilitate"],
    deliverables: ["CPU instalat", "BIOS configurat", "Test temperaturi"],
    processSteps: [
      { title: "Compatibilitate", desc: "Socket/chipset/BIOS/VRM." },
      { title: "Montaj", desc: "Pastă termică + instalare." },
      { title: "Config", desc: "BIOS update dacă e nevoie." },
      { title: "Test", desc: "Load test + temperaturi." },
    ],
  },

  // =========================
  // SOFTWARE & INSTALĂRI
  // =========================
  {
    id: "windows-reinstall",
    title: "Instalare / Reinstalare Windows (10/11)",
    short: "Instalare curată, drivere, optimizări, backup opțional.",
    category: "software",
    icon: "🪟",
    ctaMotivo: "Instalare Windows",
    priceFrom: 200,
    heroImage: "/services/windows.webp",
    trustPoints: ["Instalare curată", "Drivere corecte", "Optimizări de bază"],
    deliverables: ["Windows instalat", "Drivere + update", "Setări esențiale"],
    processSteps: [
      { title: "Backup", desc: "Salvăm datele importante (opțional)." },
      { title: "Instalare", desc: "Windows curat + partiții corecte." },
      { title: "Drivere", desc: "Chipset/GPU/Wi-Fi/Audio." },
      { title: "Final", desc: "Optimizări + predare." },
    ],
  },
  {
    id: "macos-reinstall",
    title: "Instalare / Reinstalare macOS (Mac)",
    short: "Reinstalare curată, configurare conturi, migrare date opțional.",
    category: "software",
    icon: "",
    ctaMotivo: "Instalare macOS",
    priceFrom: 250,
    heroImage: "/services/macos.webp",
    trustPoints: ["Versiune compatibilă cu modelul", "Config iCloud/Apple ID", "Optimizări"],
    deliverables: ["macOS reinstalat", "Conturi setate", "Update-uri aplicate"],
    processSteps: [
      { title: "Verificare", desc: "Model/SSD/stare sistem." },
      { title: "Backup", desc: "Time Machine / copy (opțional)." },
      { title: "Reinstalare", desc: "Curat + update." },
      { title: "Predare", desc: "Test + recomandări." },
    ],
  },
  {
    id: "linux-install",
    title: "Instalare Linux (Ubuntu/Debian etc.)",
    short: "Linux pentru dev, server home, performanță sau privacy. Dual-boot opțional.",
    category: "software",
    icon: "🐧",
    ctaMotivo: "Instalare Linux",
    priceFrom: 250,
    heroImage: "/services/linux.webp",
    trustPoints: ["Alegem distro potrivit", "Drivere/boot corect", "Dual-boot (opțional)"],
    deliverables: ["Linux instalat", "Drivere/config", "User setup"],
    processSteps: [
      { title: "Alegere distro", desc: "În funcție de nevoi." },
      { title: "Instalare", desc: "Partiții + boot corect." },
      { title: "Config", desc: "Drivere + updates." },
      { title: "Predare", desc: "Ghid scurt." },
    ],
  },
  {
    id: "virtualizare",
    title: "Mașini virtuale (VM) – setup complet",
    short: "VMware/VirtualBox/UTM: VM-uri pentru test, dev, izolare.",
    category: "software",
    icon: "🧪",
    ctaMotivo: "Mașini virtuale setup",
    priceFrom: 200,
    heroImage: "/services/vm.webp",
    trustPoints: ["Config corect resurse", "Network NAT/Bridge", "Snapshot-uri"],
    deliverables: ["VM creat", "Template/snapshot", "Setări rețea"],
    processSteps: [
      { title: "Nevoi", desc: "Ce OS și ce utilizare." },
      { title: "Setup", desc: "Hypervisor + configurare." },
      { title: "Optimizare", desc: "Resurse + storage." },
      { title: "Livrare", desc: "Snapshot + instrucțiuni." },
    ],
  },
  {
    id: "office-pack",
    title: "Instalare Microsoft Office + configurare (RO/EN)",
    short: "Office instalat corect, limba, activare, Outlook (opțional).",
    category: "software",
    icon: "📎",
    ctaMotivo: "Instalare Microsoft Office",
    priceFrom: 120,
    heroImage: "/services/office.webp",
    trustPoints: ["Configurare limbă", "Activare corectă", "Outlook (opțional)"],
    deliverables: ["Office instalat", "Limbă setată", "Test aplicații"],
    processSteps: [
      { title: "Verificare licență", desc: "Cheie/cont/versiune." },
      { title: "Instalare", desc: "Setup curat." },
      { title: "Config", desc: "Limbă + update-uri." },
      { title: "Test", desc: "Word/Excel/Outlook (opțional)." },
    ],
  },
  {
    id: "docker-setup",
    title: "Instalare Docker + mediu de lucru (Windows/macOS/Linux)",
    short: "Docker Desktop, WSL2, compose, imagini, setup pentru dev/test.",
    category: "software",
    icon: "🐳",
    ctaMotivo: "Instalare Docker",
    priceFrom: 250,
    heroImage: "/services/docker.webp",
    trustPoints: ["Setări corecte (WSL2)", "Compose setup", "Best practices"],
    deliverables: ["Docker funcțional", "Exemplu compose", "Config recomandată"],
    processSteps: [
      { title: "Verificare", desc: "OS + virtualizare + resurse." },
      { title: "Instalare", desc: "Docker/WSL2/dep." },
      { title: "Setup", desc: "Compose + volume + network." },
      { title: "Test", desc: "Rulează stack demo." },
    ],
  },

  // =========================
  // REȚEA & INFRASTRUCTURĂ
  // =========================
  {
    id: "wifi-optim",
    title: "Optimizare Wi-Fi (acasă/birou)",
    short: "Semnal, canale, interferențe, acoperire, mesh/AP dacă e nevoie.",
    category: "network",
    icon: "📶",
    ctaMotivo: "Optimizare Wi-Fi",
    priceFrom: 150,
    heroImage: "/services/network.webp",
    trustPoints: ["Diagnostic interferențe", "Setări router/AP", "Recomandări echipamente"],
    deliverables: ["Wi-Fi stabilizat", "Setări aplicate", "Test viteză"],
    processSteps: [
      { title: "Audit", desc: "Acoperire și congestie." },
      { title: "Tuning", desc: "Canale, putere, roaming." },
      { title: "Extindere", desc: "Mesh/AP dacă e necesar." },
      { title: "Test", desc: "Validare reală." },
    ],
  },
  {
    id: "router-modem",
    title: "Instalare & securizare router / modem",
    short: "PPPoE/DHCP, guest Wi-Fi, parole, update, firewall de bază.",
    category: "network",
    icon: "🛡️",
    ctaMotivo: "Instalare router/modem",
    priceFrom: 150,
    heroImage: "/services/router.webp",
    trustPoints: ["Guest separat", "WPA2/WPA3", "Setări curate"],
    deliverables: ["Internet configurat", "Wi-Fi securizat", "Instrucțiuni scurte"],
    processSteps: [
      { title: "Setup", desc: "Conectare provider." },
      { title: "Wi-Fi", desc: "SSID + parole + canale." },
      { title: "Securitate", desc: "Guest + update." },
      { title: "Test", desc: "Viteză/latency." },
    ],
  },
  {
    id: "printer-network",
    title: "Imprimantă în rețea (print/scan multi-PC)",
    short: "Configurare pe toate PC-urile, drivere, scan (unde e cazul).",
    category: "network",
    icon: "🖨️",
    ctaMotivo: "Imprimantă în rețea",
    priceFrom: 120,
    heroImage: "/services/printer.webp",
    trustPoints: ["Drivere corecte", "IP fix/reservation", "Test complet"],
    deliverables: ["Print funcțional", "Scan (opțional)", "Ghid scurt"],
    processSteps: [
      { title: "Conectare", desc: "LAN/Wi-Fi + IP stabil." },
      { title: "Drivere", desc: "Instalare pe fiecare PC." },
      { title: "Partajare", desc: "Dacă e cazul." },
      { title: "Test", desc: "Print/scan." },
    ],
  },
  {
    id: "office-infra",
    title: "Infrastructură rețea birou / clădire",
    short: "Mai multe birouri, AP-uri, switch-uri, cablare, plan scalabil.",
    category: "network",
    icon: "🏢",
    ctaMotivo: "Infrastructură rețea birouri",
    priceFrom: 500,
    heroImage: "/services/office-network.webp",
    trustPoints: ["Design scalabil", "Wi-Fi acoperire corectă", "Documentație minimă"],
    deliverables: ["Plan + implementare", "Test acoperire", "Recomandări mentenanță"],
    processSteps: [
      { title: "Audit", desc: "Necesar + plan spațiu." },
      { title: "Design", desc: "Topologie + buget." },
      { title: "Implementare", desc: "Montaj + configurare." },
      { title: "Predare", desc: "Test + documentație." },
    ],
  },
  {
    id: "wifi-qr",
    title: "Wi-Fi Guest cu QR + securizare",
    short: "QR pentru invitați, separare rețele, igienă de securitate.",
    category: "network",
    icon: "🔐",
    ctaMotivo: "Wi-Fi QR guest",
    priceFrom: 120,
    heroImage: "/services/qr-wifi.webp",
    trustPoints: ["Guest separat", "QR printabil", "Recomandări securitate"],
    deliverables: ["Guest configurat", "QR", "Instrucțiuni"],
    processSteps: [
      { title: "Separare", desc: "Guest vs intern." },
      { title: "Config", desc: "Securitate + parole." },
      { title: "QR", desc: "Generare QR." },
      { title: "Test", desc: "Validare." },
    ],
  },

  // =========================
  // WEB & BUSINESS
  // =========================
  {
    id: "website-prezentare",
    title: "Website de prezentare (modern)",
    short: "Site rapid, modern, mobile-first, orientat pe conversie.",
    category: "web",
    icon: "🌐",
    ctaMotivo: "Website de prezentare",
    priceFrom: 1200,
    heroImage: "/services/website.webp",
    trustPoints: ["Design modern", "Performanță", "CTA-uri clare", "SEO on-page de bază"],
    deliverables: ["Structură pagini", "Implementare + deploy", "Ghid scurt de update"],
    processSteps: [
      { title: "Brief", desc: "Obiective + public." },
      { title: "Structură", desc: "Secțiuni + conținut." },
      { title: "Build", desc: "Implementare + optimizări." },
      { title: "Launch", desc: "Deploy + verificări." },
    ],
  },
  {
    id: "seo-audit",
    title: "Audit SEO (tehnic + conținut)",
    short: "Probleme + priorități + plan de acțiune realist.",
    category: "web",
    icon: "📈",
    ctaMotivo: "Audit SEO",
    priceFrom: 400,
    heroImage: "/services/seo.webp",
    trustPoints: ["Quick wins", "Prioritizare", "Raport clar"],
    deliverables: ["Raport scurt", "Top acțiuni", "Recomandări"],
    processSteps: [
      { title: "Scan", desc: "Tehnic + performanță." },
      { title: "Diagnoză", desc: "Cauze + impact." },
      { title: "Prioritizare", desc: "Ce faci întâi." },
      { title: "Plan", desc: "Pași concreți." },
    ],
  },
  {
    id: "b2b",
    title: "Suport B2B (mentenanță & intervenții)",
    short: "Pachete pentru firme: intervenții, mentenanță, inventar, recomandări.",
    category: "web",
    icon: "🤝",
    ctaMotivo: "Suport B2B",
    priceFrom: 500,
    heroImage: "/services/b2b.webp",
    trustPoints: ["Pachete flexibile", "Intervenții remote/on-site", "Transparență"],
    deliverables: ["Pachet propus", "Canal suport", "Raport (opțional)"],
    processSteps: [
      { title: "Audit", desc: "Situația curentă." },
      { title: "Propunere", desc: "Pachet + condiții." },
      { title: "Implementare", desc: "Suport continuu." },
      { title: "Îmbunătățire", desc: "Optimizare." },
    ],
  },
  {
    id: "colaborari",
    title: "Colaborări (reparații / publicitate / proiecte)",
    short: "Parteneriate, subcontractare, campanii, proiecte recurente.",
    category: "web",
    icon: "🧑‍💼",
    ctaMotivo: "Colaborări",
    priceFrom: 0,
    heroImage: "/services/collab.webp",
    trustPoints: ["Roluri clare", "Comunicare", "Livrare"],
    deliverables: ["Model colaborare", "Plan", "Canal comunicare"],
    processSteps: [
      { title: "Discuție", desc: "Obiective + context." },
      { title: "Cadru", desc: "Responsabilități." },
      { title: "Execuție", desc: "Livrare." },
      { title: "Iterație", desc: "Îmbunătățire." },
    ],
    notes: ["Pentru colaborări, prețul depinde de proiect. Scrie-mi detalii."],
  },
];

  const [activeCategory, setActiveCategory] = useState<string>("hardware");
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = useMemo(
    () => services.find((s) => s.id === activeId) ?? null,
    [activeId, services]
  );

  const visibleServices = useMemo(
    () => services.filter((s) => s.category === activeCategory),
    [services, activeCategory]
  );

  const closeModal = () => setActiveId(null);

  return (
    <div className="space-bg min-h-dvh text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/space.gif"
            alt="Space background"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Servicii
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80">
              Alege categoria și vezi serviciile. Pentru detalii, apasă “Detalii”.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?motivo=Consultanță%20IT"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 transition active:scale-[0.99]"
              >
                Cere o evaluare
              </Link>

              <a
                href={`tel:${PHONE_E164}`}
                className="rounded-xl bg-white/10 px-6 py-3 font-semibold hover:bg-white/15 transition active:scale-[0.99]"
              >
                Sună: {PHONE_DISPLAY}
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_E164}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-green-600/20 px-6 py-3 font-semibold hover:bg-green-600/30 transition active:scale-[0.99]"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* BIG CATEGORY PILLS (top) */}
          <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {categories.map((c) => {
                const active = c.key === activeCategory;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setActiveCategory(c.key)}
                    className={[
                      "text-left rounded-2xl border backdrop-blur-md",
                      "transition-all duration-200",
                      active
                        ? "border-white/25 bg-white/10 shadow-xl shadow-black/25"
                        : "border-white/10 bg-white/5 hover:bg-white/7 hover:border-white/15",
                    ].join(" ")}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs text-white/60">Categorie</div>
                          <div className="mt-1 text-lg font-semibold">
                            {c.title}
                          </div>
                        </div>
                        <div className="shrink-0 rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/10">
                          <span className="text-lg">{c.icon}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-white/70">
                        {c.subtitle}
                      </div>

                      {active && (
                        <div className="mt-4">
                          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/10">
                            Selectat
                          </span>
                        </div>
                      )}
                    </div>

                    <div
                      className={[
                        "h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent",
                        active ? "opacity-100" : "opacity-0",
                        "transition",
                      ].join(" ")}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID FOR ACTIVE CATEGORY */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              {categories.find((c) => c.key === activeCategory)?.title}
            </h2>
            <p className="mt-1 text-white/70">
              {categories.find((c) => c.key === activeCategory)?.subtitle}
            </p>
          </div>

          <Link
            href={`/contact?motivo=${encodeURIComponent(
              categories.find((c) => c.key === activeCategory)?.title ?? "Servicii"
            )}`}
            className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/15 transition"
          >
            Cere ofertă pentru categoria asta
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleServices.map((s) => (
            <div
              key={s.id}
              className={[
                "group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md",
                "shadow-xl shadow-black/30",
                "transition-all duration-200",
                "hover:border-white/20 hover:bg-white/7",
              ].join(" ")}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-white/60">Serviciu</div>
                    <h3 className="mt-1 text-xl font-semibold leading-snug">
                      {s.title}
                    </h3>
                  </div>
                  <div className="shrink-0 rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/10">
                    <span className="text-lg">{s.icon}</span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-white/75">{s.short}</p>
<div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/10">
  <span className="text-white/70">de la</span>
  <span className="font-semibold">{s.priceFrom} RON</span>
</div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveId(s.id)}
                    className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 transition active:scale-[0.99]"
                  >
                    Detalii
                  </button>

                  <Link
                    href={`/contact?motivo=${encodeURIComponent(s.ctaMotivo)}`}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition active:scale-[0.99]"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              <div className="h-px w-full bg-linear-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black/40 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold">Nu găsești exact ce cauți?</h3>
                <p className="mt-2 text-white/70">
                  Scrie-ne ce ai nevoie și îți spunem rapid dacă putem ajuta + ce variantă e cea mai bună.
                </p>

                <div className="mt-4 text-sm text-white/70">
                  <span className="mr-3">📍 {LOCATION_LABEL}</span>
                  <span className="mr-3">✉️ {EMAIL}</span>
                  <span>📞 {PHONE_DISPLAY}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Link
                  href="/contact?motivo=Alte%20servicii"
                  className="w-full lg:w-auto text-center rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 transition active:scale-[0.99]"
                >
                  Spune-ne problema
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_E164}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full lg:w-auto text-center rounded-xl bg-green-600/20 px-6 py-3 font-semibold hover:bg-green-600/30 transition active:scale-[0.99]"
                >
                  WhatsApp rapid
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS MODAL */}
      {active && (
        <div
          className="fixed inset-0 z-[80]"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <div className="relative mx-auto max-w-4xl px-4 py-10">
            <div className="animate-modalIn overflow-hidden rounded-2xl border border-white/10 bg-gray-950/85 shadow-2xl">
              <div className="relative">
                <div className="h-44 sm:h-56 w-full overflow-hidden">
                  {active.heroImage ? (
                    <img
                      src={active.heroImage}
                      alt={active.title}
                      className="h-full w-full object-cover opacity-80"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="h-full w-full bg-linear-to-r from-white/10 via-white/5 to-white/10" />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-gray-950/90" />

                <div className="absolute left-0 right-0 bottom-0 p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-white/65">Detalii serviciu</div>
                      <h3 className="mt-1 text-2xl sm:text-3xl font-bold">{active.title}</h3>
                      <p className="mt-2 text-sm sm:text-base text-white/75 max-w-2xl">
                        {active.short}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="shrink-0 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/15 transition"
                      aria-label="Închide"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="mr-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs ring-1 ring-white/10">
  <span className="text-white/70">de la</span>
  <span className="font-semibold">{active.priceFrom} RON</span>
</div>
                    <Link
                      href={`/contact?motivo=${encodeURIComponent(active.ctaMotivo)}`}
                      className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold hover:bg-blue-700 transition active:scale-[0.99]"
                      onClick={closeModal}
                    >
                      Contact
                    </Link>
                    <a
                      href={`tel:${PHONE_E164}`}
                      className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/15 transition active:scale-[0.99]"
                    >
                      Sună
                    </a>
                    <a
                      href={`https://wa.me/${WHATSAPP_E164}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-green-600/20 px-5 py-2.5 text-sm font-semibold hover:bg-green-600/30 transition active:scale-[0.99]"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h4 className="text-lg font-semibold">De ce merită</h4>
                    <ul className="mt-3 space-y-2 text-sm text-white/75">
                      {active.trustPoints.map((t) => (
                        <li key={t} className="flex gap-2">
                          <span className="mt-0.5 text-emerald-300">✓</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h4 className="text-lg font-semibold">Ce primești</h4>
                    <ul className="mt-3 space-y-2 text-sm text-white/75">
                      {active.deliverables.map((t) => (
                        <li key={t} className="flex gap-2">
                          <span className="mt-0.5 text-sky-300">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h4 className="text-lg font-semibold">Cum lucrăm</h4>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {active.processSteps.map((st, idx) => (
                      <div
                        key={st.title}
                        className="rounded-2xl border border-white/10 bg-black/30 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-bold ring-1 ring-white/10">
                            {idx + 1}
                          </span>
                          <div className="font-semibold">{st.title}</div>
                        </div>
                        <p className="mt-2 text-sm text-white/75">{st.desc}</p>
                      </div>
                    ))}
                  </div>

                  {active.notes?.length ? (
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <div className="text-sm font-semibold text-white/85">Notă</div>
                      <ul className="mt-2 space-y-2 text-sm text-white/70">
                        {active.notes.map((n) => (
                          <li key={n} className="flex gap-2">
                            <span className="mt-0.5 text-amber-300">!</span>
                            <span>{n}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="border-t border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="text-sm text-white/70">
                  Preferi să discutăm rapid?{" "}
                  <a className="underline underline-offset-4" href={`tel:${PHONE_E164}`}>
                    {PHONE_DISPLAY}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/15 transition"
                >
                  Închide
                </button>
              </div>
            </div>
          </div>

          <style jsx>{`
            .animate-modalIn {
              animation: modalIn 180ms ease-out both;
            }
            @keyframes modalIn {
              from {
                opacity: 0;
                transform: translateY(10px) scale(0.99);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}