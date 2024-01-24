"use server";

import type NSMusic from "@/music";
import { REVALIDATE } from "@/utils/common/constants";

interface ReturnType {
  data: {
    total: number;
    lastPage: boolean;
    results: NSMusic.IAlbum[];
  };
}
export const getAlbumsByArtistId = async (
  id: string,
  page = 1,
): Promise<ReturnType["data"]> => {
  try {
    const data = await fetch(
      `https://saavn.me/artists/${id}/albums?page=${page}`,
      {
        next: { revalidate: REVALIDATE },
      },
    );
    const json = (await data.json()) as ReturnType;
    return json.data;
  } catch (error) {
    return {} as ReturnType["data"];
  }
};
