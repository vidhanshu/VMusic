import getAlbumById from "./get-album-by-id";
import getArtistById from "./get-artist-by-id";
import getAlbumsByArtistId from "./get-artist-albums";
import getSongsByArtistId from "./get-artist-songs";
import getHomeData from "./get-home-data";
import getLyricsById from "./get-lyrics-by-id";
import getPlaylistById from "./get-playlist-by-id";
import getSongById from "./get-song-by-id";
import search from "./search";

export {
  getAlbumById,
  getArtistById,
  getAlbumsByArtistId,
  getSongsByArtistId,
  getHomeData,
  getLyricsById,
  getPlaylistById,
  getSongById,
  search as searchByQuery,
};
