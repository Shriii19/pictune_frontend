// The stage name is sent to the backend on register, but login only returns a
// token, so the name is also remembered per email on this device.
const CURRENT = "pictune-name";
const BY_EMAIL = "pictune-names";
const WELCOME = "pictune-welcome";

export const STAGE_NAME_IDEAS = [
  "DJ Chai", "Sunset Sufi", "Monsoon Mixtape", "Filter Kaapi", "Golden Hour Guru",
  "Vada Pav Vinyl", "Midnight Masala", "Lo-fi Lassi", "Rooftop Raag", "Cutting Chai Club",
];

export const MIN_NAME = 2;
export const MAX_NAME = 30;

export function cleanName(value = "") {
  return value.replace(/\s+/g, " ").trim();
}

function readMap() {
  try { return JSON.parse(localStorage.getItem(BY_EMAIL) || "{}") || {}; }
  catch { return {}; }
}

// "shree.patil99@x.com" → "Shree"
function nameFromEmail(email = "") {
  const part = email.split("@")[0].split(/[._\-+\d]+/).find(Boolean);
  return part ? part[0].toUpperCase() + part.slice(1, MAX_NAME) : "";
}

function emailFromToken(token) {
  try { return JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))).email || ""; }
  catch { return ""; }
}

export function rememberName(email, name) {
  try { localStorage.setItem(BY_EMAIL, JSON.stringify({ ...readMap(), [email.toLowerCase()]: name })); }
  catch { /* The greeting falls back to the email name. */ }
}

export function nameForEmail(email = "") {
  return readMap()[email.toLowerCase()] || nameFromEmail(email);
}

export function readCurrentName(token) {
  try { return localStorage.getItem(CURRENT) || (token ? nameForEmail(emailFromToken(token)) : ""); }
  catch { return ""; }
}

export function storeCurrentName(name) {
  try { name ? localStorage.setItem(CURRENT, name) : localStorage.removeItem(CURRENT); }
  catch { /* Name stays in memory for this visit. */ }
}

export function queueWelcome(kind) {
  try { sessionStorage.setItem(WELCOME, kind); }
  catch { /* No welcome note if storage is blocked. */ }
}

export function peekWelcome() {
  try { return sessionStorage.getItem(WELCOME); }
  catch { return null; }
}

export function clearWelcome() {
  try { sessionStorage.removeItem(WELCOME); }
  catch { /* Nothing to clear. */ }
}
