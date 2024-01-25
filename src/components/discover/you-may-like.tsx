import React from "react";
import { ScrollShadow } from "@nextui-org/react";

import ArtistCard from "./artist-card";

import { ARTISTS } from "@/utils/constants";

const YouMayLike = () => {
  return (
    <div className="py-6">
      <div className="flex justify-between">
        <h1 className="mb-6 text-xl font-semibold">Top Artists</h1>
        <span className="cursor-pointer truncate text-center text-primary-100">
          See all
        </span>
      </div>
      <ScrollShadow hideScrollBar orientation="horizontal">
        <div className="flex gap-x-10">
          {ARTISTS.map((item, idx) => (
            <ArtistCard
              id={item.id}
              name={item.name?.replace(/&amp;/gi, "&")}
              image={item.image?.[1]?.link}
              key={idx}
            />
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default YouMayLike;
