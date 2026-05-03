import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register, verifyOtp } from "../services/api";
import { useAuth } from "../hooks/useAuth.jsx";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("form");
  const [registeredEmail, setRegisteredEmail] = useState("");
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
      const data = await register(credentials.email, credentials.password);
      if (data.requiresVerification) {
        setRegisteredEmail(data.email || credentials.email);
        setStep("otp");
      } else if (data.token) {
        loginUser(data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await verifyOtp(registeredEmail, otp);
      if (data.data?.token) {
        loginUser(data.data.token);
        navigate("/dashboard");
      } else {
        setError("Verification successful but no token received. Please try logging in.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-[#FAFAFA]">
      <div className="relative z-10 w-full flex justify-center">
        {step === "form" ? (
          <AuthForm
            type="register"
            onSubmit={handleRegister}
            error={error}
            loading={loading}
          />
        ) : (
          <div className="w-full max-w-md animate-slide-up bg-white border border-[#E5E5EA] p-8 md:p-10 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="font-editorial text-3xl tracking-tight text-[#111111] uppercase">
                Verify Email
              </h2>
              <p className="text-[#666666] mt-2 text-xs uppercase tracking-widest font-bold">
                Enter the 6-digit code sent to {registeredEmail}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 border border-[#FF3B30] bg-[#FAFAFA]">
                <p className="text-[#FF3B30] text-xs font-bold uppercase tracking-widest text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-[#888888] uppercase tracking-[0.2em] mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  required
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E5E5EA] text-[#111111] text-sm focus:outline-none focus:border-[#111111] text-center tracking-[0.5em] transition-colors"
                  placeholder="000000"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="btn-primary w-full py-4 mt-2"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
