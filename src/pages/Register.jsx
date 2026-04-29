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

  const handleRegister = async (credentials, validationError) => {
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await register(credentials.email, credentials.password);
      if (data.token) {
        loginUser(data.token);
        navigate("/dashboard");
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
        <AuthForm
          type="register"
          onSubmit={handleRegister}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
}
