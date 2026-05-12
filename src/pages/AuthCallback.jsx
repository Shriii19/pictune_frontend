import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth.jsx";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      // Supabase automatically parses the session from the URL hash
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Auth callback error:", error.message);
        navigate("/login");
        return;
      }

      if (session) {
        // If login is successful, save the token to the useAuth context
        // This makes sure the rest of the application knows the user is logged in
        login(session.access_token);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="text-center animate-pulse">
        <h2 className="font-editorial text-2xl tracking-tight text-[#111111] uppercase mb-4">
          Authenticating...
        </h2>
        <div className="w-16 h-[1px] bg-[#111111] mx-auto"></div>
      </div>
    </div>
  );
}
