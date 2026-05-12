import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthForm({ type, onSubmit, error, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const isRegister = type === "register";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister && password !== confirmPassword) {
      onSubmit(null, "Passwords do not match");
      return;
    }
    onSubmit({ email, password, username, phone });
  };

  return (
    <div className="w-full max-w-md animate-slide-up bg-white border border-[#E5E5EA] p-8 md:p-10 shadow-sm">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-editorial text-3xl tracking-tight text-[#111111] uppercase">
          {isRegister ? "Create Account" : "Access Studio"}
        </h2>
        <p className="text-[#666666] mt-2 text-xs uppercase tracking-widest font-bold">
          {isRegister
            ? "Begin the visual acoustic journey"
            : "Return to your visual analysis"}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 border border-[#FF3B30] bg-[#FAFAFA]">
          <p className="text-[#FF3B30] text-xs font-bold uppercase tracking-widest text-center">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {isRegister && (
          <div>
            <label className="block text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em] mb-2">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E5EA] text-[#111111] text-sm focus:outline-none focus:border-[#111111] transition-colors"
              placeholder="johndoe"
            />
          </div>
        )}

        {isRegister && (
          <div>
            <label className="block text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em] mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E5EA] text-[#111111] text-sm focus:outline-none focus:border-[#111111] transition-colors"
              placeholder="+1234567890"
            />
          </div>
        )}

        <div>
          <label className="block text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em] mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E5EA] text-[#111111] text-sm focus:outline-none focus:border-[#111111] transition-colors"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em]">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[10px] font-bold text-[#888888] hover:text-[#111111] uppercase tracking-widest"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E5EA] text-[#111111] text-sm focus:outline-none focus:border-[#111111] transition-colors"
            placeholder="••••••••"
          />
        </div>

        {isRegister && (
          <div>
            <label className="block text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em] mb-2">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E5EA] text-[#111111] text-sm focus:outline-none focus:border-[#111111] transition-colors"
              placeholder="••••••••"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 mt-2"
        >
          {loading ? "Processing..." : (isRegister ? "Register" : "Authenticate")}
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-[#E5E5EA]"></div>
          <span className="flex-shrink-0 mx-4 text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em]">Or</span>
          <div className="flex-grow border-t border-[#E5E5EA]"></div>
        </div>

        <button
          type="button"
          onClick={() => {
            alert("To implement Google Login, you need to configure Supabase Auth (Providers > Google) and connect it here.");
          }}
          className="w-full py-4 bg-white border border-[#E5E5EA] text-[#111111] text-sm font-bold uppercase tracking-widest hover:bg-[#FAFAFA] transition-colors flex items-center justify-center gap-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.78 15.68 17.55V20.31H19.25C21.34 18.39 22.56 15.58 22.56 12.25Z" fill="#4285F4"/>
            <path d="M12 23C14.97 23 17.46 22.02 19.25 20.31L15.68 17.55C14.71 18.2 13.45 18.59 12 18.59C9.2 18.59 6.83 16.7 5.98 14.16H2.33V16.99C4.1 20.5 7.76 23 12 23Z" fill="#34A853"/>
            <path d="M5.98 14.16C5.76 13.51 5.64 12.77 5.64 12C5.64 11.23 5.76 10.49 5.98 9.84V7.01H2.33C1.6 8.47 1.18 10.18 1.18 12C1.18 13.82 1.6 15.53 2.33 16.99L5.98 14.16Z" fill="#FBBC05"/>
            <path d="M12 5.41C13.62 5.41 15.07 5.97 16.21 7.06L19.34 3.93C17.45 2.18 14.97 1 12 1C7.76 1 4.1 3.5 2.33 7.01L5.98 9.84C6.83 7.3 9.2 5.41 12 5.41Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-[#E5E5EA] text-center text-xs text-[#888888] font-bold uppercase tracking-widest">
        {isRegister ? (
          <>
            Existing User?{" "}
            <Link to="/login" className="text-[#111111] hover:underline transition-colors ml-1">
              Sign In
            </Link>
          </>
        ) : (
          <>
            New User?{" "}
            <Link to="/register" className="text-[#111111] hover:underline transition-colors ml-1">
              Create Profile
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
