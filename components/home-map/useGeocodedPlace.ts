"use client";

import { useEffect, useState } from "react";
import { FALLBACK_COORDS, type LatLng } from "./mapUtils";

export function useGeocodedPlace(addressQuery: string) {
  const [place, setPlace] = useState<LatLng | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function geocode() {
      try {
        setGeoError(null);

        const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
          addressQuery
        )}`;

        const res = await fetch(url, {
          headers: { Accept: "application/json" },
        });

        if (!res.ok) throw new Error("Geocoding failed");

        const json = (await res.json()) as Array<{ lat: string; lon: string }>;
        if (!json?.[0]) throw new Error("No results");

        const lat = Number(json[0].lat);
        const lon = Number(json[0].lon);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
          throw new Error("Invalid coords");
        }

        if (!cancelled) setPlace({ lat, lon });
      } catch {
        if (cancelled) return;
        setGeoError("Nu am putut încărca harta pentru adresă (fallback).");
        setPlace(FALLBACK_COORDS);
      }
    }

    geocode();
    return () => {
      cancelled = true;
    };
  }, [addressQuery]);

  return { place, geoError, setGeoError };
}