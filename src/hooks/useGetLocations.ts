import { useState } from 'react';
import axios from 'axios';

interface LocationMessage {
  deviceId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface Response{
  locations: LocationMessage[]
}

export function useGetLocations() {
  const [locations, setLocations] = useState<LocationMessage[]>();
  const [loading, setLoading] = useState(false);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/locations');
      setLocations(res.data.locations);
    } catch (err) {
      console.error('Erreur récupération positions:', err);
    } finally {
      setLoading(false);
    }
  };

  return { locations, fetchLocations, loading };
}