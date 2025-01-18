"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@nextui-org/react";

import Typography from "@/components/common/Typography";

import useMusicContext from "@/contexts/music-context/use-music-context";
import ROUTES from "@/routes";
import { getMusicImageUrl } from "@/utils/common";

const TopCharts = () => {
  const {
    data: { topCharts },
  } = useMusicContext();

  return (
    <div className="py-6">
      <h1 className="mb-6 text-xl font-semibold">Top Charts</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topCharts.map((item, idx) => (
          <TopChartCard
            key={idx}
            id={item.id}
            name={item.name}
            image={getMusicImageUrl(item.image)}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;

export const TopChartCard = ({
  image,
  name,
  id,
}: {
  image: string;
  name: string;
  id: string;
}) => {
  return (
    <Button
      as={Link}
      href={`${ROUTES.PLAYLISTS}/${id}/#`}
      color="primary"
      className="flex h-auto w-auto justify-between gap-x-4 bg-zinc-200 p-2 dark:bg-primary"
    >
      <img
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
        {name}
      </Typography>
    </Button>
  );
};
