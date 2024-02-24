"use server";

import type NSMusic from "@/music";
import { BASE_API_URL, REVALIDATE } from "@/utils/common";

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
    const data = await fetch(
      `${BASE_API_URL}/modules?language=hindi,english,punjabi`,
      {
        next: {
          // revalidate every 12 hours
          revalidate: REVALIDATE,
        },
      },
    );
    const json = (await data.json()) as { data: ReturnType["data"] };
    return json.data ?? null;
  } catch (error) {
    return {} as ReturnType["data"];
  }
};

export default getHomeData;