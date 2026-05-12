import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { useState } from "react";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-serif italic font-bold text-xl leading-none pt-1 shadow-lg shadow-purple-500/30">
              P
            </div>
            <span className="text-lg font-bold tracking-tight text-white uppercase group-hover:text-purple-300 transition-colors">
              PicTune
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-xs font-bold transition-all duration-200 uppercase tracking-widest ${
                    isActive("/dashboard") ? "text-purple-400 border-b-2 border-purple-400 pb-1" : "text-slate-400 hover:text-purple-300"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/history"
                  className={`text-xs font-bold transition-all duration-200 uppercase tracking-widest ${
                    isActive("/history") ? "text-purple-400 border-b-2 border-purple-400 pb-1" : "text-slate-400 hover:text-purple-300"
                  }`}
                >
                  History
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-slate-400 hover:text-pink-400 transition-colors uppercase tracking-widest"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/about"
                  className={`text-xs font-bold transition-all duration-200 uppercase tracking-widest ${
                    isActive("/about") ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  The Process
                </Link>
                <Link
                  to="/login"
                  className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
                >
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-xs tracking-widest uppercase">
                  Start
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white">
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-6 border-t border-white/10 flex flex-col gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-xl font-editorial tracking-tight text-white">Dashboard</Link>
                <Link to="/history" onClick={() => setMobileOpen(false)} className="text-xl font-editorial tracking-tight text-white">History</Link>
                <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="text-xl font-editorial tracking-tight text-pink-400 text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/about" onClick={() => setMobileOpen(false)} className="text-xl font-editorial tracking-tight text-white">The Process</Link>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-xl font-editorial tracking-tight text-white">Sign In</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="text-xl font-editorial tracking-tight text-purple-400">Start Discovery</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
