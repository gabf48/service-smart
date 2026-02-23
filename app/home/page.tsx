"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-white bg-black overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4">
        <div className="absolute inset-0">
          {/* GIF background */}
          <img
            src="/space.gif"
            alt="Space background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-3xl">
         <h1 className="text-4xl sm:text-5xl font-bold mb-4">
  Probleme IT și hardware rezolvate rapid și profesionist
</h1>
<p className="text-lg sm:text-xl mb-8">
  De la laptopuri și PC-uri, la imprimante industriale, configurări rețea și instalări software – oferim soluții complete și rapide, adaptate nevoilor tale. Reparăm, curățăm, instalăm și optimizăm tot ce ține de IT-ul tău.
</p>


          <div className="flex flex-col sm:flex-row justify-center gap-4">
    <Link
  href="/contact?motivo=Problema%20laptop/PC"
  className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded font-semibold"
>
  Contactează-ne
</Link>

            <Link
              href="/servicii"
              className="bg-white text-black hover:bg-gray-200 transition px-6 py-3 rounded font-semibold"
            >
              Vezi serviciile
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">Ce oferim</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Reparații hardware", desc: "Rezolvăm rapid probleme cu laptopuri și PC-uri." },
            { title: "Consultanță software", desc: "Instalări, update-uri și suport software." },
            { title: "Probleme rețea / Wi-Fi", desc: "Configurări, optimizări și depanare." },
            { title: "Servicii personalizate", desc: "Soluții adaptate nevoilor tale IT." },
          ].map((service) => (
            <div
              key={service.title}
              className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Cum lucrăm</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <div className="text-4xl mb-4">📩</div>
            <h3 className="font-semibold mb-2">Raportează problema</h3>
            <p className="text-gray-300">Trimite detaliile prin formularul de contact.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-semibold mb-2">Evaluare rapidă</h3>
            <p className="text-gray-300">Analizăm problema și pregătim soluția.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="font-semibold mb-2">Soluție imediată</h3>
            <p className="text-gray-300">Rezolvăm rapid, sigur și fără bătăi de cap.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">Ce spun clienții noștri</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            "Au rezolvat problema laptopului meu în mai puțin de 24h!",
            "Profesioniști, rapizi și comunicați excelent.",
            "Recomand 100%, servicii rapide și eficiente."
          ].map((text, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-xl shadow">
              <p className="italic">"{text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ai o problemă IT?</h2>
  <Link
  href="/contact?motivo=Problema%20laptop/PC"
  className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded font-semibold"
>
  Contactează-ne
</Link>

      </section>
    </div>
  );
}
