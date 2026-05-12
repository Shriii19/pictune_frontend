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
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center px-6 py-16 text-slate-200">
      {/* Page Header */}
      <div className="text-center mb-12 animate-slide-up max-w-2xl">
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Analysis Studio
        </h1>
        <p className="text-purple-300 mt-4 text-sm uppercase tracking-widest font-bold">
          Upload. Analyze. Listen.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl editorial-card p-8 animate-slide-up">
        {/* Upload Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`drop-zone relative flex flex-col items-center justify-center w-full cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden ${
            dragOver
              ? "bg-white/10 border-purple-400"
              : preview
              ? "border-transparent bg-transparent p-0"
              : "bg-white/5 border-white/20 hover:border-purple-400/50 hover:bg-white/10"
          } ${!preview ? "h-64" : ""}`}
        >
          {preview ? (
            <div className="relative w-full group rounded-2xl overflow-hidden">
              <div className="bg-black/40 backdrop-blur-sm border border-white/10">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-96 object-contain rounded-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
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
              <div className="mb-4 text-purple-400">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-white">
                Select Image
              </p>
              <p className="text-xs text-purple-300/70 mt-2 font-medium uppercase tracking-wider">
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
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-[10px] font-bold text-purple-300 uppercase tracking-[0.2em] mb-3">
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
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 border rounded-xl ${
                  languageFilter === opt.key
                    ? "bg-purple-600/30 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "bg-white/5 border-white/10 text-slate-300 hover:border-purple-500/50 hover:text-white"
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
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 text-white p-8 border border-purple-500/30 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[10px] font-bold text-purple-300 uppercase tracking-[0.2em] mb-2">Primary Vibe</p>
                <p className="font-editorial text-4xl capitalize tracking-tight drop-shadow-md">{result.mood}</p>
              </div>
              <MusicBars className="text-pink-400" />
            </div>

            <div>
              <p className="text-[10px] font-bold text-purple-300 uppercase tracking-[0.2em] mb-3">Context Vectors</p>
              <div className="flex flex-wrap gap-2">
                {result.labels?.map((label, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider border border-white/20 text-purple-100 rounded-full bg-black/20"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Songs Card */}
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-slate-100">Curated Playlist</p>
                <p className="text-[10px] text-purple-300 uppercase tracking-wider mt-1">{filteredSongs.length} matches found</p>
              </div>
            </div>

            {filteredSongs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No tracks available in selected language.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSongs.map((song, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-white/5 border border-white/10 p-4 hover:border-purple-500/50 hover:bg-white/10 transition-all rounded-xl group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-8 h-8 flex items-center justify-center font-editorial text-purple-400 group-hover:text-pink-400 transition-colors shrink-0 bg-black/20 rounded-full">
                        0{idx + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-slate-100 truncate">{song.title}</p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{song.artist} • <span className="uppercase text-[10px] tracking-wider font-bold text-purple-300">{song.language}</span></p>
                      </div>
                    </div>
                    {song.url && (
                      <a
                         href={song.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="btn-secondary text-[10px] py-1.5 px-3 shrink-0 ml-4 hover:bg-purple-600 hover:text-white"
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
