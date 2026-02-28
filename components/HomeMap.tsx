// app/home/_components/HomeMap.tsx
"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type Props = {
  addressQuery: string;
  addressLabel: string;
  phoneTel: string;
  whatsappWa: string;
};

type LatLng = { lat: number; lon: number };

function haversineKm(a: LatLng, b: LatLng) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(s));
}

export default function HomeMap({ addressQuery, addressLabel, phoneTel, whatsappWa }: Props) {
  const [place, setPlace] = useState<LatLng | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  // Custom pin (divIcon) – subtle glow
  const pinIcon = useMemo(() => {
    const html = `
      <div style="
        width: 34px; height: 34px;
        border-radius: 999px;
        background: rgba(59,130,246,0.20);
        border: 1px solid rgba(59,130,246,0.45);
        display:flex; align-items:center; justify-content:center;
        box-shadow: 0 0 0 6px rgba(59,130,246,0.10), 0 0 24px rgba(59,130,246,0.25);
      ">
        <div style="
          width: 10px; height: 10px;
          border-radius: 999px;
          background: rgba(59,130,246,1);
          box-shadow: 0 0 16px rgba(59,130,246,0.9);
        "></div>
      </div>
    `;
    return L.divIcon({
      html,
      className: "custom-pin",
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });
  }, []);

  // 1) Geocode address via Nominatim (no key)
  useEffect(() => {
    let cancelled = false;

    async function geocode() {
      try {
        setGeoError(null);
        const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
          addressQuery
        )}`;
        const res = await fetch(url, {
          headers: {
            // Nominatim best practice: identify your app (simple UA)
            "Accept": "application/json",
          },
        });
        if (!res.ok) throw new Error("Geocoding failed");
        const json = (await res.json()) as Array<{ lat: string; lon: string }>;
        if (!json?.[0]) throw new Error("No results");
        const lat = Number(json[0].lat);
        const lon = Number(json[0].lon);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) throw new Error("Invalid coords");
        if (!cancelled) setPlace({ lat, lon });
      } catch {
        if (!cancelled) {
          setGeoError("Nu am putut încărca harta pentru adresă (fallback).");
          // fallback: Cluj-Napoca center-ish
          setPlace({ lat: 46.7712, lon: 23.6236 });
        }
      }
    }

    geocode();
    return () => {
      cancelled = true;
    };
  }, [addressQuery]);

  // 2) Get user location to compute distance
  useEffect(() => {
    if (!place) return;

    if (!("geolocation" in navigator)) {
      setGeoError((p) => p ?? "Browser-ul nu suportă localizarea.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const user = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        const km = haversineKm(user, place);
        setDistanceKm(km);
      },
      (err) => {
        // silent-ish: distance becomes unavailable; show small hint
        setDistanceKm(null);
        setGeoError((p) => p ?? (err.code === 1 ? "Permisiunea de localizare a fost refuzată." : "Localizarea nu este disponibilă."));
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 }
    );
  }, [place]);

  const center: [number, number] = place ? [place.lat, place.lon] : [46.7712, 23.6236];

  const directionsHref = place
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        `${place.lat},${place.lon}`
      )}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressQuery)}`;

  return (
    <div className="relative">
      <MapContainer
        center={center}
        zoom={place ? 15 : 12}
        scrollWheelZoom={false}
        className="h-[460px] w-full"
      >
        {/* Dark theme tiles (CartoDB DarkMatter) */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {place && (
          <Marker position={[place.lat, place.lon]} icon={pinIcon}>
            <Popup>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Service Smart</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>{addressLabel}</div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Overlay info card */}
      <div className="absolute left-5 right-5 bottom-5 md:left-6 md:right-auto md:bottom-6 md:w-[420px]">
        <div className="rounded-2xl border border-white/10 bg-black/55 backdrop-blur-xl p-4 shadow-2xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm text-white/70">Unde mă găsești</div>
              <div className="text-base font-semibold text-white">{addressLabel}</div>

              <div className="mt-2 text-sm text-white/75">
                {distanceKm !== null ? (
                  <span>
                    Distanță estimată:{" "}
                    <span className="font-semibold text-white">
                      {distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1)} km`}
                    </span>
                  </span>
                ) : (
                  <span className="text-white/60">
                    {geoError ? geoError : "Activează localizarea pentru distanță."}
                  </span>
                )}
              </div>
            </div>

            <a
              href={directionsHref}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15 transition"
            >
              Direcții
            </a>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <a
              href={`tel:${phoneTel}`}
              className="rounded-xl bg-blue-600/20 border border-blue-500/30 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600/30 hover:border-blue-400/40 transition text-center"
            >
              Sună
            </a>
            <a
              href={`https://wa.me/${whatsappWa}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600/20 border border-emerald-500/30 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600/30 hover:border-emerald-400/40 transition text-center"
            >
              WhatsApp
            </a>
            <a
              href="/contact?motivo=Locatie%20si%20program"
              className="rounded-xl bg-white/10 border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15 transition text-center"
            >
              Mesaj
            </a>
          </div>
        </div>
      </div>

      {/* Small CSS to remove leaflet default focus outline + keep it clean */}
      <style jsx global>{`
        .leaflet-container {
          background: #0b0f17;
          outline: none;
        }
        .leaflet-control-attribution {
          opacity: 0.6;
        }
        .custom-pin {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
}