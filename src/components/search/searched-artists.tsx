import React from "react";
import { ScrollShadow } from "@nextui-org/react";

import ArtistCard from "@/components/discover/artist-card";

import { decodeHTML } from "@/utils/common";

import type NSMusic from "@/music";

const SearchedArtists = ({ artists }: { artists: NSMusic.IArtist[] }) => {
  return (
    <div className="py-6">
      <h1 className="mb-6 text-xl font-semibold">Searched Artists</h1>
      <ScrollShadow hideScrollBar orientation="horizontal">
        <div className="flex gap-x-10">
          {artists.map((item, idx) => (
            <ArtistCard
              id={item.id}
              name={decodeHTML(item.title ?? item.name) ?? "Unknown Artist"}
              image={item.image?.[1]?.link}
              key={idx}
            />
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default SearchedArtists;
