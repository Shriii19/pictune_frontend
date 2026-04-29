import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { getHistory } from "../services/api";
import HistoryCard from "../components/HistoryCard";

export default function History() {
  const { token } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    getHistory()
      .then((data) => setHistory(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to fetch history"))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center px-6 py-16 bg-[#FAFAFA] text-[#111111]">
      <div className="text-center mb-12 animate-slide-up max-w-2xl">
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
          Analysis Archive
        </h1>
        <p className="text-[#666666] mt-4 text-sm uppercase tracking-widest font-bold">
          Your historical mood vectors.
        </p>
      </div>

      <div className="w-full max-w-4xl">
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="font-editorial text-xl animate-pulse">Loading Archive...</span>
          </div>
        ) : error ? (
          <div className="bg-white border border-[#FF3B30] p-8 text-center">
            <p className="text-[#FF3B30] text-sm font-bold uppercase tracking-widest">{error}</p>
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white border border-[#E5E5EA] p-12 text-center shadow-sm">
            <p className="text-[#888888] text-xs font-bold uppercase tracking-widest">No entries found. Upload an image to generate data.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {history.map((item, i) => (
              <HistoryCard key={i} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
