import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Playlist from "../components/Playlist";
import { getResult, uploadPhoto } from "../services/api";
import { toPlaylist } from "../lib/playlist";

const MAX_SIZE = 4 * 1024 * 1024;
const LAST_RESULT = "pictune-last-result-v1";

export default function Home() {
  const inputRef = useRef(null);
  const resultRef = useRef(null);
  const requestRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [language, setLanguage] = useState("all");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authRequired, setAuthRequired] = useState(false);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    requestRef.current = controller;
    let last;
    try { last = JSON.parse(sessionStorage.getItem(LAST_RESULT)); } catch { /* No restorable result. */ }
    if (last && /^[a-f0-9]{64}$/.test(last.id)) {
      getResult(last.id, { signal: controller.signal })
        .then(result => { if (!controller.signal.aborted) setPlaylist(toPlaylist(result, { title: last.title })); })
        .catch(err => { if (!controller.signal.aborted) setError(err.message); });
    }
    return () => requestRef.current?.abort();
  }, []);

  useEffect(() => () => { if (selected?.image) URL.revokeObjectURL(selected.image); }, [selected]);

  function handleFile(file) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) { setError("Choose a JPG, PNG, WebP, or AVIF image."); return; }
    if (file.size > MAX_SIZE) { setError("Choose a photo no larger than 4 MB."); return; }
    requestRef.current?.abort();
    setSelected({ file, image: URL.createObjectURL(file), title: file.name.replace(/\.[^.]+$/, "") });
    setPlaylist(null);
    setLoading(false);
    setError("");
    setAuthRequired(false);
    sessionStorage.removeItem(LAST_RESULT);
  }

  async function generate() {
    if (!selected || loading) return;
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setLoading(true);
    setPlaylist(null);
    setError("");
    setAuthRequired(false);
    const form = new FormData();
    sessionStorage.removeItem(LAST_RESULT);
    form.set("photo", selected.file);
    form.set("languages", language === "all" ? "hindi,english,marathi" : language);
    form.set("perLanguageCount", "3");
    try {
      const result = await uploadPhoto(form, { signal: controller.signal });
      if (controller.signal.aborted) return;
      const next = toPlaylist(result, selected);
      setPlaylist(next);
      try { sessionStorage.setItem(LAST_RESULT, JSON.stringify({ id: next.id, title: next.title })); } catch { /* The result remains visible if storage is full. */ }
      requestAnimationFrame(() => {
        if (window.matchMedia("(max-width: 760px)").matches) resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (err) {
      if (!controller.signal.aborted) { setError(err.message); setAuthRequired(Boolean(err.authRequired)); }
    } finally { if (!controller.signal.aborted) setLoading(false); }
  }

  function clearPhoto() {
    requestRef.current?.abort();
    setSelected(null);
    setPlaylist(null);
    setLoading(false);
    setError("");
    setAuthRequired(false);
    sessionStorage.removeItem(LAST_RESULT);
    if (inputRef.current) inputRef.current.value = "";
  }

  return <div className="discover-page">
    <div className="page-intro"><h1>Find music for your photo.</h1><p>Upload a photo and choose your song language.</p></div>
    <section id="studio" className="studio-grid" aria-label="Photo to playlist studio">
      <div className="upload-panel">
        <div className="panel-heading"><h2>Your photo</h2><Link to="/about" className="text-link">How it works <Icon name="arrowUp" size={14} /></Link></div>
        <input ref={inputRef} id="photo-upload" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" aria-label="Upload a photo" onChange={event => { handleFile(event.target.files?.[0]); event.target.value = ""; }} />
        <div className={`upload-zone ${dragging ? "is-dragging" : ""} ${selected ? "has-photo" : ""}`} onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={event => { if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false); }} onDrop={event => { event.preventDefault(); setDragging(false); handleFile(event.dataTransfer.files?.[0]); }}>
          {selected ? <>
            <img className="uploaded-image" src={selected.image} alt={`Selected photo: ${selected.title}`} />
            <div className="selected-photo-meta"><span>{selected.title}</span><button className="icon-button" aria-label="Remove selected photo" onClick={clearPhoto}><Icon name="close" size={17} /></button></div>
            <button className="change-photo" onClick={() => inputRef.current?.click()}><Icon name="upload" size={15} />Change photo</button>
          </> : <button className="upload-trigger" onClick={() => inputRef.current?.click()}><Icon name="image" size={32} /><strong>{dragging ? "Drop your photo here" : "Drag a photo here"}</strong><span>or <span className="upload-browse">choose a file</span></span><small>JPG, PNG, WebP or AVIF / Max. 4 MB</small></button>}
        </div>
        {error && <p className="inline-error" role="alert"><Icon name="info" size={16} />{error}</p>}
        {authRequired && <p className="account-links"><Link to="/login">Sign in</Link> or <Link to="/register">create an account</Link> to continue.</p>}
        <div className="photo-help"><span>Your photo is sent securely for processing. Raw photos are not saved by the backend.</span></div>
        <div className="preferences"><div className="language-field"><label htmlFor="language">Language</label><select id="language" value={language} onChange={event => { setLanguage(event.target.value); setPlaylist(null); sessionStorage.removeItem(LAST_RESULT); }} disabled={loading}><option value="all">Hindi + English + Marathi</option><option value="english">English</option><option value="hindi">Hindi</option><option value="marathi">Marathi</option></select></div></div>
        <button className="button button-primary generate-button" onClick={generate} disabled={!selected || loading}>{loading ? <><span className="small-spinner" />Analysing photo…</> : <>Create playlist<Icon name="arrow" size={18} /></>}</button>
        <p className="studio-status" role="status">{loading ? "Waiting for your photo result." : selected ? "Ready when you are." : "Choose a photo to get started."}</p>
      </div>
      <div className="playlist-column" ref={resultRef}>{playlist ? <Playlist key={playlist.id} playlist={playlist} /> : <div className="empty-state" role="status"><span className="empty-icon"><Icon name="music" size={28} /></span><h3>{loading ? "Analysing your photo" : "Your playlist will appear here"}</h3><p>{loading ? "Songs and captions will appear when processing finishes." : "Upload a photo to get songs and captions from PicTune."}</p></div>}</div>
    </section>
  </div>;
}
