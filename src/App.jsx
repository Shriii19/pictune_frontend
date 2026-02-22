import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="noise-overlay min-h-screen bg-[#050510] text-slate-200 font-sans relative overflow-x-hidden">
        {/* Animated Background Orbs */}
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />

        {/* App Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/login"
                element={
                  isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
                }
              />
              <Route
                path="/register"
                element={
                  isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="relative z-10 border-t border-white/4 py-6 text-center">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} PicTune &mdash; AI Mood Music. Built with care.
            </p>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
