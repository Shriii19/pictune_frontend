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
    <div className="min-h-[calc(100vh-60px)] bg-slate-950 text-slate-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Your History</h1>
          <p className="text-slate-400 mt-2 text-sm">
            Past photos you&apos;ve uploaded and their detected moods.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center">
            {error}
          </div>
        ) : history.length === 0 ? (
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-12 text-center">
            <p className="text-slate-400">No history found. Upload a photo to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
              <HistoryCard key={item._id || item.id || Math.random()} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
