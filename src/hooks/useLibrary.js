import { useEffect, useState } from "react";

const KEY = "pictune-library-v2";

function readLibrary() {
  try {
    const entries = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(entries) ? entries.filter(item => /^[a-f0-9]{64}$/.test(item?.id || "") && item.analysis?.source && Array.isArray(item.songs)) : [];
  } catch {
    return [];
  }
}

export function useLibrary() {
  const [library, setLibrary] = useState(readLibrary);
  useEffect(() => {
    const sync = () => setLibrary(readLibrary());
    window.addEventListener("pictune-library", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("pictune-library", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function update(entries) {
    localStorage.setItem(KEY, JSON.stringify(entries));
    window.dispatchEvent(new Event("pictune-library"));
    setLibrary(entries);
  }

  function toggleSave(playlist) {
    const entries = readLibrary();
    const exists = entries.some(item => item.id === playlist.id);
    // Object URLs expire when leaving the page; keep result text without raw photo data.
    const entry = { ...playlist, image: undefined, savedAt: new Date().toISOString() };
    update(exists ? entries.filter(item => item.id !== playlist.id) : [entry, ...entries].slice(0, 24));
    return !exists;
  }

  return { library, toggleSave, remove: id => update(readLibrary().filter(item => item.id !== id)) };
}
