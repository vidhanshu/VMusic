import { MUSICS } from "@/utils/constants";
import React from "react";
import MusicCard from "./music-card";
import { ScrollShadow } from "@nextui-org/react";

const Trendings = () => {
  return (
    <div className="py-6">
      <div className="flex justify-between">
        <h1 className="mb-6 text-xl font-semibold">Trending</h1>
        <span className="w-[150px] cursor-pointer truncate text-center text-primary-100">
          See all
        </span>
      </div>
      <ScrollShadow hideScrollBar orientation="horizontal">
        <div className="flex gap-x-10">
          {MUSICS.trendingAlbums.map((item, idx) => (
            <MusicCard
              name={item.name}
              artists={item.artists.map((artist) => artist.name).join(", ")}
              image={item.image?.[1]?.link}
              key={idx}
            />
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default Trendings;
