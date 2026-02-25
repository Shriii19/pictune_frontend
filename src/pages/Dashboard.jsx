import { useState, useRef, useEffect } from "react";
import { uploadPhoto } from "../services/api";

export default function Dashboard() {

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
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
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
    <div className="min-h-screen flex flex-col items-center px-4 py-12">

      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        Upload a photo<br/>
        <span className="text-indigo-400">discover the mood</span>
      </h1>

      {/* Upload */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-full max-w-xl h-56 rounded-xl border-2 border-dashed border-indigo-500/30 flex items-center justify-center cursor-pointer bg-white/5 hover:bg-white/10 transition"
      >
        {preview ? (
          <img src={preview} className="max-h-52 rounded-lg" />
        ) : (
          <p className="text-slate-400">
            Drop image or <span className="text-indigo-400">browse</span>
          </p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={!photo || loading}
        className="mt-6 w-full max-w-xl py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold"
      >
        {loading ? "Analyzing..." : "Detect Mood"}
      </button>

      {/* Result */}
      {result && (
        <div className="w-full max-w-xl mt-8 space-y-6">

          {/* Mood */}
          <div className="p-6 rounded-xl bg-white/5">
            <p className="text-slate-400 text-sm">Detected Mood</p>
            <p className="text-3xl font-bold text-indigo-400">
              {result.mood}
            </p>
          </div>

          {/* Language Filter */}
          <div className="flex gap-2">
            {["all","hindi","english"].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguageFilter(lang)}
                className={`flex-1 py-2 rounded-lg ${
                  languageFilter === lang
                    ? "bg-indigo-500 text-white"
                    : "bg-white/5 text-slate-400"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Songs */}
          <div className="p-6 rounded-xl bg-white/5 space-y-3">
            {filteredSongs.map((song, i) => (
              <div key={i} className="flex justify-between">
                <span>{song.title}</span>
                {song.url && (
                  <a
                    href={song.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400"
                  >
                    Listen
                  </a>
                )}
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}