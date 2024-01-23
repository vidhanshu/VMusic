"use client";

import type NSMusic from "@/music";
import { ChevronLeft, Clock } from "lucide-react";
import Typography from "@/components/common/Typography";
import { SongListItem } from "./song-list-item";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const SongsList = ({ songs }: { songs: NSMusic.IMusic[] }) => {
  const router = useRouter();

  if (!songs.length) {
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
        <Clock className="mr-20 justify-self-end text-primary-100" size={20} />
      </div>
      <div className="space-y-4">
        {songs.map((song, idx) => {
          return <SongListItem key={idx} song={song} idx={idx} />;
        })}
      </div>
    </div>
  );
};

export default SongsList;
