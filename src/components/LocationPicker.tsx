import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export function LocationPicker({
  onSelect,
  defaultCenter = [51.505, -0.09], // London by default
  zoom = 13,
}: {
  onSelect: (latlng: [number, number]) => void;
  defaultCenter?: [number, number];
  zoom?: number;
}) {
  const [marker, setMarker] = useState<[number, number] | null>(null);

  function LocationMarker() {
    useMapEvents({
      click(e: any) {
        const { lat, lng } = e.latlng;
        const coords: [number, number] = [lat, lng];
        setMarker(coords);
        onSelect(coords);
      },
    });
    return marker ? <Marker position={marker} /> : null;
  }

  return (
    <MapContainer
      center={defaultCenter}
      zoom={zoom}
      className="rounded-xl shadow flex"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <LocationMarker />
    </MapContainer>
  );
}
