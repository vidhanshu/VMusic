"use client";

import { Button, ScrollShadow } from "@nextui-org/react";

import AlbumPlaylistCard from "./album-playlist-card";

import useMusicContext from "@/contexts/music-context/use-music-context";
import ROUTES from "@/routes";
import Link from "next/link";

const LatestReleases = () => {
  const {
    data: { newReleases },
  } = useMusicContext();
  return (
    <div className="py-6">
      <div className="flex justify-between">
        <h1 className="mb-6 text-xl font-semibold">Latest Releases</h1>
        <Button size="sm" as={Link} href="/albums" variant="light">
          See all
        </Button>
      </div>
      <ScrollShadow hideScrollBar orientation="horizontal">
        <div className="flex gap-x-10">
          {newReleases
            .filter((item) => item.type === "album")
            .map((item, idx) => (
              <AlbumPlaylistCard
                href={`${ROUTES.ALBUMS}/${item.id}`}
                name={item.name}
                image={item.image?.[1]?.link}
                key={idx}
              />
            ))}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default LatestReleases;
