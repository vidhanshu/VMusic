"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Heart, Music, PlayCircle } from "lucide-react";
import { Button, Tooltip, cn } from "@nextui-org/react";
import { motion as m } from "framer-motion";

import Typography from "@/components/common/Typography";

import useMusicContext from "@/contexts/music-context/use-music-context";

import { HERO_CAROUSEL } from "@/utils/discover/constants";
import { HERO_CARD_ANIMATION } from "@/utils/common/constants";
import { useMediaQuery } from "usehooks-ts";

const HeroCard = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { setCurrentMusic, currentMusic, setIsPlaying, isPlaying } =
    useMusicContext();

  const [active, setActive] = useState(2);
  const [autSlide, setAutSlide] = useState(true);

  const { name, image, songName } = HERO_CAROUSEL[active]!;

  useEffect(() => {
    if (!autSlide) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_CAROUSEL.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [autSlide]);

  // if the song which is there in the context is the same as the current song in this carousel
  const isCurrentSong = currentMusic?.id === HERO_CAROUSEL[active]?.music?.id;

  // doing this all stuff instead of directly showing card cz of the animation
  return HERO_CAROUSEL.map((_, idx) => {
    return active === idx ? (
      <m.div
        onMouseOver={() => setAutSlide(false)}
        onMouseLeave={() => setAutSlide(true)}
        key={idx}
        {...HERO_CARD_ANIMATION}
        className="flex h-[351px] justify-between gap-x-16 overflow-hidden rounded-xl
            md:bg-[linear-gradient(90deg,_#332F4C_22.46%_22.46%,_#4A456B_47.75%_47.75%,_#958CDD_100%_100%)] px-8 pt-4
            bg-[linear-gradient(to_right,rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url('/vmusic.svg')] bg-center bg-cover bg-no-repeat
            "
      >
        <div className="flex flex-grow items-stretch justify-between">
          <div className="flex flex-grow flex-col items-center justify-between pb-4 md:flex-grow-0 md:items-start">
            <Typography
              variant="T_Regular_H4"
              className="text-center text-white md:text-left"
            >
              Trending New Hits
            </Typography>
            <div className="space-y-4">
              <Typography
                className="text-center md:text-left"
                color="success"
                variant="T_Bold_H1"
              >
                {songName}
              </Typography>
              <Typography
                className="text-center  text-white md:text-left"
                variant="T_SemiBold_H2"
              >
                {name}
              </Typography>
            </div>
            <div className="flex items-center gap-x-4">
              <Tooltip content={isCurrentSong ? "Pause" : "Play"}>
                <Button
                  className={cn(
                    "rounded-full bg-white text-black",
                    isCurrentSong && isPlaying && "bg-success text-white",
                  )}
                  onClick={() => {
                    if (!isCurrentSong && !!HERO_CAROUSEL[active]?.music)
                      setCurrentMusic(HERO_CAROUSEL[active]?.music ?? null);
                    else {
                      setIsPlaying(!isPlaying);
                    }
                  }}
                  startContent={
                    isCurrentSong && isPlaying ? (
                      <PlayCircle className="animate-spin" size={20} />
                    ) : (
                      <Music size={16} />
                    )
                  }
                  size="lg"
                >
                  {isCurrentSong && isPlaying ? "Playing" : "Listen now"}
                </Button>
              </Tooltip>
              <Button
                size="lg"
                radius="full"
                variant="bordered"
                isIconOnly
                className="border-primary-100"
                startContent={
                  <Heart className="h-6 w-6 fill-white text-white" />
                }
              />
            </div>
          </div>
          <Image
            className="-mb-1 hidden aspect-square w-auto md:block"
            src={image}
            width={300}
            height={300}
            alt={name}
          />
        </div>
        {!isMobile && (
          <div className="flex flex-col gap-2 pb-12 pt-8">
            {Array.from({ length: HERO_CAROUSEL.length }).map((item, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={cn(
                    "w-[8px] flex-grow cursor-pointer rounded-full",
                    idx === active
                      ? "max-h-[16px] rounded-full bg-white"
                      : "bg-white/30",
                  )}
                />
              );
            })}
          </div>
        )}
      </m.div>
    ) : (
      <React.Fragment key={idx} />
    );
  });
};

export default HeroCard;
