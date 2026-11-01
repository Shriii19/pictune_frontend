import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "../lib/authContext";
import { readCurrentName, storeCurrentName } from "../lib/stageName";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [name, setName] = useState(() => readCurrentName(localStorage.getItem("token")));
  useEffect(() => {
    const sync = () => {
      const next = localStorage.getItem("token");
      setToken(next);
      setName(next ? readCurrentName(next) : "");
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const login = useCallback((newToken, newName = "") => {
    localStorage.setItem("token", newToken);
    localStorage.removeItem("guest_count");
    storeCurrentName(newName);
    setToken(newToken);
    setName(newName || readCurrentName(newToken));
  }, []);
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    storeCurrentName("");
    setToken(null);
    setName("");
  }, []);
  return <AuthContext.Provider value={{ token, name, login, logout, isAuthenticated: !!token }}>{children}</AuthContext.Provider>;
}
