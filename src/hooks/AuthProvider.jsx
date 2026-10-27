import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "../lib/authContext";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  useEffect(() => {
    const sync = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const login = useCallback(newToken => {
    localStorage.setItem("token", newToken);
    localStorage.removeItem("guest_count");
    setToken(newToken);
  }, []);
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);
  return <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>{children}</AuthContext.Provider>;
}
