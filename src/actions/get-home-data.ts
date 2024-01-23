"use server";

import type NSMusic from "@/music";

export const getHomeData = async () => {
  const data = await fetch(
    "https://saavn.me/modules?language=hindi,english,punjabi",
    {
      next: {
        // revalidate every 12 hours
        revalidate: 43200,
      },
    },
  );
  const json = (await data.json()) as {
    data: {
      albums: NSMusic.IMusic[];
      charts: NSMusic.IChart[];
      playlists: NSMusic.IPlaylist[];
      trending: {
        songs: NSMusic.IMusic[];
        albums: NSMusic.IAlbum[];
      };
    };
  };
  return json.data ?? {};
};
