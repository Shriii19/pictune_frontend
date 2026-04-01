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
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center px-4 sm:px-6 py-10 md:py-14">
      <div className="text-center mb-10 animate-slide-up max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/8 border border-violet-500/20 text-violet-300 text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Your Activity
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Mood <span className="gradient-text">History</span>
        </h1>
        <p className="text-slate-400 mt-3 text-base max-w-lg mx-auto">
          Browse your previous mood detections and song recommendations.
        </p>
      </div>

      <div className="w-full max-w-3xl">
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="w-8 h-8 border-2 border-white/20 border-t-indigo-400 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        ) : history.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-slate-500 text-sm">No history yet. Upload a photo to get started!</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {history.map((item, i) => (
              <HistoryCard key={i} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
