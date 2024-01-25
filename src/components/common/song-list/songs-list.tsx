"use client";

import dynamic from "next/dynamic";
import { Button, cn } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Clock } from "lucide-react";
import { Pagination } from "@nextui-org/react";

import Typography from "@/components/common/Typography";
const SongListItem = dynamic(
  () => import("./song-list-item").then((mod) => mod.SongListItem),
  { ssr: false },
);

import useMusicContext from "@/contexts/music-context/use-music-context";

import type NSMusic from "@/music";
import { useState } from "react";
import { getSongsByArtistId } from "@/actions/get-artist-songs";
import SongListSkeleton from "./song-list-skeleton";

const SongsList = ({
  songs,
  listId,
  showListHeader = true,
  handleSongClick: customHandleSongClick,
  showPlayCount = true,
  pagination: customPagination,
  type,
}: {
  songs: NSMusic.IMusic[];
  listId?: string;
  showListHeader?: boolean;
  handleSongClick?: (idx: number) => void;
  showPlayCount?: boolean;
  type: "album" | "playlist" | "artist";
  pagination?: {
    total: number;
    initialPage: number;
  };
}) => {
  const params: { artistId: string } = useParams();
  const [songList, setsongList] = useState(songs);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: customPagination?.total,
    page: 1,
  });
  const router = useRouter();
  const { currentMusic, togglePlay, setCurrentMusic, queue, setQueue } =
    useMusicContext();

  const handleSongClick = (idx: number, id: string) => {
    const isCurrentSongPlaying = currentMusic?.id === id;
    // if current song is already playing, then pause other wise set current song
    if (isCurrentSongPlaying) {
      togglePlay();
    } else {
      // set to the queue, iff the queue is empty or the song is not already in the queue
      if (
        !queue?.songs?.length ||
        queue?.songs?.[0]?.id !== songList?.[0]?.id
      ) {
        setQueue({
          id: listId,
          activeIndex: idx,
          songs: songList,
          shuffle: queue.shuffle,
          type,
        });
      }

      setCurrentMusic(songList[idx]!);
    }
  };

  const handlePageChange = async (num: number) => {
    setLoading(true);
    const data = await getSongsByArtistId(params.artistId, num);
    setsongList(data?.results ?? []);
    setQueue({ songs: data?.results ?? [] });
    setPagination((prev) => ({ ...prev, page: num }));
    setLoading(false);
  };

  if (!songs?.length) {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <Typography
          className="text-center"
          color="secondary"
          variant="T_Bold_H1"
        >
          No Songs found!
        </Typography>
        <Button
          onClick={() => router.back()}
          startContent={<ChevronLeft size={20} />}
          color="success"
          className="text-white"
        >
          Back
        </Button>
      </div>
    );
  }
  return (
    <div>
      {showListHeader && (
        <div
          className={cn(
            "group flex md:grid md:grid-cols-2 justify-between md:rounded-md p-2",
            showPlayCount && "grid-cols-3",
          )}
        >
          <Typography color="secondary" variant="T_Medium_H6">
            # Title
          </Typography>
          {showPlayCount && (
            <Typography
              className="hidden md:block md:justify-self-center"
              color="secondary"
              variant="T_Medium_H6"
            >
              # Play Count
            </Typography>
          )}
          <Clock
            className="md:mr-20 justify-self-end text-primary-100"
            size={20}
          />
        </div>
      )}
      {loading ? (
        <SongListSkeleton />
      ) : (
        <div className="space-y-4">
          {songList.map((song, idx) => {
            return (
              <SongListItem
                handleSongClick={
                  customHandleSongClick?.bind(null, idx) ?? handleSongClick
                }
                showPlayCount={showPlayCount}
                key={idx}
                song={song}
                // if customPagination prop is there then pass pagination else not
                {...(!!customPagination ? pagination : {})}
                idx={idx}
              />
            );
          })}
        </div>
      )}
      {customPagination && (
        <div className="flex items-center justify-center">
          <Pagination
            onChange={handlePageChange}
            className="mt-4"
            total={Math.floor(customPagination.total / 10)}
            initialPage={1}
            page={pagination.page}
          />
        </div>
      )}
    </div>
  );
};

export default SongsList;
