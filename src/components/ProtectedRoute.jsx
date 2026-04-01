import { useEffect, useState } from "react";
import { supabase } from "../services/api";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/login";
      } else {
        setUser(data.user);
      }

      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return children;
}