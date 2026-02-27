import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { login } from "../services/api";
import { useAuth } from "../hooks/useAuth.jsx";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError("");
    try {
      const data = await login(credentials.email, credentials.password);
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/[0.06]  rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <AuthForm
          type="login"
          onSubmit={handleLogin}
          error={error}
          loading={loading}
        />

        {/* Mini about tagline */}
        <div className="mt-10 max-w-sm text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-xs text-slate-600 leading-relaxed">
            <span className="gradient-text font-semibold">PicTune</span> uses AI to detect the mood in your photos and recommend songs that match.
            Upload a photo, discover the vibe.
          </p>
        </div>
      </div>
    </div>
  );
}
