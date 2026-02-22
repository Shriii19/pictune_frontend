import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { login } from "../services/api";
import { useAuth } from "../hooks/useAuth";

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
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/[0.06] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <AuthForm
          type="login"
          onSubmit={handleLogin}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
}
