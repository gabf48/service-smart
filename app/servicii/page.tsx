"use client";

export default function ServiciiPage() {
  return (
    <div className="min-h-screen bg-black px-4 py-20 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-4xl font-bold">
          Servicii & Prețuri
        </h1>

        <p className="mb-12 text-white/80">
          Prețuri corecte, fără surprize. Pentru orice problemă, sună sau scrie direct.
        </p>

        <div className="space-y-6 text-left">
          {/* SERVICE 1 */}
          <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
            <h2 className="text-xl font-semibold">
              Laptop / PC nu pornește
            </h2>
            <p className="mt-2 text-white/70">
              Diagnostic rapid + reparație hardware/software
            </p>
            <p className="mt-3 text-lg font-bold text-blue-400">
              de la 100 RON
            </p>
          </div>

          {/* SERVICE 2 */}
          <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
            <h2 className="text-xl font-semibold">
              Laptop lent / blocat
            </h2>
            <p className="mt-2 text-white/70">
              Curățare, optimizare și upgrade
            </p>
            <p className="mt-3 text-lg font-bold text-blue-400">
              de la 150 RON
            </p>
          </div>

          {/* SERVICE 3 */}
          <div className="rounded-2xl bg-white/5 p-6 border border-white/10">
            <h2 className="text-xl font-semibold">
              Instalare Windows + programe
            </h2>
            <p className="mt-2 text-white/70">
              Instalare completă + drivere + setup inițial
            </p>
            <p className="mt-3 text-lg font-bold text-blue-400">
              de la 150 RON
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="tel:+40757180250"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
          >
            📞 Sună acum
          </a>

          <a
            href="https://wa.me/40757180250"
            target="_blank"
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-700"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}