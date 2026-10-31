import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { login } from "../services/api";
import { useAuth } from "../hooks/useAuth.jsx";
import { nameForEmail, queueWelcome } from "../lib/stageName";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();
  async function handleLogin(credentials) {
    setLoading(true);
    setError("");
    try {
      const data = await login(credentials.email, credentials.password);
      loginUser(data.token, nameForEmail(credentials.email));
      queueWelcome("back");
      navigate("/dashboard");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  return <div className="auth-page"><div className="auth-story"><h1>Welcome <em>back.</em></h1><p>Sign in to continue creating photo playlists after your two free guest results.</p><ul className="auth-perks"><li>Keep going after your two free photos</li><li>Hang on to the playlists you like</li><li>Unlock captions whenever you want</li></ul></div><AuthForm type="login" onSubmit={handleLogin} error={error} loading={loading}/></div>;
}
