"use client";

import { HeartOff, Pause, Play, Share2 } from "lucide-react";
import { Button, Tooltip, cn } from "@nextui-org/react";

import Typography from "@/components/common/Typography";

import useMusicContext from "@/contexts/music-context/use-music-context";

import { formattedTime, getSongFromLikedSong } from "@/utils/common";
import { SONG_LIST_ITEM_ANIMATION } from "@/utils/common";
import { decodeHTML } from "@/utils/common";

import { useCopyToClipboard, useMediaQuery } from "usehooks-ts";
import useAudioPlayerContext from "@/contexts/audio-player-context/use-audio-player-context";
import { toast } from "sonner";
import React from "react";
import RenderArtistsAsLinks from "../common/render-artists-as-link";
import { Song } from "@prisma/client";
import { useSession } from "next-auth/react";

export const LikedSongListItem = ({
  song,
  showShareSongButton = true,
  handleUnLike,
  showDuration = true,
}: {
  song: Song;
  idx: number;
  showDuration?: boolean;
  animate?: boolean;
  handleUnLike: (song: Song) => Promise<void>;
  showShareSongButton?: boolean;
}) => {
  const [_, copyFn] = useCopyToClipboard();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { currentMusic, inQueueMap } = useMusicContext();
  const { isPlaying, setIsPlaying, playThisSong } = useAudioPlayerContext();

  const isCurrentSongPlaying = currentMusic?.id === song.id;
  const inQ = inQueueMap[song.id];

  const handlePlay = async () => {
    if (isCurrentSongPlaying) {
      setIsPlaying(false);
      return;
    }
    playThisSong(getSongFromLikedSong(song));
  };
  return (
    <div
      {...SONG_LIST_ITEM_ANIMATION}
      className={cn(
        "group flex grid-cols-2 justify-between rounded-md bg-primary-500 p-2 md:grid",
        isCurrentSongPlaying &&
          "bg-gradient-to-r from-slate-300 to-zinc-100 dark:from-primary-200 dark:to-primary-300",
      )}
    >
      <div className="flex items-center gap-x-2">
        <Tooltip className="hidden" content="Play/Pause">
          <div className="flex min-h-10 min-w-10 items-center justify-center">
            <Button
              className={cn(
                isCurrentSongPlaying ? "flex" : "md:hidden md:group-hover:flex",
              )}
              size={isMobile ? "sm" : "md"}
              variant="solid"
              radius="full"
              color="success"
              isIconOnly
              onClick={handlePlay}
              startContent={
                isCurrentSongPlaying && isPlaying ? (
                  <Pause size={16} className="fill-white text-white" />
                ) : (
                  <Play size={16} className="fill-white text-white" />
                )
              }
            />
          </div>
        </Tooltip>

        <div className="flex gap-x-2">
          <img
            className="h-[50px] w-[50px] rounded-sm object-cover"
            src={song.image ?? "/vmusic.svg"}
            width={50}
            height={50}
            alt={song.name}
          />
          <div>
            <Typography
              variant="T_SemiBold_H6"
              className="max-w-[100px] truncate sm:max-w-[150px] md:max-w-[300px]"
            >
              {decodeHTML(song.name)}
            </Typography>
            <Typography
              className="max-w-[100px] truncate sm:max-w-[150px] md:max-w-[300px]"
              variant="T_Regular_H7"
              color={!isCurrentSongPlaying ? "secondary" : "primary"}
            >
              <RenderArtistsAsLinks
                artists={song?.primaryArtists ?? ""}
                artistsIds={song?.primaryArtistsId ?? ""}
              />
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div className="flex items-center justify-end gap-x-4">
          <Tooltip content={"Remove from Queue"}>
            <Button
              size="sm"
              isIconOnly
              radius="full"
              variant="solid"
              color="danger"
              className={inQ ? "text-white" : ""}
              onClick={async () => {
                await handleUnLike(song);
              }}
              startContent={<HeartOff size={16} />}
            />
          </Tooltip>
          {showDuration && (
            <Typography className="mr-2 md:mr-0" variant="T_SemiBold_H6">
              {formattedTime(Number(song.duration))}
            </Typography>
          )}
          {showShareSongButton && (
            <Tooltip content={`Share this song`}>
              <Button
                size="sm"
                isIconOnly
                radius="full"
                color="secondary"
                variant="solid"
                className="text-white"
                onClick={async () => {
                  await copyFn(
                    `${window.location.origin}?song=${currentMusic?.id}`,
                  );
                  toast.success("Link copied!");
                }}
                startContent={<Share2 size={16} />}
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};
