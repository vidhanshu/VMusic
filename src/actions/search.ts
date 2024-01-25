"use server";

import type NSMusic from "@/music";
import { DEFAULT_SEARCH_ALL_VAL } from "@/utils/common";

export default async function search(
  keyword: string,
): Promise<NSMusic.ISearchAllType> {
  try {
    const data = await fetch(`https://saavn.me/search/all?query=${keyword}`);
    const response = (await data.json()) as { data: NSMusic.ISearchAllType };
    return response.data;
  } catch (error) {
    return DEFAULT_SEARCH_ALL_VAL;
  }
}
