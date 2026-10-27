import { useState } from "react";
import Icon from "./Icon";
import { moods } from "../data/collections";
import { useLibrary } from "../hooks/useLibrary";

export default function Playlist({ playlist, generated = false, loading = false, compact = false }) {
  const { library, toggleSave } = useLibrary();
  const [notice, setNotice] = useState("");
  const saved = library.some(item => item.id === playlist.id);
  const mood = moods.find(item => item.id === playlist.mood) || moods[0];

  function save() {
    try {
      const added = toggleSave(playlist);
      setNotice(added ? "Saved on this device." : "Removed from your library.");
    } catch {
      setNotice("Browser storage is full. Remove a saved playlist and try again.");
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${playlist.title}\n${playlist.songs.map(song => `${song.title} — ${song.artist}\n${song.url}`).join("\n\n")}\n\nPicTune · Sample playlist`);
      setNotice("Track list copied.");
    } catch {
      setNotice("Couldn’t copy the track list. Use the track links to open YouTube.");
    }
  }

  return (
    <section className={`playlist-panel ${compact ? "compact" : ""} ${loading ? "is-loading" : ""}`} aria-label="Your playlist" aria-busy={loading}>
      <div className="panel-heading">
        <h2>{generated ? "Your playlist" : "Playlist preview"}</h2>
        <span className="sample-label">Sample tracks</span>
      </div>
      <div className="playlist-summary">
        <img className="playlist-art" src={playlist.image} alt="" />
        <div className="playlist-description">
          <span className="playlist-type">{generated ? "YOUR SELECTION" : "EXAMPLE PLAYLIST"}</span>
          <h3>{playlist.title}</h3>
          <p>{mood.label} <span aria-hidden="true">/</span> {playlist.songs.length} tracks</p>
        </div>
      </div>
      <div className="track-table-heading"><span>#</span><span>Title / Artist</span><span>Time</span><span /></div>
      <div className="track-list">
        {playlist.songs.map((song, index) => (
          <div className="track-row" key={song.title}>
            <span className="track-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="track-info"><strong>{song.title}</strong><span>{song.artist}</span></div>
            <span className="track-duration">{song.duration}</span>
            <a href={song.url} target="_blank" rel="noopener noreferrer" className="track-play" aria-label={`Find ${song.title} by ${song.artist} on YouTube`} title="Find on YouTube"><Icon name="play" size={14} /></a>
          </div>
        ))}
      </div>
      <div className="playlist-actions">
        <button className={`button button-secondary ${saved ? "is-saved" : ""}`} onClick={save} aria-pressed={saved}><Icon name={saved ? "check" : "heart"} size={17} />{saved ? "Saved" : "Save playlist"}</button>
        <button className="icon-button copy-button" aria-label="Copy track list" title="Copy track list" onClick={copy}><Icon name="copy" size={17} /></button>
      </div>
      <p className="playlist-note" role="status" aria-live="polite">{notice || "Track links open YouTube search."}</p>
    </section>
  );
}
