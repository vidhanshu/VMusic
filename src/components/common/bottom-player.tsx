"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import useMusicContext from "@/contexts/music-context/use-music-context";
import Typography from "./Typography";
import Image from "next/image";
import Link from "next/link";
import AudioPlayer from "./audio-player";

const BottomPlayer = () => {
  const {
    audioRef,
    isRightSidebarOpen,
    currentMusic,
    mute,
    loop,
    setIsRightSidebarOpen,
    setCompletedPercentage,
  } = useMusicContext();

  return (
    <div className="relative h-[65px]">
      {/**
       * hidden audio element responsible for playing music
       */}
      <audio
        muted={mute}
        loop={loop}
        autoPlay
        hidden
        ref={audioRef}
        onTimeUpdate={(a) => {
          const timestamp = a.currentTarget;
          const duration = Number(currentMusic?.duration) || 0;
          const percentage = (timestamp.currentTime / duration) * 100;
          setCompletedPercentage(percentage);
        }}
      />

      {/**
       * Cannot give h-full because it's not fix relative to the above div
       * rather it's relative to the whole page
       */}
      <div className="fixed bottom-0 flex h-[65px] w-full items-center justify-between gap-x-8 bg-[#1D1B2D] px-4">
        <div className="flex items-center justify-center gap-x-4 rounded-sm px-6">
          <div className="relative overflow-hidden rounded-md">
            <Image
              width={55}
              height={55}
              alt="current-music-image"
              src={currentMusic?.image?.[1]?.link || "/vmusic.svg"}
            />
            <Button
              className="absolute right-3 top-3"
              radius="full"
              isIconOnly
              variant="faded"
              size="sm"
              startContent={
                isRightSidebarOpen ? (
                  <ChevronDown size={20} className="text-white" />
                ) : (
                  <ChevronUp size={20} className="text-white" />
                )
              }
              onClick={() => {
                setIsRightSidebarOpen((prev) => !prev);
              }}
            />
          </div>
          <div>
            <Link href="/#">
              <Typography
                isHoverUnderline
                className="max-w-[150px] text-ellipsis text-nowrap"
                variant="T_SemiBold_H6"
              >
                {currentMusic?.name || "Please select a song"}
              </Typography>
            </Link>
            {/* Show only one artist */}
            <Link href="/#">
              <Typography
                isHoverUnderline
                className="max-w-[150px] text-ellipsis text-nowrap"
                variant="T_Regular_H8"
                color="secondary"
              >
                {currentMusic?.primaryArtists ||
                  currentMusic?.featuredArtists ||
                  "Unknown"}
              </Typography>
            </Link>
          </div>
        </div>
        <AudioPlayer />
      </div>
    </div>
  );
};

export default BottomPlayer;
