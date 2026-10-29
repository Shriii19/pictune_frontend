import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "../services/api";
import { useAuth } from "../hooks/useAuth.jsx";

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
      if (data.token) { loginUser(data.token); navigate("/dashboard"); }
      else navigate("/login");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }
  return <div className="auth-page"><div className="auth-story"><h1>Your PicTune account.</h1><p>Create an account to continue making photo playlists after your two free guest results.</p></div><AuthForm type="register" onSubmit={handleRegister} error={error} loading={loading}/></div>;
}
