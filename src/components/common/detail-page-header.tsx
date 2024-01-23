"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Tooltip, cn } from "@nextui-org/react";
import { ChevronLeft, Pause, Play, Shuffle } from "lucide-react";

import Typography from "@/components/common/Typography";

import {
  getArtistAndArtistIdArray,
  getShortNumberRepresentation,
  shuffleArray,
} from "@/utils/common/helpers";
import useMusicContext from "@/contexts/music-context/use-music-context";

import type NSMusic from "@/music";

interface IDetailPageHeaderProps {
  id?: string;
  image?: string;
  name?: string;
  artists?: string;
  artistsId?: string;
  year?: string;
  songCount: string;
  followers?: string;
  isAlbumHeader?: boolean;
  songs: NSMusic.IMusic[];
}
const DetailPageHeader = ({
  image,
  name,
  artists,
  year,
  songCount,
  artistsId,
  followers,
  id: originalListId,
  songs: ORIGINAL_SONGS,
  isAlbumHeader = false,
}: IDetailPageHeaderProps) => {
  let artistMeta: { name: string; id: string }[] = [];
  if (isAlbumHeader) {
    artistMeta = getArtistAndArtistIdArray(artists, artistsId);
  }
  const {
    setQueue,
    isPlaying,
    queue: { shuffle, id: qListId },
    setCurrentMusic,
    togglePlay,
  } = useMusicContext();
  const router = useRouter();

  const handleShuffle = () => {
    // if the current playlist/album is not in queue add it
    if (originalListId !== qListId) {
      const shuffledArray = shuffleArray(ORIGINAL_SONGS);
      // this also means that, the shuffle is inactive
      setQueue({
        shuffle: true,
        songs: shuffledArray,
        id: originalListId,
        activeIndex: 0,
      });
      // automatically start the first song in shuffled array
      setCurrentMusic(shuffledArray?.[0] ?? null);
    }
    // the current playlist/album is already in the queue
    else {
      // check if shuffle is active?
      if (shuffle) {
        setQueue({
          songs: ORIGINAL_SONGS,
          activeIndex: 0,
          shuffle: false,
        });
        // automatically start the first song in ORINGAL_ARRAY
        setCurrentMusic(ORIGINAL_SONGS?.[0] ?? null);
      } else {
        const shuffledArray = shuffleArray(ORIGINAL_SONGS);
        // this also means that, the shuffle is inactive
        setQueue({
          shuffle: true,
          songs: shuffledArray,
          activeIndex: 0,
        });
        // automatically start the first song in shuffled array
        setCurrentMusic(shuffledArray?.[0] ?? null);
      }
    }
  };

  const handlePlayAlbumOrPlayList = () => {
    // if current album/playlist already in queue
    if (originalListId === qListId) {
      togglePlay();
    } else {
      setQueue({
        songs: ORIGINAL_SONGS,
        activeIndex: 0,
        shuffle: false,
        id: originalListId,
      });
      setCurrentMusic(ORIGINAL_SONGS?.[0] ?? null);
    }
  };

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
                  onClick={handlePlayAlbumOrPlayList}
                  startContent={
                    isPlaying && originalListId === qListId ? (
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
                  color={
                    shuffle && originalListId === qListId
                      ? "success"
                      : "default"
                  }
                  isIconOnly
                  onClick={handleShuffle}
                  startContent={<Shuffle size={20} className="text-white" />}
                />
              </Tooltip>
            </div>
          </div>
        ) : (
          <Typography variant="T_Bold_H1">
            Sorry No {isAlbumHeader ? "Album" : "Playlist"} found!
          </Typography>
        )}
      </div>
    </>
  );
};

export default DetailPageHeader;
