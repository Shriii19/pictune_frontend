import { useState, useRef, useEffect } from "react";
import { uploadPhoto } from "../services/api";

export default function Dashboard() {

  // Ensure device id exists
  useEffect(() => {
    if (!localStorage.getItem("device_id")) {
      localStorage.setItem("device_id", crypto.randomUUID());
    }
  }, []);

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [languageFilter, setLanguageFilter] = useState("all");

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!photo) return;

    const formData = new FormData();
    formData.append("photo", photo);

    setLoading(true);
    try {
      const data = await uploadPhoto(formData);
      setResult(data);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredSongs =
    result?.songs?.filter((song) => {
      if (languageFilter === "all") return true;
      return song.language?.toLowerCase() === languageFilter;
    }) || [];

  return (
    <div className="min-h-screen px-6 py-16 flex flex-col items-center relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-indigo-600/20 blur-[200px] rounded-full"/>
      <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-purple-600/20 blur-[200px] rounded-full"/>

      {/* HEADER */}
      <div className="text-center max-w-2xl mb-14">
        <h1 className="text-5xl font-extrabold text-white leading-tight">
          Turn any photo into
          <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            the perfect soundtrack
          </span>
        </h1>
        <p className="text-slate-400 mt-4">
          Upload an image and let AI detect the mood and suggest matching songs instantly.
        </p>
      </div>

      {/* UPLOAD CARD */}
      <div className="w-full max-w-xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">

        <div
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex flex-col items-center justify-center h-60 rounded-2xl border border-indigo-500/40 cursor-pointer overflow-hidden transition hover:bg-white/10"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-indigo-500/10 to-purple-500/10"/>

          {preview ? (
            <img
              src={preview}
              className="max-h-56 rounded-xl object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="text-center">
              <p className="text-slate-300 text-lg font-medium">
                Drop image or <span className="text-indigo-400">browse</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG up to 10MB
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

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={!photo || loading}
          className="mt-6 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-40"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-white rounded-full animate-bounce"/>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"/>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"/>
              </div>
              <span>AI analyzing your vibe…</span>
            </div>
          ) : "Detect Mood"}
        </button>
      </div>

      {/* RESULTS */}
      {result && (
        <div className="w-full max-w-xl mt-12 space-y-6 animate-fade-in">

          {/* MOOD CARD */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-slate-400 text-sm">Detected Mood</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
              {result.mood}
            </p>
          </div>

          {/* FILTER */}
          <div className="flex gap-2">
            {["all","hindi","english"].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguageFilter(lang)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                  languageFilter === lang
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* SONGS */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
            {filteredSongs.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">
                No songs for this language. Try another filter.
              </p>
            ) : (
              filteredSongs.map((song, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-white/10 text-white font-bold text-lg">
  {song.title?.charAt(0)?.toUpperCase() || "🎵"}
</div>
                    <div>
                      <p className="text-white text-sm font-medium">{song.title}</p>
                      <p className="text-xs text-slate-400">{song.language}</p>
                    </div>
                  </div>

                  {song.url && (
                    <a
                      href={song.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-400 text-sm hover:text-indigo-300"
                    >
                      ▶ Play
                    </a>
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      )}
    </div>
  );
}