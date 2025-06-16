import { ChevronDown, ChevronUp, MapPinned } from "lucide-react";
import { useState } from "react";
import { useGetLocations } from "../hooks/useGetLocations";
import MultiMap from "../components/MultiMap";

export const ReceiverPage = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { locations, fetchLocations, loading } = useGetLocations();

  const handleGetLocations = () => {
    fetchLocations();
  };

  const toggleExpand = (idx: number) => {
    setExpanded(expanded === idx ? null : idx);
  };

  return (
    <div className="h-screen w-screen bg-gray-300 flex flex-col items-center">
      <section className="bg-white p-5 rounded-xl shadow-xl min-w-[350px] mt-10">
        <div className="flex flex-col justify-center">
          <p className="font-semibold text-lg mb-4 text-center">RECEIVER</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-6 disabled:opacity-50"
            onClick={handleGetLocations}
            disabled={loading}
          >
            {loading ? "Chargement..." : "Get les locations"}
          </button>
        </div>
        
        <div>
          {locations?.map((loc, idx) => (
            <div key={idx} className="mb-3 rounded-xl shadow overflow-hidden">
              <div
                className="flex gap-2 items-center px-4 py-2 cursor-pointer bg-gray-100"
                onClick={() => toggleExpand(idx)}
              >
                {expanded === idx ? <ChevronDown /> : <ChevronUp />}
                <div className="flex justify-around items-center w-full">
                  <div className="font-bold">{loc.deviceId}</div>
                  <div className="text-sm">{loc.timestamp}</div>
                </div>
              </div>
              {expanded === idx && (
                <div className="px-4 py-2 bg-gray-50 flex gap-5 items-center">
                  <MapPinned />
                  <div>
                    <div><b>Latitude :</b> {loc.latitude}</div>
                    <div><b>Longitude :</b> {loc.longitude}</div>
                  </div>
                  
                </div>
              )}
            </div>
          ))}
          {locations?.length === 0 && !loading && (
            <div className="text-gray-400 text-center mt-4">Aucune position reçue.</div>
          )}
        </div>

        <div>
          {locations && locations.length > 0 && (
            <div className="mt-6">
              <MultiMap
                points={locations.map((loc: any, idx: number) => ({
                  id: loc.deviceId || String(idx),
                  name: loc.deviceId || `Device ${idx + 1}`,
                  lat: loc.latitude,
                  lng: loc.longitude,
                }))}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
