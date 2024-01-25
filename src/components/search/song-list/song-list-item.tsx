import Image from "next/image";
import { Download, Pause, Play } from "lucide-react";
import { Button, Tooltip, cn } from "@nextui-org/react";

import Typography from "@/components/common/Typography";

import {
  downloadSong,
  getArtistName,
  getMusicUrl,
} from "@/utils/common";

import useMusicContext from "@/contexts/music-context/use-music-context";

import type NSMusic from "@/music";

export const SongListItem = ({
  song,
  idx,
  handleSongClick,
}: {
  song: NSMusic.IMusic;
  idx: number;
  handleSongClick: (idx: number) => void;
}) => {
  const { currentMusic, isPlaying } = useMusicContext();

  const artists = getArtistName(song.primaryArtists ?? "Unknown");
  const isCurrentSongPlaying = currentMusic?.id === song.id;
  return (
    <div
      className={cn(
        "group flex grid-cols-2 justify-between rounded-md bg-primary-500 p-2 md:grid",
        isCurrentSongPlaying &&
          "bg-gradient-to-r from-slate-300 to-zinc-100 dark:from-primary-200 dark:to-primary-300",
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
              onClick={handleSongClick.bind(null, idx)}
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
                  {idx + 1}
                </Typography>
              )}
            </div>
          </div>
        </Tooltip>

        <div className="flex gap-x-2">
          <Image
            className="rounded-sm object-cover"
            src={song.image?.[0]?.link ?? "/vmusic.svg"}
            width={50}
            height={50}
            alt={song.name ?? song.title}
          />
          <div>
            <Typography
              variant="T_SemiBold_H6"
              className="max-w-[150px] truncate md:max-w-[300px]"
            >
              {song.name ?? song.title}
            </Typography>
            <Typography
              className="max-w-[150px] truncate md:max-w-[300px]"
              variant="T_Regular_H7"
              color={!isCurrentSongPlaying ? "secondary" : "primary"}
            >
              {artists}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-4">
        <Button
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
    </div>
  );
};
