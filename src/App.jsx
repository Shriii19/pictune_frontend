import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import History from "./pages/History";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthCallback from "./pages/AuthCallback";
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
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <span>© {new Date().getFullYear()} PicTune</span>
          <div><span>Frontend preview</span><Link to="/about">About this project <span aria-hidden="true">↗</span></Link></div>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return <BrowserRouter><Layout /></BrowserRouter>;
}
