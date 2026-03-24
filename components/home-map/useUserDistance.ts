"use client";

import { useEffect, useState } from "react";
import { haversineKm, type LatLng } from "./mapUtils";

export function useUserDistance(
  place: LatLng | null,
  setGeoError: React.Dispatch<React.SetStateAction<string | null>>
) {
  const [distanceKm, setDistanceKm] = useState<number | null>(null);

  useEffect(() => {
    if (!place) return;

    if (!("geolocation" in navigator)) {
      setGeoError((p) => p ?? "Browser-ul nu suportă localizarea.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const user = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setDistanceKm(haversineKm(user, place));
      },
      (err) => {
        setDistanceKm(null);
        setGeoError(
          (p) =>
            p ??
            (err.code === 1
              ? "Permisiunea de localizare a fost refuzată."
              : "Localizarea nu este disponibilă.")
        );
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  }, [place, setGeoError]);

  return { distanceKm };
}