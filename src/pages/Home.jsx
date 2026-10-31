import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Playlist from "../components/Playlist";
import { getResult, uploadPhoto } from "../services/api";
import { toPlaylist } from "../lib/playlist";
import { LIFETIME } from "../lib/plan";
import ProBanner from "../components/ProBanner";
import { Arrow, Circled, Polaroid, Squiggle, Vinyl } from "../components/Doodles";

const MAX_SIZE = 4 * 1024 * 1024;
const LAST_RESULT = "pictune-last-result-v1";
const LOADING_LINES = ["Looking at the light…", "Reading the mood…", "Digging through the crates…", "Picking the songs…"];
const LANGUAGES = [
  { value: "all", label: "All three" },
  { value: "hindi", label: "Hindi" },
  { value: "english", label: "English" },
  { value: "marathi", label: "Marathi" },
];

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
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const timer = setInterval(() => setLoadingStep(step => step + 1), 1800);
    return () => clearInterval(timer);
  }, [loading]);
  const loadingLine = LOADING_LINES[loadingStep % LOADING_LINES.length];

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

  function chooseLanguage(value) {
    setLanguage(value);
    setPlaylist(null);
    sessionStorage.removeItem(LAST_RESULT);
  }

  return <div className="discover-page">
    <section className="hero">
      <div className="hero-copy">
        <p className="kicker mono">Photo in · Playlist out</p>
        <h1>Put a song to <span className="nowrap"><span className="underlined">your photo<Squiggle /></span>.</span></h1>
        <p className="hero-lede">Upload a picture. PicTune looks at the light, the place and the people in it, then hands you songs that fit. In Hindi, English or Marathi.</p>
        <div className="hero-actions">
          <a href="#studio" className="button button-primary">Try it with a photo <Icon name="arrow" size={17} /></a>
          <Link to="/pricing" className="text-link">Captions are {LIFETIME.label}, once</Link>
        </div>
      </div>
      <div className="hero-collage" aria-hidden="true">
        <Polaroid tilt={-4} caption="goa, dec ’25"><span className="scene scene-sunset" /></Polaroid>
        <div className="receipt">
          <p className="mono receipt-head">PICTUNE · SIDE A</p>
          <ol className="mono">
            <li className="is-playing"><em className="mini-eq"><b /><b /><b /></em><span>Kho Gaye Hum Kahan</span><i />HI</li>
            <li><span>Golden Hour</span><i />EN</li>
            <li><span>Saat Samudrapar</span><i />MR</li>
          </ol>
          <p className="receipt-caption">“Salt in the air, gold in the sky.”</p>
        </div>
      </div>
    </section>

    <section id="studio" className="studio" aria-label="Photo to playlist studio">
      <div className="studio-head">
        <h2>The studio <span className="hand-note" aria-hidden="true">start here<Arrow /></span></h2>
        <p className="mono">One photo · up to 4 MB · JPG, PNG, WebP, AVIF</p>
      </div>
      <div className="studio-grid">
        <div className="upload-panel">
          <div className="panel-heading"><h3><span className="side mono">A</span>Your photo</h3><Link to="/about" className="text-link">How it works</Link></div>
          <input ref={inputRef} id="photo-upload" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" aria-label="Upload a photo" onChange={event => { handleFile(event.target.files?.[0]); event.target.value = ""; }} />
          {selected ? <div className={`selected-photo ${loading ? "is-scanning" : ""}`}>
            <Polaroid src={selected.image} alt={`Selected photo: ${selected.title}`} caption={selected.title} tilt={-1.5} />
            <div className="selected-actions">
              <button className="text-link" onClick={() => inputRef.current?.click()}><Icon name="upload" size={15} />Change photo</button>
              <button className="text-link" onClick={clearPhoto}><Icon name="close" size={15} />Remove</button>
            </div>
          </div> : <div className={`upload-zone ${dragging ? "is-dragging" : ""}`} onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={event => { if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false); }} onDrop={event => { event.preventDefault(); setDragging(false); handleFile(event.dataTransfer.files?.[0]); }}>
            <button className="upload-trigger" onClick={() => inputRef.current?.click()}>
              <span className="upload-icon"><Icon name="image" size={26} /></span>
              <strong>{dragging ? "Let go, we’ve got it." : "Drop a photo here"}</strong>
              <span>or <u>pick one from your files</u></span>
            </button>
          </div>}
          {error && <p className="inline-error" role="alert"><Icon name="info" size={16} />{error}</p>}
          {authRequired && <p className="account-links"><Link to="/login">Sign in</Link> or <Link to="/register">create an account</Link> to continue.</p>}
          <p className="photo-help mono"><Icon name="lock" size={12} />Sent securely. We don’t keep the photo.</p>
          <fieldset className="preferences" disabled={loading}>
            <legend>Songs in</legend>
            <div className="language-options">
              {LANGUAGES.map(option => <label key={option.value} className={language === option.value ? "is-active" : ""}>
                <input type="radio" name="language" value={option.value} checked={language === option.value} onChange={() => chooseLanguage(option.value)} className="sr-only" />
                {language === option.value ? <Circled>{option.label}</Circled> : option.label}
              </label>)}
            </div>
          </fieldset>
          <button className="button button-primary generate-button" onClick={generate} disabled={!selected || loading}>{loading ? <><span className="small-spinner" />Listening…</> : <>Make my playlist<Icon name="arrow" size={18} /></>}</button>
          <p className="studio-status mono" role="status">{loading ? loadingLine : selected ? "Ready when you are." : "Waiting for a photo."}</p>
        </div>
        <div className="playlist-column" ref={resultRef}>{playlist ? <Playlist key={playlist.id} playlist={playlist} /> : <div className="empty-state studio-empty" role="status">
          <Vinyl spinning={loading} label={loading ? "Playing" : "Side B"} />
          <h3>{loading ? loadingLine : "Your tracklist goes here."}</h3>
          <p>{loading ? "This usually takes a few seconds." : "Songs show up here once you’ve added a photo."}</p>
        </div>}</div>
      </div>
    </section>

    <section className="notes" aria-label="How PicTune works">
      <h2>Liner notes</h2>
      <ol>
        <li><span className="mono">01</span><p><strong>Any photo works.</strong> Chai on the balcony, a wedding, a blurry night out. If it has a mood, there’s a song for it.</p></li>
        <li><span className="mono">02</span><p><strong>You pick the language.</strong> Hindi, English, Marathi, or a mix of all three. Each track links straight to YouTube.</p></li>
        <li><span className="mono">03</span><p><strong>Keep the good ones.</strong> Save a playlist to your library, or copy the tracklist to send to a friend.</p></li>
      </ol>
    </section>

    <ProBanner />
  </div>;
}
