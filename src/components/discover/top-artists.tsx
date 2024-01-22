import React from "react";

import { MUSICS } from "@/utils/constants";
import ArtistCard from "./artist-card";
import Typography from "@/components/common/Typography";

const TopArtists = () => {
  return (
    <div className="py-6">
      <div className="flex justify-between">
        <Typography variant="T_SemiBold_H4" className="mb-6">
          Trending Artists
        </Typography>
        <span className="w-[150px] cursor-pointer truncate text-center text-primary-100">
          See all
        </span>
      </div>
      <div className="flex flex-wrap justify-between gap-6">
        {MUSICS.artists.map((artist, idx) => (
          <ArtistCard
            id={artist.id}
            key={idx}
            name={artist.name}
            image="/pahadon-mein.jpg"
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
