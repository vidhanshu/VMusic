"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion as m } from "framer-motion";
import { ListMusic, Play, X } from "lucide-react";
import { Button, Tooltip, cn } from "@nextui-org/react";

import Typography from "./Typography";
import SongMetaCard from "./song-meta-card";
import RenderArtistsAsLinks from "./render-artists-as-link";
import AudioPlayer, { type IAudioPlayerProps } from "./audio-player";

import useMusicContext from "@/contexts/music-context/use-music-context";

import { RIGHT_SONG_PLAYER_ANIMATION } from "@/utils/common";
import {
  decodeHTML,
  getArtistName,
  getLinkByQueueType,
} from "@/utils/common";

const RightSideBar = (props: IAudioPlayerProps) => {
  const {
    currentMusic,
    setIsRightSidebarOpen,
    isRightSidebarOpen,
    queue: { songs, activeIndex, id: qId, type },
    nextSong,
  } = useMusicContext();

  const NEXT_SONG = songs?.length
    ? songs[(activeIndex + 1) % songs.length]
    : null;

  const isAlbum = songs[0]?.album?.id === qId;

  return (
    <m.div
      {...RIGHT_SONG_PLAYER_ANIMATION}
      className={cn(
        "h-[calc(100vh-65px-73px)] md:w-fit bg-background/90 p-4 shadow-md backdrop-blur-md md:border-l-[2px] md:border-primary-500",
        "w-screen",
        isRightSidebarOpen && "h-[calc(100vh-73px)]",
      )}
    >
      <div className="flex justify-between">
        <Tooltip content={`Got to ${isAlbum ? "album" : "playlist"}`}>
          <Button
            size="sm"
            as={Link}
            isIconOnly
            radius="full"
            color="success"
            variant="solid"
            className="text-white"
            href={getLinkByQueueType(type, qId)}
            startContent={<ListMusic size={16} />}
          />
        </Tooltip>
        <Button
          size="sm"
          isIconOnly
          className="bg-primary-50"
          startContent={<X className="text-white" size={16} />}
          onClick={() => setIsRightSidebarOpen(false)}
        />
      </div>
      <div className="space-y-4 py-2">
        <div>
          <Typography
            className="mx-auto max-w-[300px] truncate text-center"
            variant="T_SemiBold_H4"
          >
            {decodeHTML(currentMusic?.name ?? "Please play a song")}
          </Typography>
          <Typography
            className="mx-auto max-w-[300px] truncate text-center"
            variant="T_Regular_H7"
            color="secondary"
          >
            {!currentMusic?.primaryArtists &&
            !currentMusic?.primaryArtistsId ? (
              "Unknown"
            ) : (
              <RenderArtistsAsLinks
                artists={currentMusic?.primaryArtists ?? ""}
                artistsIds={currentMusic?.primaryArtistsId ?? ""}
              />
            )}
            {getArtistName(currentMusic?.primaryArtists) ?? "Unknown"}
          </Typography>
        </div>
        <Image
          className="mx-auto aspect-square h-auto w-[300px] rounded-lg object-cover"
          src={currentMusic?.image?.[2]?.link ?? "/vmusic.svg"}
          width={300}
          height={300}
          alt="music image"
        />
      </div>
      {/* controls */}
      <AudioPlayer {...props} />
      {/* next in the queue */}
      <div className="mt-6">
        <Typography variant="T_Regular_H6">Next in queue</Typography>
        <SongMetaCard
          fullWidth
          onClick={nextSong}
          className="mt-4 flex justify-between gap-x-4 p-8"
          endContent={<Play size={16} className="text-black dark:text-white" />}
          artist={getArtistName(NEXT_SONG?.primaryArtists) ?? "Unknown artist"}
          image={NEXT_SONG?.image?.[0]?.link}
          name={NEXT_SONG?.name}
        />
      </div>
    </m.div>
  );
};

export default RightSideBar;
