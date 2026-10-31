import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "../services/api";
import { useAuth } from "../hooks/useAuth.jsx";
import { queueWelcome, rememberName } from "../lib/stageName";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();
  async function handleRegister(credentials, validationError) {
    if (validationError) { setError(validationError); return; }
    setLoading(true);
    setError("");
    try {
      const data = await register(credentials.email, credentials.password, credentials.username, credentials.phone);
      rememberName(credentials.email, credentials.username);
      if (data.token) { loginUser(data.token, credentials.username); queueWelcome("new"); navigate("/dashboard"); }
      else navigate("/login");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  return <div className="auth-page"><div className="auth-story"><h1>Make an <em>account.</em></h1><p>Pick a stage name, and PicTune will greet you by it every time you come back.</p><ul className="auth-perks"><li>Keep going after your two free photos</li><li>Hang on to the playlists you like</li><li>Unlock captions whenever you want</li></ul></div><AuthForm type="register" onSubmit={handleRegister} error={error} loading={loading}/></div>;
}
