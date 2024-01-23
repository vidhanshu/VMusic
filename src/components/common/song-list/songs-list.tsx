"use client";

import type NSMusic from "@/music";
import { Clock } from "lucide-react";
import Typography from "@/components/common/Typography";
import { SongListItem } from "./song-list-item";

const SongsList = ({ songs }: { songs: NSMusic.IMusic[] }) => {
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
