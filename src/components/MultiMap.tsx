import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type Point = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

interface MultiMapProps {
  points: Point[];
}

const MultiMap = ({ points }: MultiMapProps) => {
  if (!points.length) return null;
  const center: [number, number] = [points[0].lat, points[0].lng];

  return (
    <MapContainer center={center} zoom={14} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      {points.map((point) => (
        <Marker key={point.id} position={[point.lat, point.lng]}>
          <Popup>{point.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MultiMap;
