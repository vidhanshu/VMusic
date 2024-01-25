"use client";

import React from "react";
import Image from "next/image";
import { motion as m } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button, Tooltip, cn } from "@nextui-org/react";
import { ChevronLeft, Verified } from "lucide-react";

import Typography from "@/components/common/Typography";

import {
  decodeHTML,
  getShortNumberRepresentation,
} from "@/utils/common";

import type NSMusic from "@/music";

const ArtistHeader = ({
  artist: {
    name,
    image,
    dominantType,
    isVerified,
    followerCount,
    dominantLanguage,
    availableLanguages,
  },
}: {
  artist: NSMusic.IDetailedArtist;
}) => {
  const router = useRouter();

  return (
    <>
      <div
        className={cn(
          "mb-6 flex gap-8 rounded-md bg-gradient-to-b from-zinc-200 to-zinc-50 p-2 dark:from-primary-300 dark:to-primary-900 md:flex-row",
          "flex-col items-center md:items-end",
          name ? "items-end" : "items-center",
        )}
      >
        <m.div
          initial={{ opacity: 0, scale: 0.5, x: -100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="relative"
        >
          <Image
            width={250}
            height={250}
            alt="album image"
            src={image?.[2]?.link ?? "/vmusic.svg"}
            className="h-auto md:min-w-[250px] rounded-md shadow-lg"
          />

          {isVerified && (
            <Tooltip content="verified artist">
              <Verified
                className="absolute right-2 top-2 fill-blue-500"
                size={25}
              />
            </Tooltip>
          )}

          <div className="absolute left-4 top-4">
            <Tooltip content="Back">
              <Button
                isIconOnly
                variant="shadow"
                radius="full"
                onClick={() => router.back()}
                startContent={<ChevronLeft size={20} />}
                color="primary"
                className="mb-4 text-white"
              />
            </Tooltip>
          </div>
        </m.div>
        {name ? (
          <div className="flex flex-col gap-2 md:gap-4">
            <Typography
              variant="T_Bold_H1"
              className="max-h-[120px] max-w-full truncate text-wrap text-center md:text-left"
            >
              {decodeHTML(name)}
            </Typography>
            <div>
              <Typography variant="T_Regular_H5" className="capitalize text-center md:text-left">
                {dominantType} .{" "}
                {getShortNumberRepresentation(Number(followerCount))} Followers
                . {dominantLanguage}
              </Typography>
              <Typography
                className="capitalize text-center md:text-left"
                color="secondary"
                variant="T_Regular_H6"
              >
                {availableLanguages?.slice(0, 5)?.join(", ")}....
              </Typography>
            </div>
          </div>
        ) : (
          <Typography variant="T_Bold_H1">Sorry No Artist found!</Typography>
        )}
      </div>
    </>
  );
};

export default ArtistHeader;
