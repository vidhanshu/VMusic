import React from "react";
import Link from "next/link";
import { cn } from "@nextui-org/react";

import ROUTES from "@/routes";
import { getArtistAndArtistIdArray } from "@/utils/common";

const RenderArtistsAsLinks = ({
  artists,
  artistsIds,
  className,
}: {
  artists: string;
  artistsIds: string;
  className?: string;
}) => {
  if (typeof artists === "string" && typeof artistsIds === "string") {
    let artistMeta: { name: string; id: string }[] = [];
    artistMeta = getArtistAndArtistIdArray(artists, artistsIds);
    return (
      <>
        {artistMeta?.slice(0, 5)?.map((artist, index) => (
          <Link
            key={index}
            href={`${ROUTES.ARTISTS}/${artist.id}`}
            className={cn("hover:underline", className)}
          >
            {artist.name}
            {index != artistMeta?.length - 1 ? ", " : ""}
          </Link>
        ))}
      </>
    );
  }
  return null;
};

export default RenderArtistsAsLinks;
