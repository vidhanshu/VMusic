import React from "react";
import Link from "next/link";
 
import { Button } from "@nextui-org/react";

import Typography from "@/components/common/Typography";

import { decodeHTML } from "@/utils/common";
import ROUTES from "@/routes";

interface IArtistCardProps {
  image?: string;
  name: string;
  id: string;
}

const ArtistCard = ({ image, name, id }: IArtistCardProps) => {
  return (
    <div>
      <Button
        as={Link}
        scroll={true}
        radius="full"
        href={`${ROUTES.ARTISTS}/${id}`}
        className="h-[150px] min-w-[150px] px-0"
      >
        <img
          width={150}
          height={150}
          alt="music image"
          src={image ?? "/pahadon-mein.jpg"}
          className="mx-auto min-h-[150px] min-w-[150px] rounded-lg"
        />
      </Button>
      <Typography className="mt-1 w-[150px] truncate text-center">
        {decodeHTML(name)}
      </Typography>
    </div>
  );
};

export default ArtistCard;
