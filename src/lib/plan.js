// Lifetime Pro is a one-time purchase. Price and perks live here so the
// pricing page, paywalls and navbar stay in sync.
export const LIFETIME = {
  name: "Lifetime Pro",
  price: 99,
  currency: "₹",
  label: "₹99",
  note: "one-time · yours forever",
};

export const PRO_FEATURES = [
  { icon: "text", title: "AI captions", text: "Ready-to-post captions for every photo in Hindi, English and Marathi." },
  { icon: "wand", title: "Caption styles", text: "Aesthetic, funny, romantic, savage or short — pick the vibe that fits." },
  { icon: "hash", title: "Hashtag packs", text: "Trending, mood-matched hashtags to copy with one tap." },
  { icon: "share", title: "Story cards", text: "Export your photo, song and caption as a share-ready Instagram story card." },
  { icon: "bolt", title: "Unlimited photos", text: "No result limits and priority processing at busy times." },
  { icon: "cloud", title: "Library sync", text: "Your saved playlists and captions follow your account across devices." },
];

export const COMPARISON = [
  { feature: "Songs for your photo", free: true, pro: true },
  { feature: "Hindi, English & Marathi tracks", free: true, pro: true },
  { feature: "Save playlists on this device", free: true, pro: true },
  { feature: "AI captions", free: false, pro: true },
  { feature: "Caption styles & tones", free: false, pro: true },
  { feature: "Hashtag packs", free: false, pro: true },
  { feature: "Story card export", free: false, pro: true },
  { feature: "Unlimited photos", free: "Limited", pro: true },
  { feature: "Library sync across devices", free: false, pro: true },
  { feature: "Every future Pro feature", free: false, pro: true },
];
