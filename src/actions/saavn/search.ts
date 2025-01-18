"use server";

import type NSMusic from "@/music";
import { BASE_API_URL, DEFAULT_SEARCH_ALL_VAL } from "@/utils/common";

export default async function search(
  keyword: string,
): Promise<NSMusic.ISearchAllType> {
  try {
    const data = await fetch(`${BASE_API_URL}/search?query=${keyword}`);
    const response = (await data.json()) as { data: NSMusic.ISearchAllType };
    return response.data;
  } catch (error) {
    return DEFAULT_SEARCH_ALL_VAL;
  }
}
