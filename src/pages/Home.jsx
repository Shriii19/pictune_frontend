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

  return <div className="discover-page page-enter">
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy"><div className="eyebrow"><span>✳</span> YOUR MOMENTS, REMIXED</div><h1 id="hero-title">Every picture.<br/>A different <em>feeling.</em></h1><p>That sunset. That road trip. That blurry night out.<br className="desktop-break"/> Find the soundtrack that feels just like your photo.</p><a href="#studio" className="button button-primary">Find my soundtrack <Icon name="arrow" size={18}/></a><div className="hero-detail"><span className="mini-photos">{collections.slice(0, 3).map(item => <img key={item.id} src={item.image} alt=""/>)}</span><span>A little visual. A little musical. All you.</span></div></div>
      <div className="hero-art" aria-label="A golden landscape paired with a dreamy soundtrack"><span className="orbit orbit-one"/><span className="orbit orbit-two"/><span className="art-sparkle">✳</span><div className="vinyl"><div className="vinyl-label"><Icon name="music" size={24}/><span>PICTUNE / SIDE A</span></div></div><div className="photo-print"><div className="print-image"><img src={collections[0].image} alt="Golden sunlight spilling across a misty landscape"/><span className="photo-stamp"><span/>a moment worth playing</span></div><div className="print-caption"><span>Somewhere, at golden hour.</span><span>01 / 04</span></div></div><div className="floating-mood"><span className="mood-spark"><Icon name="sparkle" size={20}/></span><div><small>LOOKS LIKE A FEELING</small><strong>Dreamy & nostalgic</strong></div><span className="wave-bars" aria-hidden="true"><i/><i/><i/><i/><i/></span></div><span className="handwritten">if this moment had a sound…</span></div>
    </section>

    <section id="studio" className="studio-section" aria-labelledby="studio-title">
      <div className="section-heading"><div><div className="eyebrow subtle">A PHOTO IS ALL IT TAKES</div><h2 id="studio-title">Let’s set the mood<span className="accent-dot">.</span></h2></div><Link to="/about" className="text-link">How it works <Icon name="arrowUp" size={15}/></Link></div>
      <div className="studio-grid">
        <div className="upload-panel panel"><div className="panel-heading"><span className="step-number">01</span><h3>Your moment</h3><span className="panel-hint">Start with a photo</span></div>
          <input ref={inputRef} id="photo-upload" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" aria-label="Upload a photo" onChange={e => { handleFile(e.target.files?.[0]); e.target.value = ""; }}/>
          <div className={`upload-zone ${dragging ? "is-dragging" : ""} ${selected ? "has-photo" : ""}`} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false); }} onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }}>
            {selected ? <><img className="uploaded-image" src={selected.image} alt={`Selected photo: ${selected.title}`}/><div className="selected-photo-meta"><span><Icon name="image" size={15}/>{selected.title}</span><button type="button" className="icon-button" aria-label="Remove selected photo" onClick={clearPhoto}><Icon name="close" size={17}/></button></div><button className="change-photo" onClick={() => inputRef.current?.click()}><Icon name="upload" size={15}/> Change photo</button></> : <button type="button" className="upload-trigger" onClick={() => inputRef.current?.click()} disabled={reading}><span className="upload-icon"><Icon name="image" size={27}/><span>+</span></span><strong>{reading ? "Opening your photo…" : dragging ? "Drop it like it’s a good photo" : "Drop a little inspiration here"}</strong><span>or <span className="upload-browse">browse your photos</span></span><small>JPG, PNG or WebP · up to 10 MB</small></button>}
          </div>
          {error && <p className="inline-error" role="alert"><Icon name="info" size={16}/>{error}</p>}
          <div className="sample-row"><span>Just exploring?<small>Try a sample</small></span><div className="sample-thumbnails">{collections.map(sample => <button key={sample.id} onClick={() => selectSample(sample)} aria-label={`Try ${sample.title}`} aria-pressed={selected?.id === sample.id} className={selected?.id === sample.id ? "selected" : ""}><img src={sample.image} alt=""/>{selected?.id === sample.id && <Icon name="check" size={18}/>}</button>)}</div></div>
          <div className="preferences"><label htmlFor="language">Soundtrack language</label><select id="language" value={language} onChange={e => setLanguage(e.target.value)} disabled={loading}><option value="all">A little of everything</option><option value="english">English</option><option value="hindi">Hindi</option></select></div>
          <fieldset className="mood-field"><legend>What’s the feeling?</legend><div className="mood-options">{moods.map(item => <button type="button" key={item.id} className={`mood-chip ${mood === item.id ? "selected" : ""}`} style={{ "--mood-color": item.color }} aria-pressed={mood === item.id} onClick={() => setMood(item.id)} disabled={loading}><Icon name={item.icon} size={14}/>{item.label}</button>)}</div></fieldset>
          <button className="button button-primary generate-button" onClick={generate} disabled={!selected || loading || reading}>{loading ? <><span className="small-spinner"/>Putting your playlist together…</> : <><Icon name="sparkle" size={18}/>Find my soundtrack<Icon name="arrow" size={17}/></>}</button>
          <p className="privacy-note"><Icon name="info" size={12}/>Your photo stays in this browser. Your memories stay yours.</p>
        </div>
        <Playlist playlist={playlist} generated={generated} loading={loading}/>
      </div>
      <div className="demo-note"><span className="demo-dot"/><p><strong>A little preview of what’s coming.</strong> Explore curated sample tracks with your chosen mood. AI photo analysis arrives with the backend.</p></div>
    </section>

    <section className="collections-section" id="inspiration" aria-labelledby="inspiration-title"><div className="section-heading"><div><div className="eyebrow subtle">FIND YOUR NEXT FEELING</div><h2 id="inspiration-title">A world of moods</h2></div><span className="section-aside">Different scenes. Different soundtracks.</span></div><div className="collection-grid">{collections.map(item => <button key={item.id} className="collection-card" onClick={() => selectSample(item, true)}><div className="collection-photo"><img src={item.image} alt={item.title} loading="lazy"/><span className="collection-tag">{item.tag}</span><span className="collection-arrow"><Icon name="arrowUp" size={18}/></span></div><h3>{item.title}</h3><p>{item.subtitle}</p></button>)}</div></section>
    <section className="closing-note"><span>✳</span><p>Some moments are better<br/>with a soundtrack.</p><a href="#studio" className="text-link">Find yours <Icon name="arrow" size={17}/></a></section>
  </div>;
}
