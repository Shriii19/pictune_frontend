import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthForm({ type, onSubmit, error, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isRegister = type === "register";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister && password !== confirmPassword) {
      onSubmit(null, "Passwords do not match");
      return;
    }
    onSubmit({ email, password });
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
