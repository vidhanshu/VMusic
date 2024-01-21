import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@nextui-org/react";

import Typography from "@/components/common/Typography";

interface IArtistCardProps {
  image?: string;
  name: string;
}

const ArtistCard = ({ image, name }: IArtistCardProps) => {
  return (
    <div>
      <div className="group relative overflow-hidden rounded-full">
        <Image
          width={150}
          height={150}
          alt="music image"
          src={image || "/pahadon-mein.jpg"}
          className="mx-auto min-h-[150px] min-w-[150px] rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:bg-black/50 hover:opacity-100">
          <Button
            color="primary"
            radius="full"
            isIconOnly
            className="transition-transform hover:scale-110"
            startContent={<Play className="fill-white" />}
          />
        </div>
      </div>
      <Typography className="mt-1 w-[150px] truncate text-cente">{name}</Typography>
    </div>
  );
};

export default ArtistCard;
