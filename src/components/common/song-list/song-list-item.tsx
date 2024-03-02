import { motion as m } from "framer-motion";
import {
  Download,
  Heart,
  HeartOff,
  ListMinus,
  ListPlus,
  Minus,
  MoreVertical,
  Pause,
  Play,
  Plus,
  Share2,
} from "lucide-react";
import {
  Button,
  Tooltip,
  cn,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";

import Typography from "@/components/common/Typography";
import RenderArtistsAsLinks from "../render-artists-as-link";

import useMusicContext from "@/contexts/music-context/use-music-context";

import { formattedTime } from "@/utils/common";
import { SONG_LIST_ITEM_ANIMATION } from "@/utils/common";
import { decodeHTML } from "@/utils/common";

import type NSMusic from "@/music";
const SongDownloader = dynamic(
  () => import("@/components/song-downloader/song-downloader"),
);
import { useCopyToClipboard, useMediaQuery } from "usehooks-ts";
import useAudioPlayerContext from "@/contexts/audio-player-context/use-audio-player-context";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import React from "react";
import LikeUnlikeSong from "@/actions/backend/like-unlike-song";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const SongListItem = ({
  song,
  idx,
  handleSongClick,
  showPlayCount = true,
  showAddToQueue = true,
  showSongDownloader = true,
  showShareSongButton = true,
  showDuration = true,
  animate = true,
  pagination,
}: {
  song: NSMusic.IMusic;
  idx: number;
  handleSongClick: (idx: number, id: string) => void;
  showPlayCount?: boolean;
  showAddToQueue?: boolean;
  showSongDownloader?: boolean;
  showDuration?: boolean;
  animate?: boolean;
  showShareSongButton?: boolean;
  pagination?: {
    page: number;
  };
}) => {
  const { status } = useSession();
  const [_, copyFn] = useCopyToClipboard();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    currentMusic,
    addToQueue,
    removeFromQueye,
    inQueueMap,
    likedSongIdsMap,
    unsetLikedSongsIdsMap,
    setLikedSongsIdsMap,
  } = useMusicContext();
  const { isPlaying } = useAudioPlayerContext();

  const isCurrentSongPlaying = currentMusic?.id === song.id;
  const inQ = inQueueMap[song.id];
  const Component = animate ? m.div : "div";

  const handleLikeUnlike = async () => {
    const { error, message } = await LikeUnlikeSong(song);
    if (error) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };
  const isLiked = likedSongIdsMap[song.id];
  const isAuth = status === "authenticated";

  return (
    <Component
      {...SONG_LIST_ITEM_ANIMATION}
      className={cn(
        "group flex grid-cols-2 justify-between rounded-md bg-primary-500 p-2 md:grid",
        isCurrentSongPlaying &&
          "bg-gradient-to-r from-slate-300 to-zinc-100 dark:from-primary-200 dark:to-primary-300",
        showPlayCount && "grid-cols-3",
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
          <img
            className="h-[50px] w-[50px] rounded-sm object-cover"
            src={song.image?.[0]?.link ?? "/vmusic.svg"}
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
      {showPlayCount && (
        <div className="hidden items-center justify-center md:flex">
          <Typography>
            {Number(song.playCount).toLocaleString("en-US")}
          </Typography>
        </div>
      )}
      <div className="hidden items-center justify-end md:flex">
        <div className="flex items-center justify-end gap-x-4">
          {showAddToQueue && (
            <Tooltip content={inQ ? "Already in queue" : "Add to queue"}>
              <Button
                size="sm"
                isIconOnly
                disabled={inQ}
                radius="full"
                variant={inQ ? "solid" : "bordered"}
                color={inQ ? "success" : "default"}
                className={inQ ? "text-white" : ""}
                onClick={() => {
                  if (inQ) return;
                  addToQueue(song);
                }}
                startContent={<Plus size={16} />}
              />
            </Tooltip>
          )}
          {inQ && (
            <Tooltip content={"Remove from Queue"}>
              <Button
                size="sm"
                isIconOnly
                radius="full"
                variant="solid"
                color="danger"
                className={inQ ? "text-white" : ""}
                onClick={() => {
                  if (!inQ) return;
                  removeFromQueye(song.id);
                }}
                startContent={<Minus size={16} />}
              />
            </Tooltip>
          )}
          {isAuth && (
            <Tooltip content={isLiked ? "Unlike" : "Like"}>
              <Button
                size="sm"
                isIconOnly
                radius="full"
                variant="solid"
                color={isLiked ? "danger" : "default"}
                className="text-white"
                onClick={async () => {
                  await handleLikeUnlike();
                  if (isLiked) {
                    unsetLikedSongsIdsMap(song.id);
                  } else {
                    setLikedSongsIdsMap(song.id);
                  }
                }}
                startContent={
                  !isLiked ? <Heart size={16} /> : <HeartOff size={16} />
                }
              />
            </Tooltip>
          )}
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
          {showSongDownloader && <SongDownloader song={song} />}
        </div>
      </div>
      <div className="block md:hidden">
        <Dropdown>
          <DropdownTrigger>
            <Button
              isIconOnly
              radius="full"
              variant="light"
              endContent={<MoreVertical size={16} />}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            {DropDownItems({
              showAddToQueue,
              inQ,
              song,
              addToQueue: () => addToQueue(song),
              removeFromQueue: () => removeFromQueye(song.id),
            })}
          </DropdownMenu>
        </Dropdown>
      </div>
    </Component>
  );
};

const DropDownItems = ({
  showAddToQueue,
  inQ,
  song,
  showSongDownloader = true,
  addToQueue,
  removeFromQueue,
}: {
  showAddToQueue: boolean;
  inQ?: boolean;
  showSongDownloader?: boolean;
  addToQueue: () => void;
  removeFromQueue: () => void;
  song: NSMusic.IMusic;
}) => {
  const { likedSongIdsMap, unsetLikedSongsIdsMap, setLikedSongsIdsMap } =
    useMusicContext();
  const [_, cypFn] = useCopyToClipboard();

  const handleLikeUnlike = async () => {
    const { error, message } = await LikeUnlikeSong(song);
    if (error) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  const dropDownItems = [
    <DropdownItem
      key="share"
      onClick={async () => {
        await cypFn(`${window.location.origin}?song=${song.id}`);
        toast.success("Link copied!");
      }}
      endContent={<Share2 size={16} />}
    >
      Share
    </DropdownItem>,
  ];
  if (showAddToQueue && !inQ) {
    dropDownItems.push(
      <DropdownItem
        onClick={addToQueue}
        key="new"
        endContent={<ListPlus size={16} />}
      >
        Add to queue
      </DropdownItem>,
    );
  }
  if (!likedSongIdsMap[song.id]) {
    dropDownItems.push(
      <DropdownItem
        key="like"
        onClick={async () => {
          await handleLikeUnlike();
          setLikedSongsIdsMap(song.id);
        }}
        endContent={<Heart size={16} />}
      >
        Like
      </DropdownItem>,
    );
  } else {
    dropDownItems.push(
      <DropdownItem
        key="unlike"
        onClick={async () => {
          await handleLikeUnlike();
          unsetLikedSongsIdsMap(song.id);
        }}
        endContent={<HeartOff size={16} />}
        color="danger"
        className="text-danger"
      >
        Unlike
      </DropdownItem>,
    );
  }
  if (showSongDownloader) {
    dropDownItems.push(
      <DropdownItem key="download">
        <SongDownloader song={song}>
          <div className="flex items-center justify-between">
            Download
            <Download size={16} />
          </div>
        </SongDownloader>
      </DropdownItem>,
    );
  }
  if (inQ) {
    dropDownItems.push(
      <DropdownItem
        endContent={<ListMinus size={16} />}
        key="delete"
        className="text-danger"
        color="danger"
        onClick={removeFromQueue}
      >
        Remove from queue
      </DropdownItem>,
    );
  }
  return dropDownItems;
};
