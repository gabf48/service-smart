"use client";

import { useState } from "react";
import type { LatLng } from "./mapUtils";

export function useUserDistance(
  _place: LatLng | null,
  _setGeoError: React.Dispatch<React.SetStateAction<string | null>>
) {
  const [distanceKm] = useState<number | null>(null);

  return { distanceKm };
}