"use client";

import React from "react";
import LikedSongs from "@/components/liked-songs/liked-songs";
import { useSearchParams, notFound } from "next/navigation";

const PlaylistSharedPage = () => {
  const searchParam = useSearchParams();
  const userId = searchParam.get("id");

  if (!userId) {
    notFound();
  }

  return <LikedSongs userId={userId} />;
};

export default PlaylistSharedPage;
