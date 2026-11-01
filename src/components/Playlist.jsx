import { useState } from "react";
import Icon from "./Icon";
import { Link } from "react-router-dom";
import { useLibrary } from "../hooks/useLibrary";
import { usePlan } from "../hooks/usePlan";
import { LIFETIME } from "../lib/plan";

const LANGUAGE_CODES = { hindi: "HI", english: "EN", marathi: "MR" };

// Blacked-out bars only: real caption text is never rendered for Free users.
function CaptionsLocked({ count }) {
  return <div className="result-captions captions-locked">
    <h4 className="mono">Captions · {count} ready</h4>
    <div className="redacted" aria-hidden="true"><i style={{ width: "92%" }} /><i style={{ width: "68%" }} /><i style={{ width: "80%" }} /></div>
    <span className="stamp" aria-hidden="true">Pro only</span>
    <p>Your captions are written. Unlock them, and every caption after, for {LIFETIME.label}. Once, not monthly.</p>
    <Link to="/pricing" className="button button-primary">Unlock captions <Icon name="arrow" size={16} /></Link>
  </div>;
}

export default function Playlist({ playlist, compact = false }) {
  const { library, toggleSave } = useLibrary();
  const { isPro } = usePlan();
  const [notice, setNotice] = useState("");
  const saved = library.some(item => item.id === playlist.id);
  const colourOnly = playlist.analysis?.source === "color";

  function save() {
    try { setNotice(toggleSave(playlist) ? "Saved on this device." : "Removed from your library."); }
    catch { setNotice("Browser storage is full. Remove a saved playlist and try again."); }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(`${playlist.title}\n${playlist.songs.map(song => `${song.title} — ${song.artist}\n${song.url || ""}`).join("\n\n")}\n\nPicTune`);
      setNotice("Track list copied.");
    } catch { setNotice("Couldn’t copy the track list. Use the track links to open YouTube."); }
  }
  async function copyCaption(text) {
    try { await navigator.clipboard.writeText(text); setNotice("Caption copied."); }
    catch { setNotice("Couldn’t copy the caption. Select the text to copy it."); }
  }
  return <section className={`playlist-panel ${compact ? "compact" : ""}`} aria-label="Your playlist" style={{ "--n": playlist.songs.length }}>
    {!compact && <div className="panel-heading"><h3><span className="side mono">B</span>Your tracklist</h3></div>}
    <div className="playlist-summary">
      {playlist.image ? <img className="playlist-art" src={playlist.image} alt="" /> : <span className="playlist-art playlist-art-empty" aria-hidden="true"><Icon name="music" size={28} /></span>}
      <div className="playlist-description"><span className="playlist-type mono">{colourOnly ? "Colour-based estimate" : "From your photo"}</span><h3>{playlist.title}</h3><p className="mono">{playlist.mood} · {playlist.songs.length} tracks</p></div>
    </div>
    <p className="analysis-description">{colourOnly ? "This result uses image colours. Scene and object recognition are not enabled." : playlist.analysis?.explanation}</p>
    {playlist.analysis?.scene && <p className="analysis-description">{playlist.analysis.scene}</p>}
    <ol className="track-list">{playlist.songs.map((song, index) => <li className="track-row" key={song.id} style={{ "--i": index }}>
      <span className="track-number mono">A{index + 1}</span>
      <div className="track-info"><strong>{song.title}</strong><span>{song.artist}</span></div>
      <i className="leader" aria-hidden="true" />
      <span className="track-lang mono" title={song.language}>{LANGUAGE_CODES[song.language?.toLowerCase()] || song.language}</span>
      {song.url ? <a href={song.url} target="_blank" rel="noopener noreferrer" className="track-play" aria-label={`Find ${song.title} by ${song.artist} on YouTube`} title="Find on YouTube"><Icon name="play" size={13} /></a> : <span />}
    </li>)}</ol>
    {playlist.captions?.length > 0 && (isPro
      ? <div className="result-captions"><h4 className="mono">Captions</h4>{playlist.captions.map(caption => <div className="caption-card" key={`${caption.language}-${caption.style}`}><div><span className="mono">{caption.language} · {caption.style}</span><p>{caption.text}</p></div><button className="icon-button" aria-label={`Copy ${caption.style} caption`} title="Copy caption" onClick={() => copyCaption(caption.text)}><Icon name="copy" size={15} /></button></div>)}</div>
      : <CaptionsLocked count={playlist.captions.length} />)}
    <div className="playlist-actions"><button className={`button button-secondary ${saved ? "is-saved" : ""}`} onClick={save} aria-pressed={saved}><Icon name={saved ? "check" : "heart"} size={17} />{saved ? "Saved" : "Save playlist"}</button><button className="button button-secondary copy-button" aria-label="Copy track list" title="Copy track list" onClick={copy}><Icon name="copy" size={17} /></button></div>
    <p className="playlist-note mono" role="status" aria-live="polite">{notice || "Track links open a YouTube search."}</p>
    {playlist.usage?.mode === "guest" && <p className="playlist-note mono">{playlist.usage.remaining} free photo results remaining.{playlist.usage.signInRequiredForNext ? " Sign in to analyse another photo." : ""}</p>}
  </section>;
}
