"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Pause, Play, Shuffle } from "lucide-react";
import { Button, Tooltip, cn } from "@nextui-org/react";

import Typography from "@/components/common/Typography";

import {
  getArtistAndArtistIdArray,
  getShortNumberRepresentation,
} from "@/utils/common/helpers";
import { useRouter } from "next/navigation";

interface IDetailPageHeaderProps {
  image?: string;
  name?: string;
  artists?: string;
  artistsId?: string;
  year?: string;
  songCount: string;
  followers?: string;
  isAlbumHeader?: boolean;
}
const DetailPageHeader = ({
  image,
  name,
  artists,
  year,
  songCount,
  artistsId,
  followers,
  isAlbumHeader = false,
}: IDetailPageHeaderProps) => {
  let artistMeta: { name: string; id: string }[] = [];
  if (isAlbumHeader) {
    artistMeta = getArtistAndArtistIdArray(artists, artistsId);
  }
  const router = useRouter();

  return (
    <>
      <Tooltip content="Back">
        <Button
          isIconOnly
          radius="full"
          onClick={() => router.back()}
          startContent={<ChevronLeft size={20} />}
          color="primary"
          className="mb-4 text-white"
        />
      </Tooltip>
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
              {isAlbumHeader ? (
                <>
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
                  . {year}
                </>
              ) : isNaN(Number(followers)) ? (
                0
              ) : (
                `${getShortNumberRepresentation(Number(followers))} followers`
              )}{" "}
              . {songCount} song(s)
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
    </>
  );
};

export default DetailPageHeader;
