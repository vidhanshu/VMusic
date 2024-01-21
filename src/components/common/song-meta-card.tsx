"use client";

import React from "react";
import { Button, ButtonProps, User, cn } from "@nextui-org/react";

import Typography from "./Typography";

import useMusicContext from "@/contexts/music-context/use-music-context";

interface ISongMetaCardProps extends ButtonProps {
  image?: string;
  artist: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}
const SongMetaCard = ({
  image,
  artist,
  className,
  startContent,
  endContent,
  ...props
}: ISongMetaCardProps) => {
  const { setIsPlaying } = useMusicContext();

  return (
    <Button
      className={cn("rounded-sm p-6", className)}
      color="primary"
      variant="light"
      {...props}
    >
      {startContent}
      <User
        avatarProps={{
          src: image || "/pahadon-mein.jpg",
          className: "w-[40px] h-[40px] rounded-md",
        }}
        onClick={() => setIsPlaying((i) => !i)}
        name="Pahle bhi main"
        classNames={{
          name: "text-white",
        }}
        description={
          <Typography color="secondary" variant="T_Regular_H8">
            {artist || "Vishal Mishra"}
          </Typography>
        }
      />
      {endContent}
    </Button>
  );
};

export default SongMetaCard;
