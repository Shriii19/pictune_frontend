import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { uploadPhoto } from "../services/api";

const FREE_LIMIT = 3;

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("device_id")) {
      localStorage.setItem("device_id", crypto.randomUUID());
    }
  }, []);

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const fileInputRef = useRef(null);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!photo) return;

    const formData = new FormData();
    formData.append("photo", photo);

    setLoading(true);

    try {
      const data = await uploadPhoto(formData);
      setResult(data);
    } catch (err) {
      if (err.message === "LIMIT_REACHED") {
        setShowLimitModal(true);
      } else {
        alert("Error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button onClick={handleSubmit} disabled={loading}>
        Detect Mood
      </button>

      {result && <div>Mood: {result.mood}</div>}

      {showLimitModal && <div>Limit reached. Please login.</div>}
    </div>
  );
}