"use server";

import type NSMusic from "@/music";
import { BASE_API_URL, REVALIDATE } from "@/utils/common";

interface ReturnType {
  data: NSMusic.IDetailedArtist;
}
const getArtistById = async (id: string): Promise<ReturnType["data"]> => {
  try {
    const data = await fetch(`${BASE_API_URL}/artists?id=${id}`, {
      next: { revalidate: REVALIDATE },
    });
    const json = (await data.json()) as ReturnType;
    return json.data;
  } catch (error) {
    return {} as ReturnType["data"];
  }
};

export default getArtistById;
