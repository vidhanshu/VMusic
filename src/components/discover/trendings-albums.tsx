"use client";

import { ScrollShadow } from "@nextui-org/react";

import AlbumCard from "./album-card";
import useMusicContext from "@/contexts/music-context/use-music-context";

const TrendingAlbums = () => {
  const {
    data: {
      trending,
    },
  } = useMusicContext();

  return (
    <div className="py-6">
      <div className="flex justify-between">
        <h1 className="mb-6 text-xl font-semibold">Trending Albums</h1>
        <span className="w-[150px] cursor-pointer truncate text-center text-primary-100">
          See all
        </span>
      </div>
      <ScrollShadow hideScrollBar orientation="horizontal">
        <div className="flex gap-x-10">
          {trending.albums.map((item, idx) => (
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

export default TrendingAlbums;
