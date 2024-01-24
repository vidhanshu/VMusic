"use client";

import type NSMusic from "@/music";
import useMusicContext from "@/contexts/music-context/use-music-context";
import { getSongById } from "@/actions/get-song-by-id";
import SearcedSongsList from "./song-list/searched-songs-list";

const SearchedSongs = ({ songs }: { songs: NSMusic.IMusic[] }) => {
  const { setCurrentMusic, setIsPlaying } = useMusicContext();
  const handleSongClick = async (idx: number) => {
    const song = await getSongById(songs[idx]?.id ?? "");
    if (song.length && song?.[0]) {
      setCurrentMusic(song[0]);
      setIsPlaying(true);
    }
  };
  return (
    <div className="py-6">
      <SearcedSongsList
        handleSongClick={handleSongClick}
        showListHeader={false}
        songs={songs}
      />
    </div>
  );
};

export default SearchedSongs;
