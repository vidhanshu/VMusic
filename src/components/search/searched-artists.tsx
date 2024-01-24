import React from "react";
import { ScrollShadow } from "@nextui-org/react";

import ArtistCard from "../discover/artist-card";
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

export default SearchedArtists;
