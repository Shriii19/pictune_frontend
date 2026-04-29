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
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-[#FAFAFA]">
      <div className="relative z-10 flex flex-col items-center w-full">
        <AuthForm
          type="login"
          onSubmit={handleLogin}
          error={error}
          loading={loading}
        />

        <div className="mt-12 max-w-sm text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-[10px] text-[#888888] uppercase tracking-widest font-bold leading-relaxed">
            <span className="text-[#111111]">PicTune</span> decodes the emotional atmosphere of your photography and matches it with sound.
          </p>
        </div>
      </div>
    </div>
  );
}
