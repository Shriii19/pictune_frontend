import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { uploadPhoto } from "../services/api";


const FREE_LIMIT = 3;

export default function Dashboard() {
  const navigate = useNavigate();

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
  const [showLimitModal, setShowLimitModal] = useState(false);
  const fileInputRef = useRef(null);

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  // Get guest usage count from localStorage
  const getGuestUses = () => {
    return parseInt(localStorage.getItem("guest_uses") || "0", 10);
  };

  const incrementGuestUses = () => {
    const current = getGuestUses();
    localStorage.setItem("guest_uses", String(current + 1));
  };

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

    // Client-side free limit check for guests
    if (!isLoggedIn && getGuestUses() >= FREE_LIMIT) {
      setShowLimitModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    setLoading(true);
    setResult(null);

    try {
      const data = await uploadPhoto(formData);
      // Track guest usage on success
      if (!isLoggedIn) {
        incrementGuestUses();
      }
      setResult(data);
    } catch (err) {
      if (err.code === "LIMIT_REACHED") {
        setShowLimitModal(true);
        return;
      }
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

      {/* LIMIT REACHED MODAL */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center space-y-5 animate-slide-up">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-white">Free Limit Reached</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              You&apos;ve used all <span className="text-white font-semibold">{FREE_LIMIT} free tries</span>. Create an account or log in to keep discovering mood-matched music — unlimited.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/register"
                className="gradient-btn flex-1 py-3 rounded-xl text-white text-sm font-semibold text-center"
              >
                Sign Up Free
              </Link>
              <Link
                to="/login"
                className="flex-1 py-3 rounded-xl text-sm font-medium text-slate-400 border border-white/10 hover:border-white/20 hover:text-white transition-all text-center"
              >
                Log In
              </Link>
            </div>

            <button
              onClick={() => setShowLimitModal(false)}
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}