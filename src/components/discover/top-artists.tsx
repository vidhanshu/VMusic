import { ARTISTS } from "@/utils/constants";
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
      <div className="flex flex-wrap gap-6">
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
