const BASE_URL = "https://pictune-backend.vercel.app/api";

// 🔥 Ensure device id exists once per browser
if (!localStorage.getItem("device_id")) {
  localStorage.setItem("device_id", crypto.randomUUID());
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const deviceId = localStorage.getItem("device_id");

  return {
    ...(token && { Authorization: `Bearer ${token}` }),
    "x-device-id": deviceId, // 🔥 important for tracking guests
  };
};

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Login failed");
  }

  return res.json();
};

export const register = async (email, password) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Registration failed");
  }

  return res.json();
};

export const uploadPhoto = async (formData) => {
  const deviceId = localStorage.getItem("device_id");

  const res = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "x-device-id": deviceId || "guest",   // ✅ THIS LINE FIXES EVERYTHING
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Upload failed");
  }
  return res.json();
};

export const getHistory = async () => {
  const res = await fetch(`${BASE_URL}/history`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to fetch history");
  }

  return res.json();
};