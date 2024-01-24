"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Tooltip, cn } from "@nextui-org/react";
import { ChevronLeft, Verified } from "lucide-react";
import { motion as m } from "framer-motion";

import Typography from "@/components/common/Typography";

import {
  decodeHTML,
  getShortNumberRepresentation,
} from "@/utils/common/helpers";
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
          "flex gap-x-8 rounded-md bg-gradient-to-b from-primary-300 to-primary-900 p-2",
          name ? "items-end" : "items-center",
        )}
      >
        <m.div
          initial={{ opacity: 0, scale: 0.5, x: -100}}
          animate={{ opacity: 1, scale: 1, x: 0}}
          className="relative"
        >
          <Image
            width={250}
            height={250}
            alt="album image"
            src={image?.[2]?.link ?? "/vmusic.svg"}
            className="h-auto min-w-[250px] rounded-md shadow-lg"
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
          <div className="flex flex-col gap-4">
            <Typography
              variant="T_Bold_H1"
              className="max-h-[120px] max-w-full truncate text-wrap"
            >
              {decodeHTML(name)}
            </Typography>
            <div>
              <Typography variant="T_Regular_H5" className="capitalize">
                {dominantType} .{" "}
                {getShortNumberRepresentation(Number(followerCount))} Followers
                . {dominantLanguage}
              </Typography>
              <Typography
                className="capitalize"
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
