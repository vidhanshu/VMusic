import { Button } from "@nextui-org/react";
import { Heart, Play } from "lucide-react";
import Image from "next/image";
import React from "react";
import Typography from "@/components//common/Typography";

interface IMusicCardProps {
  image?: string;
  name: string;
  artists: string;
  handleOnClick: () => void;
}

const MusicCard = ({
  image,
  name,
  artists,
  handleOnClick,
}: IMusicCardProps) => {
  return (
    <div>
      <div className="group relative overflow-hidden rounded-lg">
        <Image
          width={150}
          height={150}
          alt="music image"
          src={image ?? "/pahadon-mein.jpg"}
          quality={100}
          className="mx-auto min-h-[150px] min-w-[150px]"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:bg-black/50 hover:opacity-100">
          <Button
            onClick={handleOnClick}
            color="primary"
            radius="full"
            isIconOnly
            className="transition-transform hover:scale-110"
            startContent={<Play className="fill-white" />}
          />
          <Button
            className="absolute bottom-2 right-2"
            color="primary"
            radius="full"
            variant="ghost"
            size="sm"
            isIconOnly
            startContent={<Heart size={20} className="text-white" />}
          />
        </div>
      </div>
      <div className="mt-1">
        <Typography className="w-[150px] truncate text-center">
          {name}
        </Typography>
        <Typography
          color="secondary"
          variant="T_Regular_H8"
          className="w-[150px] truncate text-center"
        >
          {artists}
        </Typography>
      </div>
    </div>
  );
};

export default MusicCard;
