"use client";

import { ScrollShadow } from "@nextui-org/react";

import AlbumCard from "../discover/album-card";

import type NSMusic from "@/music";

const SearchedAlbums = ({ albums }: { albums: NSMusic.IAlbum[] }) => {
  return (
    <div className="py-6">
      <h1 className="mb-6 text-xl font-semibold">Searched Albums</h1>
      <ScrollShadow hideScrollBar orientation="horizontal">
        <div className="flex gap-x-10">
          {albums.map((item, idx) => (
            <AlbumCard
              href={`/album/${item.id}`}
              name={item.name}
              image={item.image?.[1]?.link}
              key={idx}
            />
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default SearchedAlbums;
