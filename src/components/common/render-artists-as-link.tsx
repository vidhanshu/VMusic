import React from "react";
import type NSMusic from "@/music";
import { getArtistAndArtistIdArray } from "@/utils/common/helpers";
import Link from "next/link";
import { cn } from "@nextui-org/react";

const RenderArtistsAsLinks = ({
  artists,
  artistsIds,
  className,
}: {
  artists: NSMusic.IMusic["primaryArtists"];
  artistsIds: NSMusic.IMusic["primaryArtistsId"];
  className?: string;
}) => {
  if (typeof artists !== "string" && typeof artistsIds !== "string") {
    return null;
  }
  const artistMeta = getArtistAndArtistIdArray(
    artists as string,
    artistsIds as string,
  );

  return (
    <>
      {artistMeta?.slice(0, 5)?.map((artist, index) => (
        <Link
          key={index}
          href={`/artist/${artist.id}`}
          className={cn("hover:underline", className)}
        >
          {artist.name}
          {index != artistMeta?.length - 1 ? ", " : ""}
        </Link>
      ))}
    </>
  );
};

export default RenderArtistsAsLinks;
