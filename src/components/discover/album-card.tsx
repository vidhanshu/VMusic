import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";

import Typography from "@/components//common/Typography";
import Link from "next/link";

interface IAlbumCardProps {
  image?: string;
  name: string;
  id: string;
}

const AlbumCard = ({ image, name, id }: IAlbumCardProps) => {
  return (
    <div className="p-0">
      <Button
        as={Link}
        href={`/album/${id}`}
        className="h-[150px] w-[150px] px-0"
      >
        <div className="group relative overflow-hidden rounded-lg">
          <Image
            width={150}
            height={150}
            alt="music image"
            src={image ?? "/pahadon-mein.jpg"}
            quality={100}
            className="mx-auto min-h-[150px] min-w-[150px]"
          />
        </div>
      </Button>
      <div className="mt-1">
        <Typography className="w-[150px] truncate text-center">
          {name}
        </Typography>
      </div>
    </div>
  );
};

export default AlbumCard;
