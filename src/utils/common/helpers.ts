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

export const getShortNumberRepresentation = (num: number) => {
  if (num >= 1000000000) return `${Math.floor(num / 1000000000)}B`;
  if (num >= 1000000) return `${Math.floor(num / 1000000)}M`;
  if (num >= 1000) return `${Math.floor(num / 1000)}K`;
  return num;
};

export const getArtistAndArtistIdArray = (
  artists?: string,
  artistsId?: string,
) => {
  const artistMeta = [];
  const ARTISTS = artists?.split(",").map((artist) => artist.trim()) ?? [];
  const ARTISTS_ID =
    artistsId?.split(",").map((artistId) => artistId.trim()) ?? [];

  if (ARTISTS.length !== ARTISTS_ID.length) {
    return [];
  }

  for (let i = 0; i < ARTISTS.length; i++) {
    artistMeta.push({
      name: ARTISTS[i]!,
      id: ARTISTS_ID[i]!,
    });
  }

  return artistMeta;
};

export function shuffleArray<T>(array: T[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[j]!;
    newArray[j] = temp!;
  }
  return newArray;
}
