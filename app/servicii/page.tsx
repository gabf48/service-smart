"use client";

const services = [
  {
    icon: "⚡",
    title: "Laptop / PC nu pornește",
    desc: "Diagnostic rapid și reparație hardware sau software",
    price: "de la 100 RON",
  },
  {
    icon: "🐢",
    title: "Laptop lent / blocat",
    desc: "Curățare, optimizare și creștere performanță",
    price: "de la 150 RON",
  },
  {
    icon: "💻",
    title: "Instalare Windows",
    desc: "Windows + drivere + programe esențiale",
    price: "de la 150 RON",
  },
  {
    icon: "🧹",
    title: "Curățare laptop / PC",
    desc: "Îndepărtare praf + optimizare sistem",
    price: "de la 120 RON",
  },
  {
    icon: "🌡️",
    title: "Schimbare pastă termoconductoare",
    desc: "Reducere temperaturi și prevenire supraîncălzire",
    price: "de la 100 RON",
  },
  {
    icon: "🚀",
    title: "Upgrade SSD / RAM",
    desc: "Upgrade rapid pentru viteză mai mare",
    price: "de la 80 RON",
  },
  {
    icon: "🖥️",
    title: "Înlocuire display laptop",
    desc: "Ecran spart sau defect – înlocuire rapidă",
    price: "de la 150 RON",
  },
  {
    icon: "📶",
    title: "Probleme Wi-Fi / internet",
    desc: "Configurare rețea și rezolvare probleme conexiune",
    price: "de la 100 RON",
  },
  {
    icon: "💾",
    title: "Recuperare date",
    desc: "Recuperare fișiere de pe HDD, SSD sau stick",
    price: "de la 150 RON",
  },
  {
    icon: "🛠️",
    title: "Asamblare PC",
    desc: "Montaj componente + instalare sistem",
    price: "de la 200 RON",
  },
  {
    icon: "🔧",
    title: "Instalare drivere / setup inițial",
    desc: "Configurare completă după instalare Windows",
    price: "de la 80 RON",
  },
  {
    icon: "🔎",
    title: "Diagnostic complet",
    desc: "Verificare rapidă și estimare cost reparație",
    price: "de la 50 RON",
  },
];

export default function ServiciiPage() {
  return (
    <div className="min-h-screen bg-black px-4 py-20 text-white">
      <div className="mx-auto max-w-5xl text-center">
        
        {/* TITLU */}
        <h1 className="mb-4 text-4xl font-bold">
          Servicii & Prețuri
        </h1>

        <p className="mb-10 text-white/80">
          Prețuri corecte, fără surprize. Pentru orice problemă, sună sau scrie direct.
        </p>

        {/* SERVICII */}
        <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{service.icon}</div>

                <div className="flex-1">
                  <h2 className="text-base font-semibold">
                    {service.title}
                  </h2>

                  <p className="mt-1 text-sm text-white/70">
                    {service.desc}
                  </p>

                  <p className="mt-2 text-sm font-bold text-blue-400">
                    {service.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TEXT CONVERSIE */}
        <p className="mt-10 text-white/70">
          Nu ești sigur care e problema? Sună și îți spun rapid.
        </p>

        {/* CTA */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="tel:+40757180250"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
          >
            📞 Sună acum
          </a>

          <a
            href="https://wa.me/40757180250"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-700"
          >
            💬 WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}