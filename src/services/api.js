const BASE_URL = "https://pictune-backend.vercel.app/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const deviceId = localStorage.getItem("device_id");

  return {
    ...(token && { Authorization: `Bearer ${token}` }),
    "x-device-id": deviceId || "guest",
  };
};

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data;
};

export const register = async (email, password) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Register failed");
  }

  return data;
};

export const uploadPhoto = async (formData) => {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    // Check if guest limit reached
    if (res.status === 403 && data.error === "LIMIT_REACHED") {
      const error = new Error(data.message || "Please sign up to continue");
      error.code = "LIMIT_REACHED";
      throw error;
    }
    throw new Error(data.error || "Upload failed");
  }

  return data;
};

export const getHistory = async () => {
  const res = await fetch(`${BASE_URL}/history`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "History fetch failed");
  }

  return data;
};