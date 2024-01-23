"use server";

import type NSMusic from "@/music";
import { REVALIDATE } from "@/utils/common/constants";

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
export const getHomeData = async () => {
  try {
    const data = await fetch(
      "https://saavn.me/modules?language=hindi,english,punjabi",
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
