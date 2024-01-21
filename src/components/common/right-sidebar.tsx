"use client";

import React from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { Button, ScrollShadow, User } from "@nextui-org/react";
import { motion as m } from "framer-motion";

import useMusicContext from "@/contexts/music-context/use-music-context";
import { MUSICS } from "@/utils/constants";
import Typography from "./Typography";
import SongMetaCard from "./song-meta-card";

const RightSideBar = () => {
  const { setIsPlaying } = useMusicContext();

  return (
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
      className="sticky top-[75px] h-[calc(100vh-65px-73px)] space-y-4 border-l-[2px] border-primary-500 bg-background p-4 shadow-md"
    >
      <div className="flex justify-end">
        <Button
          size="sm"
          isIconOnly
          className="bg-primary-50"
          startContent={<X size={16} />}
          onClick={() => setIsPlaying(false)}
        />
      </div>
      <div className="space-y-8 py-2">
        <Image
          className="mx-auto aspect-square w-full max-w-[300px] rounded-lg"
          src="/pahadon-mein.jpg"
          width={200}
          height={200}
          alt="music image"
        />
      </div>
      {/* about artits */}
      <div>
        <Typography variant="T_Regular_H4" className="mb-4">
          Artist(s)
        </Typography>
        <ScrollShadow hideScrollBar orientation="horizontal">
          <div className="flex gap-x-4">
            {MUSICS.artists.map((artist, i) => (
              <Button
                isIconOnly
                radius="full"
                className="min-h-[100px] min-w-[100px] p-0"
              >
                <Image
                  className="aspect-square rounded-full"
                  src={artist?.image?.[1]?.link!}
                  alt="artists image"
                  width={100}
                  height={100}
                />
              </Button>
            ))}
          </div>
        </ScrollShadow>
      </div>
      {/* next in the queue */}
      <SongMetaCard
        fullWidth
        className="p-8 flex justify-between"
        endContent={<Play className="text-white" />}
        artist="Vishal Mishra"
      />
    </m.div>
  );
};

export default RightSideBar;
