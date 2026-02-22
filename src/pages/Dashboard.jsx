import { useState, useRef } from "react";
import { uploadPhoto } from "../services/api";

export default function Dashboard() {
  const [languageFilter, setLanguageFilter] = useState("all");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

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

    const formData = new FormData();
    formData.append("photo", photo);

    setLoading(true);
    setResult(null);

    try {
      const data = await uploadPhoto(formData);
      setResult(data);
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
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center px-4 sm:px-6 py-10 md:py-14">
      {/* Page Header */}
      <div className="text-center mb-10 animate-slide-up max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/8 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          AI-Powered Mood Detection
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Upload a photo,<br />
          <span className="gradient-text">discover the mood</span>
        </h1>
        <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
          Let AI analyze your photo&apos;s mood and recommend the perfect songs to match the vibe.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl glass-card rounded-2xl p-6 md:p-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        {/* Upload Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`drop-zone relative flex flex-col items-center justify-center w-full rounded-xl cursor-pointer border-2 border-dashed transition-all duration-300 ${
            dragOver
              ? "border-indigo-400 bg-indigo-500/6"
              : preview
              ? "border-transparent bg-transparent p-0"
              : "border-white/8 bg-white/2 hover:border-indigo-500/30 hover:bg-white/4"
          } ${!preview ? "h-48 md:h-56" : ""}`}
        >
          {preview ? (
            <div className="relative w-full group">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-72 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={(e) => { e.stopPropagation(); clearPhoto(); }}
                  className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  Remove & Upload New
                </button>
              </div>
              {/* File name badge */}
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-xs text-white/80 font-medium">
                {photo?.name}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/8 border border-indigo-500/15 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p className="text-sm text-slate-300 font-medium">
                Drop your image here, or <span className="text-indigo-400">browse</span>
              </p>
              <p className="text-xs text-slate-500 mt-1.5">
                Supports PNG, JPG, JPEG up to 10MB
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
        <div className="mt-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Song Language
          </p>
          <div className="flex gap-2">
            {[
              { key: "all", label: "All Languages" },
              { key: "hindi", label: "Hindi" },
              { key: "english", label: "English" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setLanguageFilter(opt.key)}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  languageFilter === opt.key
                    ? "bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 shadow-lg shadow-indigo-500/10"
                    : "bg-white/3 border border-white/6 text-slate-400 hover:bg-white/6 hover:text-slate-300"
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
          className={`gradient-btn mt-6 w-full py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
            !photo ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading || !photo}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2.5">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing your photo...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Detect Mood
            </span>
          )}
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <div className="w-full max-w-2xl mt-8 space-y-6 animate-slide-up">
          {/* Mood Card */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Detected Mood</p>
                <p className="text-3xl font-bold gradient-text">{result.mood}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">AI Labels</p>
              <div className="flex flex-wrap gap-2">
                {result.labels?.map((label, idx) => (
                  <span
                    key={idx}
                    className="label-badge px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-200"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Songs Card */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500/20 to-pink-500/20 border border-violet-500/20 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Suggested Songs</p>
                  <p className="text-xs text-slate-500">{filteredSongs.length} tracks found</p>
                </div>
              </div>
            </div>

            {filteredSongs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-slate-500">No songs for this language filter. Try &quot;All Languages&quot;.</p>
              </div>
            ) : (
              <div className="space-y-2 stagger-children">
                {filteredSongs.map((song, idx) => (
                  <div
                    key={idx}
                    className="song-item flex items-center justify-between bg-white/2 border border-white/6 rounded-xl px-4 py-3 animate-slide-up"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-linear-to-br from-indigo-500/15 to-violet-500/15 border border-indigo-500/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-indigo-300">{idx + 1}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-white truncate">{song.title}</p>
                        <p className="text-xs text-slate-400 truncate">{song.artist} <span className="text-slate-600">•</span> {song.language}</p>
                      </div>
                    </div>
                    {song.url && (
                      <a
                        href={song.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 ml-3 px-3.5 py-1.5 rounded-lg bg-indigo-500/8 border border-indigo-500/20 text-indigo-300 text-xs font-medium hover:bg-indigo-500/15 hover:text-indigo-200 transition-all duration-200"
                      >
                        <span className="flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          Listen
                        </span>
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
