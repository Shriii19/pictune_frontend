import { useNavigate } from "react-router-dom";

export default function SignupModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSignup = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-slate-900/90 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-indigo-500/20 animate-slide-up">
        
        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 0 1 10 10v1a4 4 0 0 1-4 4h-1.5" />
              <path d="M12 16v5" />
              <path d="M9 21h6" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white text-center mb-3">
          Guest Limit Reached
        </h3>

        {/* Message */}
        <p className="text-slate-400 text-center mb-8">
          You've used all 3 free tries. Sign up to continue detecting moods and get unlimited access!
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleSignup}
            className="w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Create Account
          </button>
          
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl font-semibold text-indigo-400 bg-white/5 border border-white/10 hover:bg-white/10 active:scale-[0.98] transition"
          >
            Already have an account? Log In
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-sm text-slate-500 hover:text-slate-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
