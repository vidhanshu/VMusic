"use server";

import { BASE_API_URL, REVALIDATE } from "@/utils/common";

interface ReturnType {
  data: null | {
    lyrics: string;
    snippet: string;
    copyright: string;
  };
}
const getLyricsById = async (id: string): Promise<ReturnType["data"]> => {
  try {
    const data = await fetch(`${BASE_API_URL}/songs/${id}/lyrics`, {
      next: { revalidate: REVALIDATE },
    });
    const json = (await data.json()) as ReturnType;
    return json.data;
  } catch (error) {
    return null;
  }
};

export default getLyricsById;
