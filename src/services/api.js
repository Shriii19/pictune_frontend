const BASE_URL = "https://pictune-backend.vercel.app/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const deviceId = localStorage.getItem("device_id");

  return {
    ...(token && { Authorization: `Bearer ${token}` }),
    "x-device-id": deviceId || "guest",
  };
};

export const uploadPhoto = async (formData) => {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Upload failed");
  }

  return data;
};