"use client";

import Link from "next/link";
import type { Service } from "../_types/services";

export function ServiceDetailsHeader({
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
    <div className="relative">
      <div className="h-44 sm:h-56 w-full overflow-hidden">
        {service.heroImage ? (
          <img
            src={service.heroImage}
            alt={service.title}
            className="h-full w-full object-cover opacity-80"
          />
        ) : (
          <div className="h-full w-full bg-white/10" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-gray-950/90" />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-2xl font-bold">{service.title}</h3>
            <p className="text-white/70">{service.short}</p>
          </div>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/contact?motivo=${service.ctaMotivo}`}>
            Contact
          </Link>

          <a href={`tel:${phoneE164}`}>Sună</a>
          <a href={`https://wa.me/${whatsappE164}`}>WhatsApp</a>
        </div>
      </div>
    </div>
  );
}