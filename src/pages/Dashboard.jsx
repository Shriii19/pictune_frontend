import { useState, useRef, useEffect } from "react";
import { uploadPhoto } from "../services/api";

export default function Dashboard() {

  // 🔥 Generate persistent device id for guest tracking
  useEffect(() => {
    if (!localStorage.getItem("device_id")) {
      localStorage.setItem("device_id", crypto.randomUUID());
    }
  }, []);

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

      {/* HEADER */}
      <div className="text-center mb-10 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Upload a photo,<br />
          <span className="gradient-text">discover the mood</span>
        </h1>
        <p className="text-slate-400 mt-4 text-base sm:text-lg">
          Let AI analyze your photo's mood and recommend songs.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="w-full max-w-2xl glass-card rounded-2xl p-6 md:p-8">

        {/* UPLOAD ZONE */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={() => setDragOver(false)}
          className="drop-zone flex flex-col items-center justify-center w-full rounded-xl cursor-pointer border-2 border-dashed border-white/10 p-8"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="rounded-xl max-h-72 object-cover"
            />
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

        {/* LANGUAGE FILTER */}
        <div className="mt-6 flex gap-2">
          {["all", "hindi", "english"].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguageFilter(lang)}
              className={`flex-1 px-4 py-2 rounded-lg ${
                languageFilter === lang
                  ? "bg-indigo-500 text-white"
                  : "bg-white/5 text-slate-400"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading || !photo}
          className="gradient-btn mt-6 w-full py-3 rounded-xl text-white"
        >
          {loading ? "Analyzing..." : "Detect Mood"}
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div className="w-full max-w-2xl mt-8 space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <p className="text-slate-400 text-sm">Detected Mood</p>
            <p className="text-3xl font-bold gradient-text">{result.mood}</p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            {filteredSongs.map((song, idx) => (
              <div key={idx} className="flex justify-between py-2">
                <span>{song.title}</span>
                {song.url && (
                  <a
                    href={song.url}
                    target="_blank"
                    rel="noopener noreferrer"
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