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
    <div className="bg-white border border-[#E5E5EA] p-6 flex flex-col h-full animate-slide-up group hover:border-[#111111] transition-all duration-300 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em] mb-1.5">
            Primary Vibe
          </p>
          <p className="font-editorial text-2xl capitalize text-[#111111]">{mood}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#111111]">{date}</p>
          <p className="text-[10px] text-[#888888] uppercase tracking-widest mt-0.5 font-bold">{time}</p>
        </div>
      </div>

      {/* Labels */}
      <div className="mb-6">
        <p className="text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em] mb-2.5">
          Context Vectors
        </p>
        <div className="flex flex-wrap gap-1.5">
          {labels?.map((label, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 border border-[#E5E5EA] text-[10px] font-bold uppercase tracking-wider text-[#666666] bg-[#FAFAFA]"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Songs */}
      <div className="mt-auto pt-5 border-t border-[#E5E5EA]">
        <p className="text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em] mb-3">
          Curated Playlist
        </p>
        {songs?.length === 0 ? (
          <p className="text-xs text-[#888888] font-bold uppercase tracking-widest">No tracks suggested.</p>
        ) : (
          <div className="space-y-2">
            {songs?.slice(0, 3).map((song, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-[#FAFAFA] border border-[#E5E5EA] px-4 py-3 group-hover:border-[#111111] transition-colors"
              >
                <div className="min-w-0 mr-4">
                  <p className="font-bold text-sm text-[#111111] truncate">
                    {song.title}
                  </p>
                  <p className="text-[10px] text-[#666666] truncate uppercase tracking-wider font-bold mt-0.5">
                    {song.artist} <span className="text-[#E5E5EA] mx-1">•</span> {song.language}
                  </p>
                </div>
                {song.url && (
                  <a
                    href={song.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-[10px] py-1 px-2 shrink-0 ml-auto border-[#E5E5EA]"
                  >
                    Listen
                  </a>
                )}
              </div>
            ))}
            {songs?.length > 3 && (
              <p className="text-[10px] text-[#888888] text-center pt-2 font-bold uppercase tracking-widest">
                + {songs.length - 3} additional tracks
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
