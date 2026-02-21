import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="text-xl font-bold tracking-tight text-slate-50">
          PicTune <span className="text-indigo-400">🎵📸</span>
        </Link>
        
        <div className="flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition">
                Dashboard
              </Link>
              <Link to="/history" className="text-sm font-medium text-slate-300 hover:text-white transition">
                History
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition">
                Login
              </Link>
              <Link to="/register" className="text-sm font-medium px-3 py-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
