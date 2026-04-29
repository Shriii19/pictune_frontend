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
    <nav className="sticky top-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#E5E5EA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-[#111111] flex items-center justify-center text-[#FAFAFA] font-serif italic font-bold text-xl leading-none pt-1">
              P
            </div>
            <span className="text-lg font-bold tracking-tight text-[#111111] uppercase">
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
                    isActive("/dashboard") ? "text-[#111111] border-b-2 border-[#111111] pb-1" : "text-[#888888] hover:text-[#111111]"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/history"
                  className={`text-xs font-bold transition-all duration-200 uppercase tracking-widest ${
                    isActive("/history") ? "text-[#111111] border-b-2 border-[#111111] pb-1" : "text-[#888888] hover:text-[#111111]"
                  }`}
                >
                  History
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-[#888888] hover:text-[#FF3B30] transition-colors uppercase tracking-widest"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/about"
                  className={`text-xs font-bold transition-all duration-200 uppercase tracking-widest ${
                    isActive("/about") ? "text-[#111111]" : "text-[#888888] hover:text-[#111111]"
                  }`}
                >
                  The Process
                </Link>
                <Link
                  to="/login"
                  className="text-xs font-bold text-[#888888] hover:text-[#111111] transition-colors uppercase tracking-widest"
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
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-[#111111]">
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
          <div className="md:hidden py-6 border-t border-[#E5E5EA] flex flex-col gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-xl font-editorial tracking-tight text-[#111111]">Dashboard</Link>
                <Link to="/history" onClick={() => setMobileOpen(false)} className="text-xl font-editorial tracking-tight text-[#111111]">History</Link>
                <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="text-xl font-editorial tracking-tight text-[#FF3B30] text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/about" onClick={() => setMobileOpen(false)} className="text-xl font-editorial tracking-tight text-[#111111]">The Process</Link>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-xl font-editorial tracking-tight text-[#111111]">Sign In</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="text-xl font-editorial tracking-tight text-[#111111]">Start Discovery</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
