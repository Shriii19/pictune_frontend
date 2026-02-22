export default function HistoryCard({ item }) {
  const { mood, labels, songs, createdAt } = item;
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = new Date(createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col h-full animate-slide-up group hover:-translate-y-0.5 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Mood
          </p>
          <p className="text-xl font-bold gradient-text">{mood}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-slate-400">{date}</p>
          <p className="text-xs text-slate-600 mt-0.5">{time}</p>
        </div>
      </div>

      {/* Labels */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
          Labels
        </p>
        <div className="flex flex-wrap gap-1.5">
          {labels?.map((label, idx) => (
            <span
              key={idx}
              className="label-badge px-2.5 py-1 rounded-lg text-xs font-medium text-indigo-200/80"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Songs */}
      <div className="mt-auto pt-4 border-t border-white/4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
          Songs
        </p>
        {songs?.length === 0 ? (
          <p className="text-xs text-slate-600">No songs suggested.</p>
        ) : (
          <div className="space-y-1.5">
            {songs?.slice(0, 3).map((song, idx) => (
              <div
                key={idx}
                className="song-item flex justify-between items-center bg-white/2 border border-white/4 rounded-lg px-3 py-2"
              >
                <div className="min-w-0 mr-2">
                  <p className="font-medium text-sm text-white truncate">
                    {song.title}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {song.artist} <span className="text-slate-700">•</span> {song.language}
                  </p>
                </div>
                {song.url && (
                  <a
                    href={song.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 w-7 h-7 rounded-lg bg-indigo-500/8 border border-indigo-500/15 flex items-center justify-center text-indigo-400 hover:bg-indigo-500/15 hover:text-indigo-300 transition-colors"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
            {songs?.length > 3 && (
              <p className="text-xs text-slate-600 text-center pt-1">
                + {songs.length - 3} more
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
