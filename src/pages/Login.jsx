import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { login } from "../services/api";
import { useAuth } from "../hooks/useAuth.jsx";
import { collections } from "../data/collections";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();
  async function handleLogin(credentials) {
    if (import.meta.env.VITE_ENABLE_BACKEND !== "true") {
      setError("Account services are coming in the backend phase. You can use the studio and save playlists on this device without signing in.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await login(credentials.email, credentials.password);
      loginUser(data.token);
      navigate("/dashboard");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  return <div className="auth-page page-enter"><div className="auth-story"><div className="eyebrow">YOUR MOMENTS HAVE A HOME</div><h1>A familiar feeling.<br/><em>A fresh soundtrack.</em></h1><p>Come back to the music that feels like you. Your next favorite moment is just a photo away.</p><img className="auth-story-image" src={collections[0].image} alt="A warm and quiet landscape"/></div><AuthForm type="login" onSubmit={handleLogin} error={error} loading={loading}/></div>;
}
