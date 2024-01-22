"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion as m } from "framer-motion";

import Typography from "./Typography";
import AudioPlayer from "./audio-player";
import RightSideBar from "./right-sidebar";

import useMusicContext from "@/contexts/music-context/use-music-context";

import { BOTTOM_PLAYER_ANIMATION } from "@/utils/common/constants";

const BottomPlayer = () => {
  const [volume, setVolume] = React.useState(80);
  const [songProgress, setSongProgress] = React.useState(0);

  const { isRightSidebarOpen, currentMusic, setIsRightSidebarOpen } =
    useMusicContext();

  return (
    <>
      <AudioPlayer.HiddenAudioElement setSongProgress={setSongProgress} />
      <AnimatePresence>
        {isRightSidebarOpen && (
          <m.div
            initial={{
              x: 300,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: 300,
              opacity: 0,
            }}
            transition={{
              stiffness: 0,
            }}
            className="fixed right-0 top-[73px]"
          >
            <RightSideBar
              volume={volume}
              isSideBarPlayer
              songProgress={songProgress}
              setVolume={setVolume}
              setSongProgress={setSongProgress}
            />
          </m.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isRightSidebarOpen && (
          <div className="relative h-[65px]">
            {/**
             * Cannot give h-full because it's not fix relative to the above div
             * rather it's relative to the whole page
             */}
            <m.div
              {...BOTTOM_PLAYER_ANIMATION}
              className="fixed bottom-0 flex h-[65px] w-full items-center justify-between gap-x-8 bg-[#1D1B2D]/90 px-4 backdrop-blur-md"
            >
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
              <AudioPlayer
                setVolume={setVolume}
                songProgress={songProgress}
                setSongProgress={setSongProgress}
                volume={volume}
              />
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomPlayer;
