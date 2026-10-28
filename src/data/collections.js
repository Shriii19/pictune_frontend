const image = (id, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const moods = [
  { id: "dreamy", label: "Dreamy", icon: "moon", color: "#b8a4db" },
  { id: "happy", label: "Upbeat", icon: "sun", color: "#edbd74" },
  { id: "energetic", label: "Energetic", icon: "bolt", color: "#dca08c" },
  { id: "calm", label: "Calm", icon: "leaf", color: "#a5bd9c" },
];

export const collections = [
  { id: "golden", title: "Golden hour", subtitle: "Dreamy", mood: "dreamy", tag: "Dreamy", image: image("photo-1470252649378-9c29740c9fa8"), colors: ["#e8b56b", "#a37d67", "#696b55", "#d9c6a5"] },
  { id: "coast", title: "By the sea", subtitle: "Calm", mood: "calm", tag: "Calm", image: image("photo-1473116763249-2faaef81ccda"), colors: ["#a8c4c0", "#769da6", "#e2dac6", "#546f73"] },
  { id: "city", title: "After hours", subtitle: "For the nights that stay with you.", mood: "energetic", tag: "Electric & alive", image: image("photo-1519608487953-e999c86e7455"), colors: ["#725b91", "#b095b8", "#272f49", "#dfaaa4"] },
  { id: "forest", title: "Out of town", subtitle: "Upbeat", mood: "happy", tag: "Upbeat", image: image("photo-1441974231531-c6227db76b6e"), colors: ["#71856b", "#a9ac7e", "#374b38", "#d4c9a6"] },
];

const song = (title, artist, language, duration, cover) => ({ title, artist, language, duration, cover: image(cover, 120), url: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${artist} ${title} official audio`)}` });

export const tracks = {
  dreamy: [song("Sunset Lover", "Petit Biscuit", "english", "3:57", "photo-1470252649378-9c29740c9fa8"), song("Kho Gaye Hum Kahan", "Jasleen Royal, Prateek Kuhad", "hindi", "3:33", "photo-1500534623283-312aade485b7"), song("Space Song", "Beach House", "english", "5:20", "photo-1464822759023-fed622ff2c3b"), song("Kasoor", "Prateek Kuhad", "hindi", "3:17", "photo-1441974231531-c6227db76b6e")],
  calm: [song("Bloom", "The Paper Kites", "english", "3:30", "photo-1441974231531-c6227db76b6e"), song("Shaam", "Amit Trivedi, Nikhil D’Souza", "hindi", "4:44", "photo-1470252649378-9c29740c9fa8"), song("Holocene", "Bon Iver", "english", "5:36", "photo-1464822759023-fed622ff2c3b"), song("Iktara", "Kavita Seth, Amit Trivedi", "hindi", "4:13", "photo-1500534623283-312aade485b7")],
  energetic: [song("Midnight City", "M83", "english", "4:03", "photo-1519608487953-e999c86e7455"), song("Ilahi", "Arijit Singh", "hindi", "3:48", "photo-1464822759023-fed622ff2c3b"), song("The Less I Know the Better", "Tame Impala", "english", "3:36", "photo-1470252649378-9c29740c9fa8"), song("Udd Gaye", "Ritviz", "hindi", "3:00", "photo-1441974231531-c6227db76b6e")],
  happy: [song("Sunday Best", "Surfaces", "english", "2:38", "photo-1470252649378-9c29740c9fa8"), song("Love You Zindagi", "Jasleen Royal, Amit Trivedi", "hindi", "3:52", "photo-1441974231531-c6227db76b6e"), song("Put Your Records On", "Corinne Bailey Rae", "english", "3:35", "photo-1500534623283-312aade485b7"), song("Khaabon Ke Parinday", "Alyssa Mendonsa, Mohit Chauhan", "hindi", "4:13", "photo-1464822759023-fed622ff2c3b")],
};

export function createPlaylist(collection, mood, language = "all") {
  return {
    id: `${collection.id}-${mood}-${language}`,
    title: collection.title,
    image: collection.image,
    mood,
    language,
    colors: collection.colors || collections[0].colors,
    songs: tracks[mood].filter(track => language === "all" || track.language === language),
  };
}
