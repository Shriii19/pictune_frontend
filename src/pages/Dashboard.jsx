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
   <div
  onClick={() => fileInputRef.current?.click()}
  onDrop={handleDrop}
  onDragOver={(e) => e.preventDefault()}
  className="mt-6 flex flex-col items-center justify-center w-full h-52 rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition"
>
  {preview ? (
    <img
      src={preview}
      alt="Preview"
      className="rounded-xl max-h-48 object-cover"
    />
  ) : (
    <>
      <p className="text-slate-400 text-sm">
        Drop image or <span className="text-indigo-400">browse</span>
      </p>
      <p className="text-xs text-slate-500 mt-1">
        PNG, JPG up to 10MB
      </p>
    </>
  )}

  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="hidden"
  />
</div>
  );
}