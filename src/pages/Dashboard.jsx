import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadPhoto } from "../services/api";
import { useAuth } from "../hooks/useAuth.jsx";

/* ── Waveform bars for mood display ─────────────────────── */
function MusicBars({ className = "" }) {
  return (
    <span className={`music-bars ${className}`} aria-hidden="true">
      <span /><span /><span /><span /><span />
    </span>
  );
}

export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [languageFilter, setLanguageFilter] = useState("all");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const [guestCount, setGuestCount] = useState(
    Number(localStorage.getItem("guest_count")) || 0
  );

  useEffect(() => {
    const saved = localStorage.getItem("last_result");
    if (saved) {
      try { setResult(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleSubmit = async () => {
    if (!photo) return;

    if (!token && guestCount >= 3) {
      alert("Please signup to continue");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    setLoading(true);
    setResult(null);

    try {
      const data = await uploadPhoto(formData);
      setResult(data);
      localStorage.setItem("last_result", JSON.stringify(data));

      if (!token) {
        const newCount = guestCount + 1;
        setGuestCount(newCount);
        localStorage.setItem("guest_count", String(newCount));
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredSongs =
    result?.songs?.filter((song) => {
      if (languageFilter === "all") return true;
      return song.language?.toLowerCase() === languageFilter;
    }) || [];

  const clearPhoto = () => {
    setPhoto(null);
    setPreview("");
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center px-6 py-16 bg-[#FAFAFA] text-[#111111]">
      {/* Page Header */}
      <div className="text-center mb-12 animate-slide-up max-w-2xl">
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
          Analysis Studio
        </h1>
        <p className="text-[#666666] mt-4 text-sm uppercase tracking-widest font-bold">
          Upload. Analyze. Listen.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white border border-[#E5E5EA] p-8 animate-slide-up shadow-sm">
        {/* Upload Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`drop-zone relative flex flex-col items-center justify-center w-full cursor-pointer border border-[#E5E5EA] transition-all duration-300 ${
            dragOver
              ? "bg-[#F2F2F7] border-[#111111]"
              : preview
              ? "border-transparent bg-transparent p-0"
              : "bg-[#FAFAFA] hover:border-[#111111]"
          } ${!preview ? "h-64" : ""}`}
        >
          {preview ? (
            <div className="relative w-full group">
              <div className="overflow-hidden bg-[#F2F2F7] border border-[#E5E5EA]">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-96 object-contain"
                />
              </div>
              <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <button
                  onClick={(e) => { e.stopPropagation(); clearPhoto(); }}
                  className="btn-primary text-xs"
                >
                  Remove Image
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center px-4">
              <div className="mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#111111]">
                Select Image
              </p>
              <p className="text-xs text-[#888888] mt-2 font-medium uppercase tracking-wider">
                JPG, PNG. Max 10MB.
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Language Filter */}
        <div className="mt-8 border-t border-[#E5E5EA] pt-6">
          <p className="text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em] mb-3">
            Target Language
          </p>
          <div className="flex gap-3">
            {[
              { key: "all", label: "Global" },
              { key: "hindi", label: "Hindi" },
              { key: "english", label: "English" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setLanguageFilter(opt.key)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                  languageFilter === opt.key
                    ? "bg-[#111111] border-[#111111] text-[#FAFAFA]"
                    : "bg-[#FAFAFA] border-[#E5E5EA] text-[#666666] hover:border-[#111111] hover:text-[#111111]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="btn-primary mt-6 w-full py-4 text-sm"
          disabled={loading || !photo}
        >
          {loading ? "Processing Analysis..." : "Execute Detection"}
        </button>
      </div>

      {/* Guest limit warning */}
      {!token && guestCount >= 3 && (
        <div className="w-full max-w-2xl mt-6 bg-[#FAFAFA] border border-[#111111] p-5 text-center">
          <p className="text-[#111111] text-sm font-bold uppercase tracking-widest">
            Limit Reached. Registration Required.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="btn-primary mt-4 text-xs"
          >
            Create Account
          </button>
        </div>
      )}

      {/* Results Section */}
      {result && (
        <div className="w-full max-w-2xl mt-8 space-y-6 animate-slide-up">
          {/* Mood Card */}
          <div className="bg-[#111111] text-[#FAFAFA] p-8 border border-[#111111]">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em] mb-2">Primary Vibe</p>
                <p className="font-editorial text-4xl capitalize tracking-tight">{result.mood}</p>
              </div>
              <MusicBars className="text-[#FAFAFA]" />
            </div>

            <div>
              <p className="text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em] mb-3">Context Vectors</p>
              <div className="flex flex-wrap gap-2">
                {result.labels?.map((label, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider border border-[#333333] text-[#CCCCCC]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Songs Card */}
          <div className="bg-white border border-[#E5E5EA] p-8">
            <div className="flex items-center justify-between mb-6 border-b border-[#E5E5EA] pb-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#111111]">Curated Playlist</p>
                <p className="text-[10px] text-[#888888] uppercase tracking-wider mt-1">{filteredSongs.length} matches found</p>
              </div>
            </div>

            {filteredSongs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xs font-bold text-[#888888] uppercase tracking-widest">No tracks available in selected language.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSongs.map((song, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-[#FAFAFA] border border-[#E5E5EA] p-4 hover:border-[#111111] transition-colors group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-8 h-8 flex items-center justify-center font-editorial text-[#888888] group-hover:text-[#111111] transition-colors shrink-0">
                        0{idx + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-[#111111] truncate">{song.title}</p>
                        <p className="text-xs text-[#666666] truncate mt-0.5">{song.artist} • <span className="uppercase text-[10px] tracking-wider font-bold">{song.language}</span></p>
                      </div>
                    </div>
                    {song.url && (
                      <a
                        href={song.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-[10px] py-1.5 px-3 shrink-0 ml-4 border-[#E5E5EA] hover:border-[#111111]"
                      >
                        Listen
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
