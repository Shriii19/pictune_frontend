const BASE_URL = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000/api" : "https://pictune-backend.vercel.app/api")).replace(/\/+$/, "");

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (token) return { Authorization: `Bearer ${token}` };
  let deviceId = localStorage.getItem("device_id");
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(deviceId || "")) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("device_id", deviceId);
  }
  return { "X-Device-Id": deviceId };
}

async function request(route, options = {}) {
  let response;
  try { response = await fetch(`${BASE_URL}${route}`, options); }
  catch (error) {
    if (options.signal?.aborted) throw error;
    throw new Error("Unable to reach PicTune. Please try again shortly.");
  }
  let payload;
  try { payload = await response.json(); }
  catch { throw new Error("PicTune returned an invalid response. Please try again shortly."); }
  if (!response.ok) {
    const error = new Error(payload.error || "Unable to complete this request.");
    error.status = response.status;
    error.code = payload.code;
    error.authRequired = payload.authRequired;
    throw error;
  }
  return payload.data;
}

export const login = (email, password) => request("/login", {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }),
});
export const register = (email, password, username, phone) => request("/register", {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password, username, phone }),
});
export const uploadPhoto = (formData, { signal } = {}) => request("/predict", { method: "POST", headers: getAuthHeaders(), body: formData, signal });
export const getResult = (id, { signal } = {}) => request(`/results?id=${encodeURIComponent(id)}`, { signal });
