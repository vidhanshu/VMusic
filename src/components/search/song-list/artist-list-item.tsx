import Image from "next/image";
import { cn } from "@nextui-org/react";

import Typography from "@/components/common/Typography";

export const ArtistListItem = ({
  image,
  name: title,
}: {
  image?: string;
  name?: string;
}) => {
  return (
    <div className={cn("justify-between rounded-md bg-primary-500 p-2")}>
      <div className="flex items-center gap-x-2">
        <div className="flex gap-x-2">
          <Image
            className="rounded-sm object-cover"
            src={image ?? "/vmusic.svg"}
            width={50}
            height={50}
            alt="artist image"
          />
          <div className="space-y-1">
            <Typography
              variant="T_SemiBold_H6"
              className="max-w-[300px] truncate"
            >
              {title}
            </Typography>
            <Typography variant="T_Regular_H7" color="secondary">Artist</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
