/* eslint-disable */

"use server";

import type NSMusic from "@/music";
import { BASE_API_URL } from "@/utils/common";
import axios from "axios";

interface ReturnType {
  data: {
    albums: NSMusic.IMusic[];
    charts: NSMusic.IChart[];
    playlists: NSMusic.IPlaylist[];
    trending: {
      songs: NSMusic.IMusic[];
      albums: NSMusic.IAlbum[];
    };
  };
}
const getHomeData = async () => {
  try {
    const [latestPlaylists, latestAlbums, topPlaylists, trendingAlbums] =
      await Promise.all([
        axios(`${BASE_API_URL}/search/playlists?query=hindi`),
        axios(`${BASE_API_URL}/search/albums?query=latest`),
        axios(`${BASE_API_URL}/search/playlists?query=top`),
        axios(
          `${BASE_API_URL}/search/albums?query=${new Date().getFullYear()}`,
        ),
      ]);

    const json: { data: ReturnType["data"] } = {
      data: {
        playlists: latestPlaylists.data.data.results,
        charts: topPlaylists.data.data.results,
        albums: latestAlbums.data.data.results,
        trending: {
          songs: [],
          albums: trendingAlbums.data.data.results,
        },
      },
    };
    return json.data ?? null;
  } catch (error) {
    return {} as ReturnType["data"];
  }
};

export default getHomeData;
