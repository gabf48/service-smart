"use client";

import { useEffect } from "react";
import type { Service } from "../../_types/services";
import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";

export function ServiceDetailsModal({
  active,
  phoneE164,
  phoneDisplay,
  whatsappE164,
  onClose,
}: {
  active: Service | null;
  phoneE164: string;
  phoneDisplay: string;
  whatsappE164: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!active) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, onClose]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[80]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md animate-modal-backdrop" />

      <div className="relative mx-auto flex min-h-dvh max-w-4xl items-center px-4 py-8">
        <div className="max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-white/10 bg-gray-950/95 shadow-2xl animate-modal-panel">
          <Header
            service={active}
            phoneE164={phoneE164}
            whatsappE164={whatsappE164}
            onClose={onClose}
          />

          <Content service={active} />

          <Footer phoneDisplay={phoneDisplay} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}