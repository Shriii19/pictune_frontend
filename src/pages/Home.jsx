import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Playlist from "../components/Playlist";
import { collections, moods, createPlaylist } from "../data/collections";

const MAX_SIZE = 10 * 1024 * 1024;

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("This photo couldn’t be opened. Please try another file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("This image couldn’t be read. Try a JPG, PNG, or WebP file."));
      img.onload = () => {
        const scale = Math.min(1, 900 / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function Home() {
  const inputRef = useRef(null);
  const resultRef = useRef(null);
  const timerRef = useRef(null);
  const uploadRef = useRef(0);
  const [selected, setSelected] = useState(null);
  const [mood, setMood] = useState("dreamy");
  const [language, setLanguage] = useState("all");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState(false);
  const [error, setError] = useState("");
  const [playlist, setPlaylist] = useState(() => createPlaylist(collections[0], "dreamy"));
  const [generated, setGenerated] = useState(false);

  useEffect(() => () => { clearTimeout(timerRef.current); uploadRef.current += 1; }, []);

  async function handleFile(file) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setError("Choose a JPG, PNG, or WebP image."); return; }
    if (file.size > MAX_SIZE) { setError("That photo is a little large. Please choose one under 10 MB."); return; }
    const request = ++uploadRef.current;
    clearTimeout(timerRef.current);
    setLoading(false);
    setError("");
    setReading(true);
    try {
      const image = await readImage(file);
      if (request === uploadRef.current) setSelected({ id: crypto.randomUUID(), title: file.name.replace(/\.[^.]+$/, ""), image, custom: true });
    } catch (err) {
      if (request === uploadRef.current) setError(err.message);
    } finally {
      if (request === uploadRef.current) setReading(false);
    }
  }

  function selectSample(sample, scroll = false) {
    uploadRef.current += 1;
    clearTimeout(timerRef.current);
    setLoading(false);
    setReading(false);
    setSelected(sample);
    setMood(sample.mood);
    setError("");
    if (scroll) document.getElementById("studio")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function generate() {
    if (!selected || loading || reading) return;
    setLoading(true);
    setError("");
    timerRef.current = setTimeout(() => {
      setPlaylist(createPlaylist(selected, mood, language));
      setGenerated(true);
      setLoading(false);
      requestAnimationFrame(() => {
        if (window.matchMedia("(max-width: 760px)").matches) {
          resultRef.current?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "start",
          });
        }
      });
    }, 700);
  }

  function clearPhoto() {
    uploadRef.current += 1;
    clearTimeout(timerRef.current);
    setSelected(null);
    setLoading(false);
    setReading(false);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="discover-page">
      <div className="page-intro">
        <h1>Find music for your photo.</h1>
        <p>Upload an image, pick a mood, and put together a playlist.</p>
      </div>

      <section id="studio" className="studio-grid" aria-label="Photo to playlist studio">
        <div className="upload-panel">
          <div className="panel-heading">
            <h2>Your photo</h2>
            <Link to="/about" className="text-link">How it works <Icon name="arrowUp" size={14} /></Link>
          </div>
          <input
            ref={inputRef}
            id="photo-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            aria-label="Upload a photo"
            onChange={event => { handleFile(event.target.files?.[0]); event.target.value = ""; }}
          />
          <div
            className={`upload-zone ${dragging ? "is-dragging" : ""} ${selected ? "has-photo" : ""}`}
            onDragOver={event => { event.preventDefault(); setDragging(true); }}
            onDragLeave={event => { if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false); }}
            onDrop={event => { event.preventDefault(); setDragging(false); handleFile(event.dataTransfer.files?.[0]); }}
          >
            {selected ? (
              <>
                <img className="uploaded-image" src={selected.image} alt={`Selected photo: ${selected.title}`} />
                <div className="selected-photo-meta">
                  <span>{selected.title}</span>
                  <button className="icon-button" aria-label="Remove selected photo" onClick={clearPhoto}><Icon name="close" size={17} /></button>
                </div>
                <button className="change-photo" onClick={() => inputRef.current?.click()}><Icon name="upload" size={15} />Change photo</button>
              </>
            ) : (
              <button className="upload-trigger" onClick={() => inputRef.current?.click()} disabled={reading}>
                <Icon name="image" size={32} />
                <strong>{reading ? "Opening image…" : dragging ? "Drop your photo here" : "Drag a photo here"}</strong>
                <span>or <span className="upload-browse">choose a file</span></span>
                <small>JPG, PNG or WebP / Max. 10 MB</small>
              </button>
            )}
          </div>
          {error && <p className="inline-error" role="alert"><Icon name="info" size={16} />{error}</p>}
          <div className="photo-help"><span>Your photo stays on this device.</span><a href="#inspiration">Try an example ↓</a></div>

          <div className="preferences">
            <div className="language-field">
              <label htmlFor="language">Language</label>
              <select id="language" value={language} onChange={event => setLanguage(event.target.value)} disabled={loading}>
                <option value="all">English + Hindi</option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
              </select>
            </div>
            <fieldset className="mood-field">
              <legend>Mood</legend>
              <div className="mood-options">
                {moods.map(item => (
                  <button key={item.id} className={`mood-chip ${mood === item.id ? "selected" : ""}`} aria-pressed={mood === item.id} onClick={() => setMood(item.id)} disabled={loading}>{item.label}</button>
                ))}
              </div>
            </fieldset>
          </div>

          <button className="button button-primary generate-button" onClick={generate} disabled={!selected || loading || reading}>
            {loading ? <><span className="small-spinner" />Creating playlist…</> : <>Create playlist<Icon name="arrow" size={18} /></>}
          </button>
          <p className="studio-status" role="status">{loading ? "Choosing sample tracks for your mood." : selected ? "Ready when you are." : "Choose a photo or an example to get started."}</p>
        </div>
        <div className="playlist-column" ref={resultRef}>
          <Playlist key={playlist.id} playlist={playlist} generated={generated} loading={loading} />
        </div>
      </section>

      <section id="inspiration" className="collections-section" aria-labelledby="inspiration-title">
        <div className="section-heading">
          <div><h2 id="inspiration-title">Try it with these</h2><p>Choose a photo to start with.</p></div>
          <span className="section-aside">04 examples</span>
        </div>
        <div className="collection-grid">
          {collections.map(item => (
            <button key={item.id} aria-label={`Use ${item.title} example`} className={`collection-card ${selected?.id === item.id ? "selected" : ""}`} onClick={() => selectSample(item, true)}>
              <div className="collection-photo">
                <img src={item.image} alt="" loading="lazy" />
                <span className="collection-arrow"><Icon name={selected?.id === item.id ? "check" : "arrowUp"} size={18} /></span>
              </div>
              <div className="collection-caption"><h3>{item.title}</h3><span>{moods.find(m => m.id === item.mood).label}</span></div>
            </button>
          ))}
        </div>
      </section>
      <p className="preview-note"><span className="preview-dot" />Preview mode. Tracks are selected from sample playlists. Photo analysis is coming next.</p>
    </div>
  );
}
