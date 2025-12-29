"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

/* Fix marker icon */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const POSITION: [number, number] = [-15.395245, 28.266816];
const ADDRESS =
  "Plot No. 4298 Corner Lumumba Rd & Buyantanshi Rd, Lusaka, Zambia";

export default function LocationMap() {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    await navigator.clipboard.writeText(ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border h-[320px]">
      <MapContainer
        center={POSITION}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={POSITION}>
          <Popup>
            <strong>Premier Scales</strong>
            <br />
            {ADDRESS}
          </Popup>
        </Marker>
      </MapContainer>

      {/* Copy Address */}
      <button
        onClick={copyAddress}
        className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-gray-800 shadow hover:bg-gray-100 transition"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-green-600" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy Address
          </>
        )}
      </button>
    </div>
  );
}
