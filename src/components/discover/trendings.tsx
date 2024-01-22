"use client";

import React from "react";
import { ScrollShadow } from "@nextui-org/react";

import MusicCard from "./music-card";

import { MUSICS } from "@/utils/constants";
import useMusicContext from "@/contexts/music-context/use-music-context";

const Trendings = () => {
  const { setCurrentMusic } = useMusicContext();

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
          {MUSICS.trendingSongs.map((item, idx) => (
            <MusicCard
              handleOnClick={() => {
                setCurrentMusic(item as any);
              }}
              name={item.name}
              artists={item.primaryArtists}
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
