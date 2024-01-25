"use client";

import { toast } from "sonner";

import SearchedSongsList from "./song-list/searched-songs-list";

import useMusicContext from "@/contexts/music-context/use-music-context";

import { getSongById } from "@/actions";

import type NSMusic from "@/music";

const SearchedSongs = ({ songs }: { songs: NSMusic.IMusic[] }) => {
  const { setCurrentMusic, setIsPlaying } = useMusicContext();
  const handleSongClick = async (idx: number) => {
    const song = await getSongById(songs[idx]?.id ?? "");
    if (song?.length && song?.[0]) {
      setCurrentMusic(song[0]);
      setIsPlaying(true);
    } else {
      toast.error("Song not found");
    }
  };
  return (
    <div className="py-6">
      <SearchedSongsList
        handleSongClick={handleSongClick}
        showListHeader={false}
        songs={songs}
      />
    </div>
  );
};

export default SearchedSongs;
