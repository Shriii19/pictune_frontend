import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth.jsx";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();
  useEffect(() => {
    let active = true;
    async function callback() {
      if (!supabase || import.meta.env.VITE_ENABLE_BACKEND !== "true") { navigate("/login", { replace: true }); return; }
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (!active) return;
        if (error || !session) { navigate("/login", { replace: true }); return; }
        login(session.access_token);
        navigate("/dashboard", { replace: true });
      } catch { if (active) navigate("/login", { replace: true }); }
    }
    callback();
    return () => { active = false; };
  }, [navigate, login]);
  return <div className="empty-state" role="status"><span className="small-spinner"/><h2>Finding your space…</h2></div>;
}
