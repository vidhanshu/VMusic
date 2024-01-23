import { Button, Tooltip, cn } from "@nextui-org/react";
import { Download, Pause, Play } from "lucide-react";
import { formattedTime } from "@/utils/helpers";
import Image from "next/image";
import useMusicContext from "@/contexts/music-context/use-music-context";
import { downloadSong, getMusicUrl } from "@/utils/common/helpers";
import type NSMusic from "@/music";
import Typography from "../Typography";

export const SongListItem = ({
  song,
  idx,
}: {
  song: NSMusic.IMusic;
  idx: number;
}) => {
  const { currentMusic, isPlaying, setCurrentMusic, togglePlay } =
    useMusicContext();

  const artists =
    song.primaryArtists instanceof Array
      ? song.primaryArtists.join(", ")
      : song.primaryArtists;
  const isCurrentSongPlaying = currentMusic?.id === song.id;
  return (
    <div
      className={cn(
        "group grid grid-cols-3 justify-between rounded-md bg-primary-500 p-2",
        isCurrentSongPlaying &&
          "bg-gradient-to-r from-primary-200 to-primary-300",
      )}
    >
      <div className="flex items-center gap-x-2">
        <Tooltip content="Play/Pause">
          <div className="flex min-h-10 min-w-10 items-center justify-center">
            <Button
              className={cn(
                isCurrentSongPlaying ? "flex" : "hidden group-hover:flex",
              )}
              variant="solid"
              radius="full"
              color="success"
              isIconOnly
              onClick={() => {
                // if current song is already playing, the pause other wise set current song
                if (isCurrentSongPlaying) {
                  togglePlay();
                } else {
                  setCurrentMusic(song);
                }
              }}
              startContent={
                isCurrentSongPlaying && isPlaying ? (
                  <Pause size={20} className="fill-white text-white" />
                ) : (
                  <Play size={20} className="fill-white text-white" />
                )
              }
            />
            {!isCurrentSongPlaying && (
              <Typography
                variant="T_SemiBold_H5"
                className="block group-hover:hidden"
              >
                {idx + 1}
              </Typography>
            )}
          </div>
        </Tooltip>

        <div className="flex gap-x-2">
          <Image
            className="rounded-sm object-cover"
            src={song.image?.[0]?.link ?? "/vmusic.svg"}
            width={50}
            height={50}
            alt={song.name}
          />
          <div>
            <Typography
              variant="T_SemiBold_H6"
              className="max-w-[300px] truncate"
            >
              {song.name}
            </Typography>
            <Typography
              className="max-w-[300px] truncate"
              variant="T_Regular_H7"
              color={!isCurrentSongPlaying ? "secondary" : "primary"}
            >
              {artists}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Typography>
          {Number(song.playCount).toLocaleString("en-US")}
        </Typography>
      </div>
      <div className="flex items-center justify-end gap-x-4">
        <Typography variant="T_SemiBold_H6">
          {formattedTime(Number(song.duration))}
        </Typography>
        <Button
          variant="solid"
          radius="full"
          color="success"
          isIconOnly
          onClick={() => {
            downloadSong(getMusicUrl(song.downloadUrl));
          }}
          startContent={<Download size={20} className="text-white" />}
        />
      </div>
    </div>
  );
};
