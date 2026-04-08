"use client";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black px-4 py-20 text-white">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-6 text-4xl font-bold">
          Contact rapid
        </h1>

        <p className="mb-10 text-white/80">
          Ai o problemă cu laptopul sau PC-ul? Scrie sau sună direct.
          Răspund rapid.
        </p>

        <div className="flex flex-col gap-4">
          <a
            href="tel:+40746263481"
            className="rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold hover:bg-blue-700"
          >
            📞 Sună: +40 746 263 481
          </a>

          <a
            href="https://wa.me/40746263481"
            target="_blank"
            className="rounded-xl bg-green-600 px-6 py-4 text-lg font-semibold hover:bg-green-700"
          >
            💬 WhatsApp
          </a>
        </div>

        <p className="mt-10 text-sm text-white/60">
          📍 Cluj-Napoca – intervenții rapide
        </p>
      </div>
    </div>
  );
}