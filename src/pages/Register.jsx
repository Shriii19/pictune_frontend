import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register, verifyOtp } from "../services/api";
import { useAuth } from "../hooks/useAuth.jsx";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("register"); // "register" | "otp"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const handleRegister = async (credentials, validationError) => {
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    try {
      await register(credentials.email, credentials.password);
      setEmail(credentials.email);
      setStep("otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await verifyOtp(email, otp.trim());
      loginUser(data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-600/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-indigo-600/[0.06] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {step === "register" ? (
          <AuthForm
            type="register"
            onSubmit={handleRegister}
            error={error}
            loading={loading}
          />
        ) : (
          <div className="w-full max-w-md animate-slide-up">
            <div className="glass-card rounded-2xl p-8 md:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Verify your email
                </h2>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                  We sent a code to <span className="text-indigo-400 font-medium">{email}</span>
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-6 p-3.5 rounded-xl bg-red-500/8 border border-red-500/20 animate-slide-down">
                  <div className="flex items-center gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* OTP Form */}
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="input-glow w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-center text-2xl font-bold tracking-[0.5em] placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all duration-200"
                    placeholder="000000"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="gradient-btn w-full py-3.5 mt-2 rounded-xl text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    "Verify & Continue"
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-slate-500">
                Didn&apos;t receive the code? Check your spam folder.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
