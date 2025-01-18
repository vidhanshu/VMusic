import ROUTES from "@/routes";
import type NSMusic from "@/music";
import type { Song } from "@prisma/client";

export const getMusicUrl = (downloadUrl?: NSMusic.IMusic["downloadUrl"]) => {
  if (!downloadUrl) return "";

  return (
    downloadUrl?.[4]?.url ??
    downloadUrl?.[3]?.url ??
    downloadUrl?.[2]?.url ??
    downloadUrl?.[1]?.url ??
    downloadUrl?.[0]?.url ??
    ""
  );
};
export const getMusicImageUrl = (image?: NSMusic.IMusic["image"]) => {
  if (!image) return "/vmusic.svg";

  return (
    image?.[4]?.url ??
    image?.[3]?.url ??
    image?.[2]?.url ??
    image?.[1]?.url ??
    image?.[0]?.url ??
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
  if (!artists || !artistsId) return [] as NSMusic.IArtist[];

  const artistMeta = [];
  const ARTISTS =
    decodeHTML(artists)
      ?.split(",")
      .map((artist) => artist.trim()) ?? [];
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

export function decodeHTML(encodedText: string) {
  if (typeof window === "undefined") return encodedText;

  const doc = new window.DOMParser().parseFromString(encodedText, "text/html");
  return doc.documentElement.textContent;
}

export function getArtistName(artist: string | NSMusic.IArtist[] | undefined) {
  return artist instanceof Array ? artist.join(", ") : artist;
}

export const getDummyArtistByIdAndName = ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => ({ id, name, role: "singer", image: [], type: "artist", url: "" });

export const getArtistsNames = (artists: NSMusic.IMusic["artists"]) => {
  if (!artists) return "Unknown Artist";
  return artists.all.map(({ name }) => name).join(", ");
};

export const getArtistIdsString = (artist: NSMusic.IMusic["artists"]) => {
  if (!artist) return "";
  return artist.all.map(({ id }) => id).join(", ");
};

export function getLinkByQueueType(
  type: "album" | "playlist" | "artist",
  id: string,
) {
  return `${
    type === "playlist"
      ? `${ROUTES.PLAYLISTS}/${id}/#`
      : type === "album"
        ? `${ROUTES.ALBUMS}/${id}/#`
        : `${ROUTES.ARTISTS}/${id}/#`
  }`;
}

export function setDocumentOverflow(val: boolean) {
  document.body.style.overflow = val ? "hidden" : "auto";
}

export const formattedTime = (seconds: number) => {
  if (!seconds) return "00:00";

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes < 10 ? `0${minutes}` : minutes}:${secs < 10 ? `0${secs}` : secs}`;
};

export const percentageToSeconds = (percentage: number, duration: number) => {
  return (percentage * duration) / 100;
};

/**
 * @description This way we can avoid-> domexception: The play() request was interrupted by a new load request
 * @param audioRef
 * @returns boolean
 */
export const isAudioPlaying = (audio: HTMLAudioElement) => {
  if (audio) {
    return (
      audio.currentTime > 0 &&
      !audio.paused &&
      !audio.ended &&
      audio.readyState > audio.HAVE_CURRENT_DATA
    );
  }
  return false;
};

export const songToMusicTransform = (song: Song): NSMusic.IMusic => {
  const names = song.primaryArtists?.split(", ") ?? [];
  const ids = song.primaryArtistsId?.split(", ") ?? [];

  const music: NSMusic.IMusic = {
    id: song.id,
    explicitContent: song.explicitContent,
    hasLyrics: song.hasLyrics,
    duration: song.duration,
    image: [
      {
        quality: "500x500",
        url: song.image,
      },
    ],
    label: song.label,
    language: song.language,
    lyricsId: song.lyricsId,
    name: song.name,
    playCount: song.playCount,
    releaseDate: song.releaseDate,
    type: song.type,
    url: song.url,
    year: song.year,
    album: song.albumId ? { id: song.albumId, name: "", url: "" } : undefined,
    artists: {
      all: names.map((name, idx) =>
        getDummyArtistByIdAndName({ name, id: ids[idx]! }),
      ),
      primary: [],
      featured: [],
    },
    copyright: song.copyright,
    downloadUrl: [
      {
        quality: "72kbps",
        url: song.downloadUrl,
      },
    ],
  };
  return music;
};
