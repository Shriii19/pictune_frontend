import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
      loginUser(data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-slate-950 flex items-center justify-center px-4 py-12">
      <AuthForm
        type="register"
        onSubmit={handleRegister}
        error={error}
        loading={loading}
      />
    </div>
  );
}
