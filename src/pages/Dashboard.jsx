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

  const fileInputRef = useRef(null);

  // ✅ FILE SELECT
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ DROP SUPPORT
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => e.preventDefault();

  // ✅ SUBMIT
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
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">

      <h1 className="text-3xl font-bold text-white mb-6">
        Upload a photo, discover the mood
      </h1>

      {/* UPLOAD BOX */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full max-w-lg h-56 rounded-xl border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition"
      >
        {preview ? (
          <img src={preview} alt="preview" className="max-h-52 rounded-lg" />
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

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={!photo || loading}
        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Detect Mood"}
      </button>

      {/* RESULT */}
      {result && (
        <div className="mt-8 w-full max-w-lg bg-white/5 p-6 rounded-xl">
          <p className="text-white font-bold text-xl mb-4">
            Mood: {result.mood}
          </p>

          {result.songs?.map((song, i) => (
            <div key={i} className="flex justify-between py-2 text-slate-300">
              <span>{song.title}</span>
              {song.url && (
                <a href={song.url} target="_blank" className="text-indigo-400">
                  Listen
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}