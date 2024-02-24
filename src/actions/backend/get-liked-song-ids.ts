"use server";

import { getServerSession } from "next-auth";
import { getUserByEmail } from "..";
import { db } from "@/server/db";

export default async function getLikedSongIds() {
  const session = await getServerSession();
  if (!session?.user) {
    return {
      error: true,
      message: "You need to be logged in to like a song",
      data: [],
    };
  }
  const user = await getUserByEmail(session.user.email!);
  if (!user) {
    return {
      error: true,
      message: "User not found",
      data: [],
    };
  }

  try {
    const likedSongs = (
      await db.song.findMany({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
        },
      })
    ).map((song) => song.id);
    return {
      error: false,
      message: "Song liked",
      data: likedSongs,
    };
  } catch (error) {
    return {
      error: true,
      message: "An error occurred",
      data: [],
    };
  }
}
