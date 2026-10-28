import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useLibrary } from "../hooks/useLibrary";
import Icon from "./Icon";

export function Brand() {
  return (
    <span className="brand">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
      pictune
    </span>
  );
}

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { library } = useLibrary();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const onEscape = event => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" aria-label="PicTune home" onClick={() => setMobileOpen(false)}><Brand /></Link>
        <nav id="primary-navigation" aria-label="Main navigation" className={`main-nav ${mobileOpen ? "is-open" : ""}`}>
          <NavLink to="/" end className={({ isActive }) => isActive || pathname === "/dashboard" ? "active" : ""} onClick={() => setMobileOpen(false)}>Discover</NavLink>
          <NavLink to="/history" onClick={() => setMobileOpen(false)}>Library {library.length > 0 && <span className="nav-count">{library.length}</span>}</NavLink>
          <NavLink to="/about" onClick={() => setMobileOpen(false)}>How it works</NavLink>
        </nav>
        <div className="header-actions">
          {isAuthenticated ? <button className="header-account" onClick={() => { setMobileOpen(false); logout(); }}>Sign out</button> : <Link to="/login" className="header-account" onClick={() => setMobileOpen(false)}>Sign in <Icon name="arrowUp" size={14} /></Link>}
          <button ref={menuRef} className="icon-button mobile-menu" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="primary-navigation" onClick={() => setMobileOpen(!mobileOpen)}><Icon name={mobileOpen ? "close" : "menu"} /></button>
        </div>
      </div>
    </header>
  );
}
