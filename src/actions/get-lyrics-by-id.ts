"use server";

import { REVALIDATE } from "@/utils/common/constants";

interface ReturnType {
  data: null | {
    lyrics: string;
    snippet: string;
    copyright: string;
  };
}
export const getLyricsById = async (
  id: string,
): Promise<ReturnType["data"]> => {
  try {
    const data = await fetch(`https://saavn.me/lyrics?id=${id}`, {
      next: { revalidate: REVALIDATE },
    });
    const json = (await data.json()) as ReturnType;
    return json.data;
  } catch (error) {
    return null;
  }
};