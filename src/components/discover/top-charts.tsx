import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MUSICS } from "@/utils/constants";
import { Button } from "@nextui-org/react";

import Typography from "@/components/common/Typography";

const TopCharts = () => {
  return (
    <div className="py-6">
      <div className="flex justify-between">
        <h1 className="mb-6 text-xl font-semibold">Top Charts</h1>
        <span className="w-[150px] cursor-pointer truncate text-center text-primary-100">
          See all
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {MUSICS.playlists.map((item, idx) => (
          <TopChartCard
            key={idx}
            id={item.id}
            title={item.title}
            image={item.image?.[1]?.link ?? "/vmusic.svg"}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;

export const TopChartCard = ({
  image,
  title,
  id,
}: {
  image: string;
  title: string;
  id: string;
}) => {
  return (
    <Button
      as={Link}
      href={`/playlists/${id}`}
      color="primary"
      className="flex h-auto w-auto justify-between gap-x-4 p-2"
    >
      <Image
        className="rounded-md"
        alt="playlist-image"
        width={100}
        height={100}
        src={image}
      />
      <Typography
        className="flex-grow truncate text-wrap text-left"
        variant="T_Bold_H4"
      >
        {title}
      </Typography>
    </Button>
  );
};