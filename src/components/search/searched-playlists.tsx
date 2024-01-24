"use client";

import React from "react";
import { ScrollShadow } from "@nextui-org/react";

import AlbumCard from "../discover/album-card";

import type NSMusic from "@/music";

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
            <AlbumCard
              href={`/playlists/${item.id}/#`}
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

export default SearchedPlaylists;
