"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useGeocodedPlace } from "./home-map/useGeocodedPlace";
import { useUserDistance } from "./home-map/useUserDistance";
import { FALLBACK_COORDS } from "./home-map/mapUtils";
import { MapOverlayCard } from "./home-map/MapOverlayCard";

type Props = {
  addressQuery: string;
  addressLabel: string;
  phoneTel: string;
  whatsappWa: string;
};

export default function HomeMap({
  addressQuery,
  addressLabel,
  phoneTel,
  whatsappWa,
}: Props) {
  const { place, geoError, setGeoError } = useGeocodedPlace(addressQuery);
  const { distanceKm } = useUserDistance(place, setGeoError);

  const pinIcon = useMemo(
    () =>
      L.divIcon({
        html: `<div style="width:34px;height:34px;border-radius:999px;background:rgba(59,130,246,.20);border:1px solid rgba(59,130,246,.45);display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 6px rgba(59,130,246,.10),0 0 24px rgba(59,130,246,.25)"><div style="width:10px;height:10px;border-radius:999px;background:rgba(59,130,246,1);box-shadow:0 0 16px rgba(59,130,246,.9)"></div></div>`,
        className: "custom-pin",
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      }),
    []
  );

  const center: [number, number] = place
    ? [place.lat, place.lon]
    : [FALLBACK_COORDS.lat, FALLBACK_COORDS.lon];

  const directionsHref = place
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        `${place.lat},${place.lon}`
      )}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressQuery)}`;

  return (
    <div className="relative">
      <MapContainer center={center} zoom={place ? 15 : 12} scrollWheelZoom={false} className="h-[460px] w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors &copy; CARTO"
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

      <MapOverlayCard
        addressLabel={addressLabel}
        distanceKm={distanceKm}
        geoError={geoError}
        directionsHref={directionsHref}
        phoneTel={phoneTel}
        whatsappWa={whatsappWa}
      />

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