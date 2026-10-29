import { useState } from "react";
import { Link } from "react-router-dom";
import { useLibrary } from "../hooks/useLibrary";
import Playlist from "../components/Playlist";
import Icon from "../components/Icon";

export default function History() {
  const { library, remove } = useLibrary();
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const filtered = library.filter(item => `${item.title} ${item.mood} ${item.songs.map(song => `${song.title} ${song.artist}`).join(" ")}`.toLowerCase().includes(query.toLowerCase()));

  function removePlaylist(id) {
    try { remove(id); }
    catch { setError("Couldn’t update browser storage. Please try again."); }
  }

  return (
    <div className="standard-page">
      <div className="page-intro">
        <h1>Your library</h1>
        <p>Saved playlists on this device.</p>
      </div>
      <div className="library-toolbar">
        <h2>Playlists <span>{library.length}</span></h2>
        <label className="search-field">
          <Icon name="search" size={17} />
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search title, artist, or mood" aria-label="Search saved playlists" />
          {query && <button aria-label="Clear search" className="icon-button" onClick={() => setQuery("")}><Icon name="close" size={14} /></button>}
        </label>
      </div>
      {error && <p className="inline-error" role="alert">{error}</p>}
      {filtered.length ? (
        <div className="library-grid">
          {filtered.map(item => (
            <article className="saved-item" key={item.id}>
              <div className="saved-meta">
                <span>Saved {new Date(item.savedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
                <button className="icon-button" aria-label={`Remove ${item.title} from library`} onClick={() => removePlaylist(item.id)}><Icon name="trash" size={16} /></button>
              </div>
              <Playlist playlist={item} compact />
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon"><Icon name={query ? "search" : "library"} size={28} /></span>
          <h3>{query ? "No matching playlists" : "No saved playlists yet"}</h3>
          <p>{query ? "Try another title, artist, or mood." : "Create a playlist, then save it to find it here."}</p>
          {query ? <button className="button button-secondary" onClick={() => setQuery("")}>Clear search</button> : <Link className="button button-primary" to="/#studio">Create a playlist <Icon name="arrow" size={16} /></Link>}
        </div>
      )}
    </div>
  );
}
