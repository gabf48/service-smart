"use client";

export function MapOverlayCard({
  addressLabel,
  distanceKm,
  geoError,
  directionsHref,
  phoneTel,
  whatsappWa,
}: {
  addressLabel: string;
  distanceKm: number | null;
  geoError: string | null;
  directionsHref: string;
  phoneTel: string;
  whatsappWa: string;
}) {
  return (
    <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-auto md:w-[420px]">
      <div className="rounded-2xl border border-white/10 bg-black/55 p-4 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm text-white/70">Unde mă găsești</div>
            <div className="text-base font-semibold text-white">{addressLabel}</div>

            <div className="mt-2 text-sm text-white/75">
              {distanceKm !== null ? (
                <span>
                  Distanță estimată:{" "}
                  <span className="font-semibold text-white">
                    {distanceKm < 1
                      ? `${Math.round(distanceKm * 1000)} m`
                      : `${distanceKm.toFixed(1)} km`}
                  </span>
                </span>
              ) : (
                <span className="text-white/60">
                  {geoError || "Activează localizarea pentru distanță."}
                </span>
              )}
            </div>
          </div>

          <a
            href={directionsHref}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Direcții
          </a>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <a
            href={`tel:${phoneTel}`}
            className="rounded-xl border border-blue-500/30 bg-blue-600/20 px-3 py-2 text-center text-sm font-semibold text-white transition hover:border-blue-400/40 hover:bg-blue-600/30"
          >
            Sună
          </a>

          <a
            href={`https://wa.me/${whatsappWa}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-emerald-500/30 bg-emerald-600/20 px-3 py-2 text-center text-sm font-semibold text-white transition hover:border-emerald-400/40 hover:bg-emerald-600/30"
          >
            WhatsApp
          </a>

          <a
            href="/contact?motivo=Locatie%20si%20program"
            className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Mesaj
          </a>
        </div>
      </div>
    </div>
  );
}