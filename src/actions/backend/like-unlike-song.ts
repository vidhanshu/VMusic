"use server";

import type NSMusic from "@/music";
import {
  getArtistIdsString,
  getArtistsNames,
  getMusicImageUrl,
  getMusicUrl,
} from "@/utils/common";
import type { Song } from "@prisma/client";
import { getServerSession } from "next-auth";
import { getUserByEmail } from "..";
import { db } from "@/server/db";

export default async function LikeUnlikeSong(song: NSMusic.IMusic) {
  const session = await getServerSession();
  if (!session?.user) {
    return {
      error: true,
      message: "You need to be logged in to like a song",
    };
  }
  const user = await getUserByEmail(session.user.email!);
  if (!user) {
    return {
      error: true,
      message: "User not found",
    };
  }

  try {
    // check if already liked, if already like delete it
    const likedSong = await db.song.findFirst({
      where: { id: song.id, userId: user.id },
    });
    if (likedSong) {
      await db.song.delete({
        where: { id: song.id, userId: user.id },
      });
      return {
        error: false,
        message: "Song unliked",
      };
    }

    const data: Song = {
      id: song.id,
      downloadUrl: getMusicUrl(song.downloadUrl),
      image: getMusicImageUrl(song.image),
      duration: song.duration?.toString() ?? null,
      year: song.year.toString(),
      hasLyrics: !!song.hasLyrics,
      playCount: song.playCount?.toString() ?? null,
      releaseDate: song.releaseDate,
      language: song.language,
      label: song.label,
      name: song.name,
      title: song.name,
      type: song.type,
      userId: user.id,
      albumId: song.album?.id ?? null,
      primaryArtistsId: getArtistIdsString(song.artists),
      primaryArtists: getArtistsNames(song?.artists),
      copyright: song.copyright,
      explicitContent: song.explicitContent,
      lyricsId: song.lyricsId,
      url: song.url,
    };

    await db.song.create({ data });
    return {
      error: false,
      message: "Song liked",
      data: song,
    };
  } catch (error) {
    return {
      error: true,
      message: "An error occurred",
    };
  }
}
