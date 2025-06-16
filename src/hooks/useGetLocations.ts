import { useState } from 'react';
import axios from 'axios';

interface LocationMessage {
  deviceId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export function useGetLocations() {
  const [locations, setLocations] = useState<LocationMessage[]>();
  const [loading, setLoading] = useState(false);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://grpc-server-fliz.onrender.com/locations');
      setLocations(res.data.locations);
    } catch (err) {
      console.error('Erreur récupération positions:', err);
    } finally {
      setLoading(false);
    }
  };

  return { locations, fetchLocations, loading };
}