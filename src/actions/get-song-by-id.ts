"use server";

import type NSMusic from "@/music";
import { REVALIDATE } from "@/utils/common";

interface ReturnType {
  data: NSMusic.IMusic[];
}
const getSongById = async (id: string): Promise<ReturnType["data"]> => {
  try {
    const data = await fetch(`https://saavn.me/songs?id=${id}`, {
      next: { revalidate: REVALIDATE },
    });
    const json = (await data.json()) as ReturnType;
    return json.data;
  } catch (error) {
    return [];
  }
};

export default getSongById;