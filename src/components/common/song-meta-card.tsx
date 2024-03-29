import React from "react";
import { Button, type ButtonProps, User, cn } from "@nextui-org/react";

import Typography from "./Typography";
import { decodeHTML } from "@/utils/common";

interface ISongMetaCardProps extends ButtonProps {
  image?: string;
  artist?: string;
  name?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}
const SongMetaCard = ({
  image,
  artist = "Unknown",
  className,
  startContent,
  endContent,
  name = "Unknown",
  ...props
}: ISongMetaCardProps) => {
  return (
    <Button
      as="div"
      className={cn("rounded-md p-6", className)}
      color="secondary"
      variant="flat"
      {...props}
    >
      {startContent}
      <User
        avatarProps={{
          src: image ?? "/vmusic.svg",
          className: "w-[40px] h-[40px] rounded-md",
        }}
        name={name}
        classNames={{
          name: "dark:text-white text-black max-w-[180px] truncate",
        }}
        description={
          <Typography
            className="max-w-[180px] truncate"
            color="secondary"
            variant="T_Regular_H8"
          >
            {decodeHTML(artist)}
          </Typography>
        }
      />
      {endContent}
    </Button>
  );
};

export default SongMetaCard;
