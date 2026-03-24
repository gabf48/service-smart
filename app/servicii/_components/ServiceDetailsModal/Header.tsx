"use client";

import Link from "next/link";
import type { Service } from "../../_types/services";

export function Header({
  service,
  phoneE164,
  whatsappE164,
  onClose,
}: {
  service: Service;
  phoneE164: string;
  whatsappE164: string;
  onClose: () => void;
}) {
  return (
    <div className="border-b border-white/10 p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-white/60">Detalii serviciu</div>
          <h3 className="mt-1 text-2xl font-bold sm:text-3xl">{service.title}</h3>
          <p className="mt-2 text-white/70">{service.short}</p>
        </div>

        <button
          onClick={onClose}
          className="rounded-xl bg-white/10 px-3 py-2 transition hover:bg-white/20"
          aria-label="Închide"
        >
          ✕
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className="rounded-full bg-white/10 px-3 py-1 text-xs">
          de la {service.priceFrom} RON
        </div>

        <Link
          href={`/contact?motivo=${encodeURIComponent(service.ctaMotivo)}`}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-700"
        >
          Contact
        </Link>

        <a
          href={`tel:${phoneE164}`}
          className="rounded-xl bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
        >
          Sună
        </a>

        <a
          href={`https://wa.me/${whatsappE164}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-green-600/20 px-4 py-2 text-sm transition hover:bg-green-600/30"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}