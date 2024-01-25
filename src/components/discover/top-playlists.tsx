"use client";

import React from "react";
import { ScrollShadow } from "@nextui-org/react";

import AlbumPlaylistCard from "./album-playlist-card";

import useMusicContext from "@/contexts/music-context/use-music-context";
import ROUTES from "@/routes";

const TopPlaylists = () => {
  const {
    data: { topPlaylists },
  } = useMusicContext();
  return (
    <div className="py-6">
      <div className="flex justify-between">
        <h1 className="mb-6 text-xl font-semibold">Top Playlists</h1>
        <span className="cursor-pointer truncate text-center text-primary-100">
          See all
        </span>
      </div>
      <ScrollShadow hideScrollBar orientation="horizontal">
        <div className="flex gap-x-10">
          {topPlaylists.map((item, idx) => (
            <AlbumPlaylistCard
              href={`${ROUTES.PLAYLISTS}/${item.id}/#`}
              name={item.title}
              image={item.image?.[1]?.link}
              key={idx}
            />
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default TopPlaylists;
