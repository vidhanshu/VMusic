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

export const downloadSong = (downloadUrl: string) => {
  if (!!downloadUrl) {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "song.mp3";
    a.click();
  }
};
