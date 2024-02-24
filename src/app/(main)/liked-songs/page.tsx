import React from "react";
import { getServerSession } from "next-auth";
import NeedAuthToAccess from "@/components/auth/need-auth-to-access";
import LikedSongs from "@/components/liked-songs/liked-songs";

const LikedSongsPage = async () => {
  const session = await getServerSession();
  if (!session) {
    return <NeedAuthToAccess />;
  }
  return <LikedSongs />;
};

export default LikedSongsPage;
