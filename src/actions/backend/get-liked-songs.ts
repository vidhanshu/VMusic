"use server";

import { getServerSession } from "next-auth";
import { getUserByEmail } from "..";
import { db } from "@/server/db";
import { Song } from "@prisma/client";

export default async function getLikedSongs(): Promise<{
  error: boolean;
  message?: string;
  data: Song[];
}> {
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
    const likedSongs = await db.song.findMany({
      where: {
        userId: user.id,
      },
    });
    return {
      error: false,
      data: likedSongs,
    };
  } catch (error) {
    return {
      error: true,
      data: [],
    };
  }
}
