"use client";

import { toast } from "sonner";

import SearchedSongsList from "./song-list/searched-songs-list";

import useAudioPlayerContext from "@/contexts/audio-player-context/use-audio-player-context";

import { getSongById } from "@/actions/saavn";

import type NSMusic from "@/music";
import useMusicContext from "@/contexts/music-context/use-music-context";

const SearchedSongs = ({ songs }: { songs: NSMusic.IMusic[] }) => {
  const { setIsPlaying, playThisSong, togglePlay } = useAudioPlayerContext();
  const { currentMusic } = useMusicContext();

  const handleSongClick = async (idx: number) => {
    const song = await getSongById(songs[idx]?.id ?? "");
    if (currentMusic?.id === song?.[0]?.id) return togglePlay();

    if (song?.length && song?.[0]) {
      playThisSong(song[0]);
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
