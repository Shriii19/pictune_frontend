import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "../services/api";
import { useAuth } from "../hooks/useAuth.jsx";
import { collections } from "../data/collections";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();
  async function handleRegister(credentials, validationError) {
    if (validationError) { setError(validationError); return; }
    if (import.meta.env.VITE_ENABLE_BACKEND !== "true") {
      setError("Account creation is coming in the backend phase. For now, explore the studio and keep your playlists on this device.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await register(credentials.email, credentials.password, credentials.username, credentials.phone);
      if (data.token) { loginUser(data.token); navigate("/dashboard"); }
      else navigate("/login");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  return <div className="auth-page page-enter"><div className="auth-story"><div className="eyebrow">A SPACE THAT SOUNDS LIKE YOU</div><h1>Collect moments.<br/><em>Keep the feeling.</em></h1><p>Start your own collection of photos, feelings, and the tracks that bring them to life.</p><img className="auth-story-image" src={collections[3].image} alt="Sunlight filtering through a green forest"/></div><AuthForm type="register" onSubmit={handleRegister} error={error} loading={loading}/></div>;
}
