"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Music } from "lucide-react";
import { Button, cn } from "@nextui-org/react";

import Typography from "@/components/common/Typography";

import useMusicContext from "@/contexts/music-context/use-music-context";

import { HERO_CAROUSEL } from "@/utils/discover/constants";

const HeroCard = () => {
  const [active, setActive] = useState(2);

  const { name, image, songName } = HERO_CAROUSEL[active]!;

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % HERO_CAROUSEL.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex h-[351px] justify-between gap-x-16 overflow-hidden 
      rounded-xl
      bg-[linear-gradient(90deg,_#332F4C_22.46%_22.46%,_#4A456B_47.75%_47.75%,_#958CDD_100%_100%)] px-8 pt-4"
    >
      <div className="flex flex-grow justify-between">
        <div className="flex flex-col justify-between pb-4">
          <Typography variant="T_Regular_H4" className="text-white">Trending New Hits</Typography>
          <div className="space-y-4">
            <Typography color="success" variant="T_Bold_H1">
              {songName}
            </Typography>
            <Typography className="text-white" variant="T_SemiBold_H2">
              {name}
            </Typography>
          </div>
          <div className="flex items-center gap-x-4">
            <Button
              startContent={<Music size={16} />}
              size="lg"
              className="rounded-full bg-white text-black"
            >
              Listen now
            </Button>
            <Button
              size="lg"
              radius="full"
              variant="bordered"
              isIconOnly
              className="border-primary-100"
              startContent={<Heart className="h-6 w-6 fill-white text-white" />}
            />
          </div>
        </div>
        <Image
          className="-mb-1 aspect-square"
          src={image}
          width={300}
          height={300}
          alt="dua lipa image"
        />
      </div>
      <div className="flex flex-col gap-2 pb-12 pt-8">
        {Array.from({ length: HERO_CAROUSEL.length }).map((item, idx) => {
          return (
            <div
              onClick={() => setActive(idx)}
              className={cn(
                "w-[8px] flex-grow cursor-pointer rounded-full bg-white/50",
                idx === active && "max-h-[16px] rounded-full bg-white/100",
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeroCard;
