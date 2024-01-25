import Image from "next/image";
import { motion as m } from "framer-motion";
import { Download, Pause, Play } from "lucide-react";
import { Button, Tooltip, cn } from "@nextui-org/react";

import Typography from "@/components/common/Typography";
import RenderArtistsAsLinks from "../render-artists-as-link";

import useMusicContext from "@/contexts/music-context/use-music-context";

import { formattedTime } from "@/utils/common";
import { SONG_LIST_ITEM_ANIMATION } from "@/utils/common";
import { decodeHTML, downloadSong, getMusicUrl } from "@/utils/common";

import type NSMusic from "@/music";

export const SongListItem = ({
  song,
  idx,
  handleSongClick,
  showPlayCount = true,
  pagination,
}: {
  song: NSMusic.IMusic;
  idx: number;
  handleSongClick: (idx: number, id: string) => void;
  showPlayCount?: boolean;
  pagination?: {
    page: number;
  };
}) => {
  const { currentMusic, isPlaying } = useMusicContext();

  const isCurrentSongPlaying = currentMusic?.id === song.id;
  return (
    <m.div
      {...SONG_LIST_ITEM_ANIMATION}
      className={cn(
        "group flex grid-cols-2 justify-between rounded-md bg-primary-500 p-2 md:grid",
        isCurrentSongPlaying &&
          "bg-gradient-to-r from-slate-300 to-zinc-100 dark:from-primary-200 dark:to-primary-300",
        showPlayCount && "grid-cols-3",
      )}
    >
      <div className="flex items-center gap-x-2">
        <Tooltip content="Play/Pause">
          <div className="flex min-h-10 min-w-10 items-center justify-center">
            <Button
              className={cn(
                isCurrentSongPlaying ? "flex" : "md:hidden md:group-hover:flex",
              )}
              size="sm"
              variant="solid"
              radius="full"
              color="success"
              isIconOnly
              onClick={handleSongClick.bind(null, idx, song.id)}
              startContent={
                isCurrentSongPlaying && isPlaying ? (
                  <Pause size={16} className="fill-white text-white" />
                ) : (
                  <Play size={16} className="fill-white text-white" />
                )
              }
            />
            <div className="hidden md:block">
              {!isCurrentSongPlaying && (
                <Typography
                  variant="T_SemiBold_H5"
                  className="block group-hover:hidden"
                >
                  {pagination
                    ? (pagination.page - 1) * 10 + (idx + 1)
                    : idx + 1}
                </Typography>
              )}
            </div>
          </div>
        </Tooltip>

        <div className="flex gap-x-2">
          <Image
            className="h-[50px] w-[50px] rounded-sm object-cover"
            src={song.image?.[0]?.link ?? "/vmusic.svg"}
            width={50}
            height={50}
            alt={song.name}
          />
          <div>
            <Typography
              variant="T_SemiBold_H6"
              className="max-w-[150px] truncate md:max-w-[300px]"
            >
              {decodeHTML(song.name)}
            </Typography>
            <Typography
              className="max-w-[150px] truncate md:max-w-[300px]"
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
      {showPlayCount && (
        <div className="hidden items-center justify-center md:flex">
          <Typography>
            {Number(song.playCount).toLocaleString("en-US")}
          </Typography>
        </div>
      )}
      <div className="flex items-center justify-end gap-x-4">
        <Typography className="mr-2 md:mr-0" variant="T_SemiBold_H6">
          {formattedTime(Number(song.duration))}
        </Typography>
        <Button
          className="hidden md:flex"
          variant="solid"
          radius="full"
          color="success"
          size="sm"
          isIconOnly
          onClick={() => {
            downloadSong(getMusicUrl(song.downloadUrl));
          }}
          startContent={<Download size={16} className="text-white" />}
        />
      </div>
    </m.div>
  );
};
