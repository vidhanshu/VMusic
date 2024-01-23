import type NSMusic from "@/music";

export const getMusicUrl = (downloadUrl?: NSMusic.IMusic["downloadUrl"]) => {
  if (!downloadUrl) return "";

  return (
    downloadUrl?.[2]?.link ??
    downloadUrl?.[1]?.link ??
    downloadUrl?.[0]?.link ??
    ""
  );
};
