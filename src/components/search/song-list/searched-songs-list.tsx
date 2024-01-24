"use client";

import dynamic from "next/dynamic";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Clock } from "lucide-react";

import Typography from "@/components/common/Typography";
const SongListItem = dynamic(
  () => import("./song-list-item").then((mod) => mod.SongListItem),
  { ssr: false },
);

import type NSMusic from "@/music";
import { ArtistListItem } from "./artist-list-item";
import Link from "next/link";

const SearcedSongsList = ({
  songs,
  showListHeader = true,
  handleSongClick: customHandleSongClick,
}: {
  songs: NSMusic.IMusic[];
  listId?: string;
  showListHeader?: boolean;
  handleSongClick: (idx: number) => void;
}) => {
  const router = useRouter();

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
        <div className="group grid grid-cols-3 justify-between rounded-md p-2">
          <Typography color="secondary" variant="T_Medium_H6">
            # Title
          </Typography>
          <Typography
            className="justify-self-center"
            color="secondary"
            variant="T_Medium_H6"
          >
            # Play Count
          </Typography>
          <Clock
            className="mr-20 justify-self-end text-primary-100"
            size={20}
          />
        </div>
      )}
      <div className="space-y-4">
        {songs.map((song, idx) => {
          if (song.type === "artist")
            return (
              <Link key={idx} href={`/artist/${song.id}`}>
                <ArtistListItem
                  name={song.title}
                  image={song.image?.[0]?.link}
                />
              </Link>
            );
          return (
            <SongListItem
              handleSongClick={customHandleSongClick?.bind(null, idx)}
              key={idx}
              song={song}
              idx={idx}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearcedSongsList;
