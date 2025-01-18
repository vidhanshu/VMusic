"use client";

import { ScrollShadow } from "@nextui-org/react";

import AlbumPlaylistCard from "@/components/discover/album-playlist-card";

import type NSMusic from "@/music";
import ROUTES from "@/routes";
import { getMusicImageUrl } from "@/utils/common";

const SearchedAlbums = ({ albums }: { albums: NSMusic.IAlbum[] }) => {
  return (
    <div className="py-6">
      <h1 className="mb-6 text-xl font-semibold">Searched Albums</h1>
      <ScrollShadow hideScrollBar orientation="horizontal">
        <div className="flex gap-x-10">
          {albums.map((item, idx) => (
            <AlbumPlaylistCard
              href={`${ROUTES.ALBUMS}/${item.id}`}
              name={item?.name ?? item.title}
              image={getMusicImageUrl(item.image)}
              key={idx}
            />
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default SearchedAlbums;
