"use client";

import React from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { motion as m } from "framer-motion";
import { Button, cn } from "@nextui-org/react";

import Typography from "./Typography";
import SongMetaCard from "./song-meta-card";
import AudioPlayer, { IAudioPlayerProps } from "./audio-player";

import useMusicContext from "@/contexts/music-context/use-music-context";

import { RIGHT_SONG_PLAYER_ANIMATION } from "@/utils/common/constants";

const RightSideBar = (props: IAudioPlayerProps) => {
  const { currentMusic, setIsRightSidebarOpen, isRightSidebarOpen } =
    useMusicContext();

  return (
    <m.div
      {...RIGHT_SONG_PLAYER_ANIMATION}
      className={cn(
        "h-[calc(100vh-65px-73px)] border-l-[2px] border-primary-500 bg-background/90 p-4 shadow-md backdrop-blur-md",
        isRightSidebarOpen && "h-[calc(100vh-73px)]",
      )}
    >
      <div className="flex justify-end">
        <Button
          size="sm"
          isIconOnly
          className="bg-primary-50"
          startContent={<X size={16} />}
          onClick={() => setIsRightSidebarOpen(false)}
        />
      </div>
      <div className="space-y-4 py-2">
        <div>
          <Typography
            className="mx-auto max-w-[300px] truncate text-center"
            variant="T_SemiBold_H4"
          >
            {currentMusic?.name || "Please play a song"}
          </Typography>
          <Typography
            className="mx-auto max-w-[300px] truncate text-center"
            variant="T_Regular_H7"
            color="secondary"
          >
            {currentMusic?.name}
          </Typography>
        </div>
        <Image
          className="mx-auto aspect-square w-full max-w-[300px] rounded-lg object-cover"
          src={currentMusic?.image?.[2]?.link || "/vmusic.svg"}
          width={200}
          height={200}
          alt="music image"
        />
      </div>
      {/* controls */}
      <AudioPlayer {...props} />
      {/* next in the queue */}
      <SongMetaCard
        fullWidth
        className="mt-4 flex justify-between p-8"
        endContent={<Play className="text-white" />}
        artist="Vishal Mishra"
      />
    </m.div>
  );
};

export default RightSideBar;
