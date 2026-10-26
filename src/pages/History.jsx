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
  return <div className="standard-page page-enter"><div className="page-intro"><div className="eyebrow">THE FEELINGS YOU KEPT</div><h1>Your own little<br/><em>time machine.</em></h1><p>Photos, feelings, and the tracks that take you back.<br/>Your saved playlists live here, on this device.</p></div><div className="library-toolbar"><h2>My library <span>{library.length}</span></h2><label className="search-field"><Icon name="search" size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a feeling or a track" aria-label="Search saved playlists"/>{query && <button aria-label="Clear search" className="icon-button" onClick={() => setQuery("")}><Icon name="close" size={14}/></button>}</label></div>{error && <p role="alert" className="inline-error">{error}</p>}{filtered.length ? <div className="library-grid">{filtered.map(item => <article className="saved-item" key={item.id}><div className="saved-meta"><span>Saved {new Date(item.savedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span><button className="icon-button" aria-label={`Remove ${item.title} from library`} onClick={() => { try { remove(item.id); } catch { setError("Couldn’t update browser storage. Please try again."); } }}><Icon name="trash" size={16}/></button></div><Playlist playlist={item} generated compact/></article>)}</div> : <div className="empty-state"><span className="empty-icon"><Icon name={query ? "search" : "library"} size={32}/></span><h3>{query ? "That feeling isn’t here yet." : "Good moments deserve a replay."}</h3><p>{query ? "Try a different title, artist, or mood." : "Find a soundtrack and tap “Save this feeling” to start your collection."}</p>{query ? <button className="button button-secondary" onClick={() => setQuery("")}>Clear search</button> : <Link className="button button-primary" to="/#studio">Discover my soundtrack <Icon name="arrow" size={18}/></Link>}</div>}</div>;
}
