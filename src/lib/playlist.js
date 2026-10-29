export function toPlaylist(result, { title = "Photo playlist", image } = {}) {
  if (!result || !/^[a-f0-9]{64}$/.test(result.id) || !Array.isArray(result.songs) || result.songs.length === 0 || !result.analysis?.source) {
    throw new Error("PicTune returned an incomplete photo result. Please retry.");
  }
  return {
    ...result, title, image,
    songs: result.songs.map(song => ({ ...song, url: song.youtubeSearchUrl })),
  };
}
