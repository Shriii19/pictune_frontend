import { useState, useEffect } from "react";
import { getHistory } from "../services/api";
import HistoryCard from "../components/HistoryCard";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 animate-slide-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Your History</h1>
            </div>
          </div>
          <p className="text-slate-400 text-sm ml-[52px]">
            Browse past photos and their detected moods &amp; song recommendations.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="spinner" />
            <p className="text-sm text-slate-500">Loading your history...</p>
          </div>
        ) : error ? (
          <div className="glass-card rounded-2xl p-6 text-center animate-slide-up">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/8 border border-red-500/20 mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        ) : history.length === 0 ? (
          <div className="glass-card rounded-2xl p-16 text-center animate-slide-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/4 border border-white/6 mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No history yet</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              Upload your first photo on the Dashboard to see your mood detection history here.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {history.length} {history.length === 1 ? "entry" : "entries"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
              {history.map((item) => (
                <HistoryCard key={item._id || item.id || Math.random()} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
