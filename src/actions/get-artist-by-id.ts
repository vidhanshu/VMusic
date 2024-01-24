"use server";

import type NSMusic from "@/music";
import { REVALIDATE } from "@/utils/common/constants";

interface ReturnType {
  data: NSMusic.IDetailedArtist;
}
export const getArtist = async (id: string): Promise<ReturnType["data"]> => {
  try {
    const data = await fetch(`https://saavn.me/artists?id=${id}`, {
      next: { revalidate: REVALIDATE },
    });
    const json = (await data.json()) as ReturnType;
    return json.data;
  } catch (error) {
    return {} as ReturnType["data"];
  }
};
