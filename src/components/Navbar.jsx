import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useLibrary } from "../hooks/useLibrary";
import { usePlan } from "../hooks/usePlan";
import Icon from "./Icon";
import { LIFETIME } from "../lib/plan";

export function Brand() {
  return (
    <span className="brand">
      <span className="brand-mark" aria-hidden="true" />
      <span>Pic<em>Tune</em></span>
    </span>
  );
}

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { library } = useLibrary();
  const { isPro } = usePlan();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const close = () => setMobileOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link to="/" aria-label="PicTune home" onClick={close}><Brand /></Link>
        <nav id="primary-navigation" aria-label="Main navigation" className={`main-nav ${mobileOpen ? "is-open" : ""}`}>
          <NavLink to="/" end className={({ isActive }) => isActive || pathname === "/dashboard" ? "active" : ""} onClick={close}>Discover</NavLink>
          <NavLink to="/history" onClick={close}>Library {library.length > 0 && <span className="nav-count">{library.length}</span>}</NavLink>
          <NavLink to="/pricing" onClick={close}>Pricing</NavLink>
          <NavLink to="/about" onClick={close}>How it works</NavLink>
        </nav>
        <div className="header-actions">
          {isPro
            ? <span className="pro-chip mono">Pro</span>
            : <Link to="/pricing" className="go-pro" onClick={close}>Go Pro<span className="mono">{LIFETIME.label}</span></Link>}
          {isAuthenticated ? <button className="header-account" onClick={() => { close(); logout(); }}>Sign out</button> : <Link to="/login" className="header-account" onClick={close}>Sign in</Link>}
          <button ref={menuRef} className="icon-button mobile-menu" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="primary-navigation" onClick={() => setMobileOpen(!mobileOpen)}><Icon name={mobileOpen ? "close" : "menu"} /></button>
        </div>
      </div>
    </header>
  );
}
