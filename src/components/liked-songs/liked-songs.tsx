"use client";

import { Song } from "@prisma/client";
import React, { useEffect, useState } from "react";
import getLikedSongs from "@/actions/backend/get-liked-songs";
import { getSongFromLikedSong } from "@/utils/common";
import { SongListItem } from "../common/song-list/song-list-item";
import useMusicContext from "@/contexts/music-context/use-music-context";
import useAudioPlayerContext from "@/contexts/audio-player-context/use-audio-player-context";
import SongListSkeleton from "../common/song-list/song-list-skeleton";

const LikedSongs = ({ userId }: { userId?: string }) => {
  const { likedSongIdsMap, currentMusic } = useMusicContext();
  const { togglePlay, playThisSong } = useAudioPlayerContext();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getLikedSongs(userId)
      .then((res) => {
        if (!res.error) {
          setSongs(res.data);
        }
      })
      .finally(() => setLoading(false));
  }, [likedSongIdsMap, userId]);

  const handleSongClick = (idx: number, id: string) => {
    const isCurrentSongPlaying = currentMusic?.id === id;

    // if current song is already playing, then pause other wise set current song
    if (isCurrentSongPlaying) {
      togglePlay();
    } else {
      playThisSong(getSongFromLikedSong(songs[idx]!));
    }
  };

  return (
    <div className="space-y-2">
      {loading ? (
        <SongListSkeleton />
      ) : (
        songs.map((song, idx) => (
          <SongListItem
            key={idx}
            handleSongClick={handleSongClick}
            idx={idx}
            showPlayCount={false}
            song={getSongFromLikedSong(song)}
          />
        ))
      )}
    </div>
  );
};

export default LikedSongs;
