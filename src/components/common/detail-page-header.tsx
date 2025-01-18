"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Tooltip, cn } from "@nextui-org/react";
import { ChevronLeft, Pause, Play, Share2, Shuffle } from "lucide-react";
import { motion as m } from "framer-motion";

import Typography from "@/components/common/Typography";
import RenderArtistsAsLinks from "./render-artists-as-link";

import {
  decodeHTML,
  getShortNumberRepresentation,
  shuffleArray,
} from "@/utils/common";

import useMusicContext from "@/contexts/music-context/use-music-context";

import type NSMusic from "@/music";
import useAudioPlayerContext from "@/contexts/audio-player-context/use-audio-player-context";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "sonner";

interface IDetailPageHeaderProps {
  id?: string;
  image?: string;
  name?: string;
  artists?: string;
  artistsId?: string;
  year?: string;
  songCount: string;
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
  id: originalListId,
  songs: ORIGINAL_SONGS,
  isAlbumHeader = false,
}: IDetailPageHeaderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copyFn] = useCopyToClipboard();
  const router = useRouter();

  const {
    setQueue,
    queue: { shuffle, id: qListId },
  } = useMusicContext();
  const { isPlaying, togglePlay, playThisSong } = useAudioPlayerContext();

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
        type: isAlbumHeader ? "album" : "playlist",
      });
      // automatically start the first song in shuffled array
      playThisSong(shuffledArray?.[0] ?? null);
    }
    // the current playlist/album is already in the queue
    else {
      // check if shuffle is active?
      if (shuffle) {
        setQueue({
          songs: ORIGINAL_SONGS,
          activeIndex: 0,
          shuffle: false,
          type: isAlbumHeader ? "album" : "playlist",
        });
        // automatically start the first song in ORINGAL_ARRAY
        playThisSong(ORIGINAL_SONGS?.[0] ?? null);
      } else {
        const shuffledArray = shuffleArray(ORIGINAL_SONGS);
        // this also means that, the shuffle is inactive
        setQueue({
          shuffle: true,
          songs: shuffledArray,
          activeIndex: 0,
          type: isAlbumHeader ? "album" : "playlist",
        });
        // automatically start the first song in shuffled array
        playThisSong(shuffledArray?.[0] ?? null);
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
        type: isAlbumHeader ? "album" : "playlist",
      });
      playThisSong(ORIGINAL_SONGS?.[0] ?? null);
    }
  };

  return (
    <>
      <div
        className={cn(
          "mb-6 flex gap-8 rounded-md bg-gradient-to-b from-zinc-200 to-zinc-50 p-2 dark:from-primary-300 dark:to-primary-900 md:flex-row",
          "flex-col items-center md:items-end",
          name ? "items-end" : "items-center",
        )}
      >
        <m.div
          initial={{ opacity: 0, scale: 0.5, x: -100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="relative"
        >
          <img
            src={image ?? "/vmusic.svg"}
            width={250}
            height={250}
            alt="album image"
            className="h-auto rounded-md shadow-lg md:min-w-[250px]"
          />

          <div className="absolute left-4 top-4">
            <Tooltip content="Back">
              <Button
                isIconOnly
                variant="shadow"
                radius="full"
                onClick={() => router.back()}
                startContent={<ChevronLeft size={20} />}
                color="primary"
                className="mb-4 text-white"
              />
            </Tooltip>
          </div>
        </m.div>
        {name ? (
          <div className="flex flex-col gap-2 md:gap-4">
            <Typography
              variant="T_Bold_H1"
              className="max-h-[120px] max-w-full truncate text-wrap text-center md:text-left"
            >
              {decodeHTML(name)}
            </Typography>
            <Typography
              className="text-center md:text-left"
              variant="T_Regular_H5"
            >
              {isAlbumHeader ? (
                <>
                  {artists?.length && (
                    <>
                      {
                        <RenderArtistsAsLinks
                          artists={artists ?? ""}
                          artistsIds={artistsId ?? ""}
                        />
                      }
                      {" . "}
                    </>
                  )}
                  {year}
                  {" . "}
                </>
              ) : null}{" "}
              {songCount} song(s)
            </Typography>
            <div className="flex items-center justify-center gap-x-4 md:justify-normal">
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
              <Tooltip content="Share">
                <Button
                  variant="solid"
                  radius="full"
                  color="secondary"
                  size="lg"
                  isIconOnly
                  onClick={async () => {
                    await copyFn(window.location.href);
                    toast.success("Copied to clipboard!");
                  }}
                  startContent={<Share2 size={20} className="text-white" />}
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
