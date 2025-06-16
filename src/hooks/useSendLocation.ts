import { useCallback, useRef } from 'react';
import axios from 'axios';

export function useSendLocation(deviceId: string, intervalSec = 20) {
  const intervalRef = useRef<number | null>(null);

  const send = useCallback(async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const { latitude, longitude } = position.coords;

      const payload = {
        deviceId,
        latitude,
        longitude,
        timestamp: new Date().toISOString(),
      };

      console.log(payload);
      await axios.post('https://grpc-server-fliz.onrender.com/locations', payload);
      console.log('Position envoyée');
    } catch (err: any) {
      console.error('Erreur envoi position:', err);
    }
  }, [deviceId]);

  const start = useCallback(() => {
    if (intervalRef.current) return;
    send();
    intervalRef.current = setInterval(send, intervalSec * 1000);
  }, [send, intervalSec]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log('Arrêt de l\'envoi des positions');
    }
  }, []);

  return { stop, start};
}