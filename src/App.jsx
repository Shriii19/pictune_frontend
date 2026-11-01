import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar, { Brand } from "./components/Navbar";
import Home from "./pages/Home";
import History from "./pages/History";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function PageScroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }));
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Layout() {
  return (
    <div className="app-shell">
      <PageScroll />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <div className="main-shell">
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <div className="footer-brand"><Brand /><span>Songs for your photos.</span></div>
          <div className="footer-links">
            <Link to="/#studio">Studio</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">How it works</Link>
            <span className="mono">© {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return <BrowserRouter><Layout /></BrowserRouter>;
}
