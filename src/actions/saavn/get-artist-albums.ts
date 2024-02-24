"use server";

import type NSMusic from "@/music";
import { BASE_API_URL, REVALIDATE } from "@/utils/common";

interface ReturnType {
  data: {
    total: number;
    lastPage: boolean;
    results: NSMusic.IAlbum[];
  };
}
const getAlbumsByArtistId = async (
  id: string,
  page = 1,
): Promise<ReturnType["data"]> => {
  try {
    const data = await fetch(
      `${BASE_API_URL}/artists/${id}/albums?page=${page}`,
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

export default getAlbumsByArtistId;
