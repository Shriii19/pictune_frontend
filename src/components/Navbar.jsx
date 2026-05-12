import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { useState, useEffect } from "react";

function MusicBars({ className = "" }) {
  return (
    <span className={`music-bars ${className}`} aria-hidden="true">
      <span /><span /><span /><span /><span />
    </span>
  );
}

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sticky top-0 z-50 w-full mb-4 transition-all duration-300">
      
      {/* Dynamic Morphing Navbar */}
      <nav className={`relative z-50 mx-auto max-w-6xl transition-all duration-500 bg-transparent backdrop-blur-xl ${scrolled ? "w-[95%] rounded-full mt-4 py-2 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "w-full rounded-t-none rounded-b-[2.5rem] mt-0 py-4 border-b border-x border-t-0 border-white/20 shadow-lg"}`}>
        <div className="px-6 flex justify-between items-center h-14">
          {/* Logo */}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3 group relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 flex items-center justify-center text-white font-serif italic font-bold text-xl leading-none pt-1 shadow-lg shadow-purple-500/30 overflow-hidden">
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              P
            </div>
            <span className="text-xl font-bold tracking-tight text-white uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 relative z-10 mr-2">
              PicTune
            </span>
            <MusicBars className="ml-1 scale-75 opacity-80" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all duration-300 uppercase tracking-[0.15em] ${
                    isActive("/dashboard") ? "bg-white/10 text-white shadow-sm" : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/history"
                  className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all duration-300 uppercase tracking-[0.15em] ${
                    isActive("/history") ? "bg-white/10 text-white shadow-sm" : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  History
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-full text-[11px] font-bold text-slate-400 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300 uppercase tracking-[0.15em]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/about"
                  className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all duration-300 uppercase tracking-[0.15em] ${
                    isActive("/about") ? "bg-white/10 text-white shadow-sm" : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  The Process
                </Link>
                <Link
                  to="/login"
                  className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all duration-300 uppercase tracking-[0.15em] ${
                    isActive("/login") ? "bg-white/10 text-white shadow-sm" : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Sign In
                </Link>
                <Link to="/register" className="ml-2 px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-105 transform">
                  Start
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors focus:outline-none"
          >
            <div className="flex flex-col gap-1.5 items-end justify-center w-5 h-5">
              <span className={`h-[2px] bg-white transition-all duration-300 ease-in-out rounded-full ${mobileOpen ? 'w-5 rotate-45 translate-y-[8px]' : 'w-5'}`}></span>
              <span className={`h-[2px] bg-white transition-all duration-300 ease-in-out rounded-full ${mobileOpen ? 'w-0 opacity-0' : 'w-4'}`}></span>
              <span className={`h-[2px] bg-white transition-all duration-300 ease-in-out rounded-full ${mobileOpen ? 'w-5 -rotate-45 -translate-y-[8px]' : 'w-3'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Container (detached from the pill to preserve the pill shape) */}
      <div className="mx-auto max-w-6xl relative z-40">
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out absolute top-4 left-0 w-full ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-6 py-6 mx-2 border border-white/20 rounded-3xl flex flex-col gap-3 bg-[#0f172a]/90 backdrop-blur-2xl shadow-2xl">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-full bg-white/5 text-[11px] font-bold uppercase tracking-[0.15em] text-white hover:bg-white/10 transition-colors">Dashboard</Link>
                <Link to="/history" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-full bg-white/5 text-[11px] font-bold uppercase tracking-[0.15em] text-white hover:bg-white/10 transition-colors">History</Link>
                <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="px-4 py-3 rounded-full bg-pink-500/10 text-[11px] font-bold uppercase tracking-[0.15em] text-pink-400 hover:bg-pink-500/20 transition-colors text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/about" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-full bg-white/5 text-[11px] font-bold uppercase tracking-[0.15em] text-white hover:bg-white/10 transition-colors">The Process</Link>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-full bg-white/5 text-[11px] font-bold uppercase tracking-[0.15em] text-white hover:bg-white/10 transition-colors">Sign In</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[11px] font-bold uppercase tracking-[0.15em] text-white text-center mt-2">Start Discovery</Link>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
