"use client";

import { Button, ScrollShadow } from "@nextui-org/react";

import AlbumPlaylistCard from "./album-playlist-card";

import useMusicContext from "@/contexts/music-context/use-music-context";

import type NSMusic from "@/music";
import ROUTES from "@/routes";
import Link from "next/link";

const TrendingAlbums = ({
  albums,
  title = "Trending Album",
  isGridView = false,
  showHeader = true,
}: {
  albums?: NSMusic.IAlbum[];
  title?: string;
  isGridView?: boolean;
  showHeader?: boolean;
}) => {
  const {
    data: { trending },
  } = useMusicContext();

  const ALBUMS = albums ?? trending.albums;

  return (
    <div className="py-6">
      {showHeader && (
        <div className="flex justify-between">
          <h1 className="mb-6 text-xl font-semibold">{title}</h1>
          <Button size="sm" as={Link} href="/albums" variant="light">
            See all
          </Button>
        </div>
      )}
      {isGridView ? (
        <div className="grid grid-cols-2 place-items-center gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {ALBUMS.map((item, idx) => (
            <AlbumPlaylistCard
              href={`${ROUTES.ALBUMS}/${item.id}`}
              name={item.name}
              image={item.image?.[1]?.link}
              key={idx}
            />
          ))}
        </div>
      ) : (
        <ScrollShadow hideScrollBar orientation="horizontal">
          <div className="flex gap-x-10">
            {ALBUMS.map((item, idx) => (
              <AlbumPlaylistCard
                href={`${ROUTES.ALBUMS}/${item.id}`}
                name={item.name}
                image={item.image?.[1]?.link}
                key={idx}
              />
            ))}
          </div>
        </ScrollShadow>
      )}
    </div>
  );
};

export default TrendingAlbums;
