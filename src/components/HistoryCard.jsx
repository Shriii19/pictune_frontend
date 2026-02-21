export default function HistoryCard({ item }) {
  const { mood, labels, songs, createdAt } = item;
  const date = new Date(createdAt).toLocaleString();

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-xl p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
            Detected Mood
          </h3>
          <p className="mt-1 text-xl font-bold text-indigo-300">{mood}</p>
        </div>
        <span className="text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded-md border border-slate-800">
          {date}
        </span>
      </div>

      <div className="mb-4">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
          Labels
        </h4>
        <div className="flex flex-wrap gap-2">
          {labels?.map((label, idx) => (
            <span
              key={idx}
              className="px-2 py-1 rounded-full text-xs bg-slate-800 text-slate-200 border border-slate-700"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
          Suggested Songs
        </h4>
        {songs?.length === 0 ? (
          <p className="text-xs text-slate-500">No songs suggested.</p>
        ) : (
          <ul className="space-y-2">
            {songs?.slice(0, 3).map((song, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm"
              >
                <div className="truncate mr-2">
                  <p className="font-semibold text-slate-100 truncate">
                    {song.title}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {song.artist} • {song.language}
                  </p>
                </div>
                {song.url && (
                  <a
                    href={song.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 text-xs font-medium whitespace-nowrap"
                  >
                    Listen
                  </a>
                )}
              </li>
            ))}
            {songs?.length > 3 && (
              <li className="text-xs text-slate-500 text-center pt-1">
                + {songs.length - 3} more songs
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
