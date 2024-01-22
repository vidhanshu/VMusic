import React from "react";
import { ScrollShadow } from "@nextui-org/react";

import { MUSICS } from "@/utils/constants";
import AlbumCard from "./album-card";

const TopPlaylists = () => {
  return (
    <div className="py-6">
      <div className="flex justify-between">
        <h1 className="mb-6 text-xl font-semibold">Top Playlists</h1>
        <span className="w-[150px] cursor-pointer truncate text-center text-primary-100">
          See all
        </span>
      </div>
      <ScrollShadow hideScrollBar orientation="horizontal">
        <div className="flex gap-x-10">
          {MUSICS.playlists.map((item, idx) => (
            <AlbumCard
              id={item.id}
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
