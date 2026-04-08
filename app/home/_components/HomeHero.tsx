"use client";

export function HomeHero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="absolute inset-0">
        <img
          src="/space.gif"
          alt="Space background"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
      </div>

      <div className="relative z-10 max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">
          Reparații laptop & PC în Cluj – rapid, corect și fără bătăi de cap
        </h1>

        <p className="mb-10 text-lg text-white/80 sm:text-xl">
          Probleme cu laptopul, PC-ul sau rețeaua? Le rezolv rapid, la tine sau remote.
          Fără pierdere de timp, fără complicații.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="tel:+40746263481"
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold shadow-xl transition hover:bg-blue-700"
          >
            📞 Sună acum
          </a>

          <a
            href="/contact"
            className="rounded-xl bg-green-600 px-8 py-3 font-semibold shadow-xl transition hover:bg-green-700"
          >
            💬 Contact rapid
          </a>
        </div>
      </div>
    </section>
  );
}