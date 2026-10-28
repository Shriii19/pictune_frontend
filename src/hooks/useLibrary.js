import { useEffect, useState } from "react";

const KEY = "pictune-library-v1";

function readLibrary() {
  try {
    const entries = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(entries) ? entries.filter(item => item?.id && Array.isArray(item.songs)) : [];
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
    update(exists ? entries.filter(item => item.id !== playlist.id) : [{ ...playlist, savedAt: new Date().toISOString() }, ...entries].slice(0, 24));
    return !exists;
  }

  return { library, toggleSave, remove: id => update(readLibrary().filter(item => item.id !== id)) };
}
