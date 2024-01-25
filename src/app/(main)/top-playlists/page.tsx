import React from "react";
import { type Metadata } from "next";
import TopPlaylists from "@/components/top-playlists/top-playlists";

export const metadata: Metadata = {
  title: "Top Playlists",
  description: "Top playlists on VMusic",
};
const TopPlaylistsPage = () => {
  return (
    <div className="flex w-full flex-col">
      <TopPlaylists />
    </div>
  );
};

export default TopPlaylistsPage;
