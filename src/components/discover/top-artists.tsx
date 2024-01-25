import ArtistCard from "./artist-card";
import Typography from "@/components/common/Typography";

import { ARTISTS } from "@/utils/common";

const TopArtists = () => {
  return (
    <div className="py-6">
      <div className="flex justify-between">
        <Typography variant="T_SemiBold_H4" className="mb-6">
          Trending Artists
        </Typography>
        <span className="cursor-pointer truncate text-center text-primary-100">
          See all
        </span>
      </div>
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 place-items-center">
        {ARTISTS.map((artist, idx) => (
          <ArtistCard
            id={artist.id}
            key={idx}
            name={artist.name}
            image={artist.image?.[1]?.link}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
