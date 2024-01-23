"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Pause, Play, Shuffle } from "lucide-react";
import Typography from "@/components/common/Typography";
import { Button, Tooltip, cn } from "@nextui-org/react";

interface IDetailPageHeaderProps {
  image?: string;
  name?: string;
  artists?: string;
  artistsId?: string;
  year?: string;
  songCount: string;
}
const DetailPageHeader = ({
  image,
  name,
  artists,
  year,
  songCount,
  artistsId,
}: IDetailPageHeaderProps) => {
  const artistMeta = [];
  const ARTISTS = artists?.split(",").map((artist) => artist.trim()) ?? [];
  const ARTISTS_ID =
    artistsId?.split(",").map((artistId) => artistId.trim()) ?? [];

  for (let i = 0; i < ARTISTS.length; i++) {
    artistMeta.push({
      name: ARTISTS[i],
      id: ARTISTS_ID[i],
    });
  }

  return (
    <div
      className={cn(
        "flex gap-x-8 rounded-md bg-gradient-to-b from-primary-300 to-primary-900 p-2",
        name ? "items-end" : "items-center",
      )}
    >
      <Image
        src={image ?? "/vmusic.svg"}
        width={250}
        height={250}
        alt="album image"
        className="rounded-md shadow-lg"
      />
      {name ? (
        <div className="flex flex-col gap-4">
          <Typography
            variant="T_Bold_H1"
            className="max-h-[120px] max-w-full truncate text-wrap"
          >
            {name}
          </Typography>
          <Typography variant="T_Regular_H5">
            {artistMeta.map((artist, index) => (
              <Link
                key={index}
                href={`/artist/${artist.id}`}
                className="hover:underline"
              >
                {artist.name}
                {index != artistMeta.length - 1 ? ", " : ""}
              </Link>
            ))}{" "}
            . {year} . {songCount} song(s)
          </Typography>
          <div className="flex items-center gap-x-4">
            <Tooltip content="Play/Pause">
              <Button
                variant="solid"
                radius="full"
                size="lg"
                color="success"
                isIconOnly
                onClick={() => {
                  // TODO: play the album
                }}
                startContent={
                  true ? (
                    <Pause size={20} className="fill-white text-white" />
                  ) : (
                    <Play size={20} className="fill-white text-white" />
                  )
                }
              />
            </Tooltip>
            <Tooltip content="shuffle">
              <Button
                variant="solid"
                radius="full"
                size="lg"
                color="default"
                isIconOnly
                onClick={() => {
                  // TODO: play the album
                }}
                startContent={<Shuffle size={20} className="text-white" />}
              />
            </Tooltip>
          </div>
        </div>
      ) : (
        <Typography variant="T_Bold_H1">Sorry No Album found!</Typography>
      )}
    </div>
  );
};

export default DetailPageHeader;
