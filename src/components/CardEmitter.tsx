import { useState } from "react";
import { useSendLocation } from "../hooks/useSendLocation";


export const CardEmitter = () => {
  const [username, setUsername] = useState("");
  const [sent, setSent] = useState(false);

  const { start, stop, error } = useSendLocation(username, 5);

  const handleStart = () => {
    if (username.trim()) {
      start();
      setSent(true);
    } else {
      alert('Veuillez entrer un nom');
    }
  };

  const handleStop = () => {
    stop();
    setSent(false);
    setUsername("");
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <section className="bg-white p-5 rounded-xl shadow-xl min-w-[300px]">
        <div className="font-semibold mb-4">EMMETTEUR</div>
        <input
          type="text"
          className={`border rounded px-3 py-2 w-full mb-4 ${sent ? 'bg-gray-300 text-slate-200' : ''}`}
          placeholder="Entrez votre nom"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={sent}
        />
        <div className="flex justify-around items-center gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleStart}
            disabled={sent || username.trim() === ""}
          >
            Envoyer
          </button>
          {sent && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleStop}
            >
              Arrêter
            </button>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </section>
      
    </div>
  )
}
