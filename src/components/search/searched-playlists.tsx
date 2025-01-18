"use client";

import React from "react";
import { ScrollShadow } from "@nextui-org/react";

import AlbumPlaylistCard from "@/components/discover/album-playlist-card";

import type NSMusic from "@/music";
import { getMusicImageUrl } from "@/utils/common";

const SearchedPlaylists = ({
  playlists,
}: {
  playlists: NSMusic.IPlaylist[];
}) => {
  return (
    <div className="py-6">
      <h1 className="mb-6 text-xl font-semibold">Top Playlists</h1>
      <ScrollShadow hideScrollBar orientation="horizontal">
        <div className="flex gap-x-10">
          {playlists.map((item, idx) => (
            <AlbumPlaylistCard
              href={`/playlists/${item.id}/#`}
              name={item.name ?? item.title}
              image={getMusicImageUrl(item.image)}
              key={idx}
            />
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default SearchedPlaylists;
