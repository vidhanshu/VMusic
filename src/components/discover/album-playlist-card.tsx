import React from "react";
import Link from "next/link";
 
import { Button } from "@nextui-org/react";

import Typography from "@/components/common/Typography";
import { decodeHTML } from "@/utils/common";

interface IAlbumPlaylistCardProps {
  image?: string;
  name: string;
  href: string;
}

const AlbumPlaylistCard = ({ image, name, href }: IAlbumPlaylistCardProps) => {
  return (
    <div className="p-0">
      <Button
        as={Link}
        href={href}
        variant="flat"
        color="secondary"
        className="h-[150px] w-[150px] px-0"
      >
        <div className="group relative overflow-hidden rounded-lg">
          <img
            width={150}
            height={150}
            alt="music image"
            src={image ?? "/pahadon-mein.jpg"}
            className="mx-auto min-h-[150px] min-w-[150px]"
          />
        </div>
      </Button>
      <div className="mt-1">
        <Typography className="w-[150px] truncate text-center">
          {decodeHTML(name)}
        </Typography>
      </div>
    </div>
  );
};

export default AlbumPlaylistCard;
