import { useState } from "react";
import Icon from "./Icon";
import { useLibrary } from "../hooks/useLibrary";

export default function Playlist({ playlist, compact = false }) {
  const { library, toggleSave } = useLibrary();
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
  return <section className={`playlist-panel ${compact ? "compact" : ""}`} aria-label="Your playlist">
    <div className="panel-heading"><h2>Your playlist</h2></div>
    <div className="playlist-summary">
      {playlist.image ? <img className="playlist-art" src={playlist.image} alt="" /> : <span className="playlist-art playlist-art-empty" aria-hidden="true"><Icon name="music" size={32} /></span>}
      <div className="playlist-description"><span className="playlist-type">{colourOnly ? "COLOUR-BASED ESTIMATE" : "PHOTO RESULT"}</span><h3>{playlist.title}</h3><p>{playlist.mood} <span aria-hidden="true">/</span> {playlist.songs.length} tracks</p></div>
    </div>
    <p className="analysis-description">{colourOnly ? "This result uses image colours. Scene and object recognition are not enabled." : playlist.analysis?.explanation}</p>
    {playlist.analysis?.scene && <p className="analysis-description">{playlist.analysis.scene}</p>}
    <div className="track-table-heading"><span>#</span><span>Title / Artist</span><span>Language</span><span /></div>
    <div className="track-list">{playlist.songs.map((song, index) => <div className="track-row" key={song.id}>
      <span className="track-number">{String(index + 1).padStart(2, "0")}</span><div className="track-info"><strong>{song.title}</strong><span>{song.artist}</span></div><span className="track-duration">{song.language}</span>
      {song.url && <a href={song.url} target="_blank" rel="noopener noreferrer" className="track-play" aria-label={`Find ${song.title} by ${song.artist} on YouTube`} title="Find on YouTube"><Icon name="play" size={14} /></a>}
    </div>)}</div>
    {playlist.captions?.length > 0 && <div className="result-captions"><h3>Captions</h3>{playlist.captions.map(caption => <p key={`${caption.language}-${caption.style}`}><span>{caption.language} · {caption.style}</span>{caption.text}</p>)}</div>}
    <div className="playlist-actions"><button className={`button button-secondary ${saved ? "is-saved" : ""}`} onClick={save} aria-pressed={saved}><Icon name={saved ? "check" : "heart"} size={17} />{saved ? "Saved" : "Save playlist"}</button><button className="icon-button copy-button" aria-label="Copy track list" title="Copy track list" onClick={copy}><Icon name="copy" size={17} /></button></div>
    <p className="playlist-note" role="status" aria-live="polite">{notice || "Track links open YouTube search."}</p>
    {playlist.usage?.mode === "guest" && <p className="playlist-note">{playlist.usage.remaining} free photo results remaining.{playlist.usage.signInRequiredForNext ? " Sign in to analyse another photo." : ""}</p>}
  </section>;
}
