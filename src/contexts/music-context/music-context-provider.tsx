"use client";

import React, { type PropsWithChildren, useState, useEffect } from "react";

import MusicContext from "./music-context";

import { useLocalStorage } from "usehooks-ts";

import type NSMusic from "@/music";
import getLikedSongIds from "@/actions/backend/get-liked-song-ids";

const MusicContextProvider = ({ children }: PropsWithChildren) => {
  // to store the last playing music
  const [inQueueMap, setInQueueMap] = useState<Record<string, boolean>>({}); // to keep track of which song is in queue
  const [localMusic, setLocalMusic] =
    useLocalStorage<NSMusic.ILocalStorageMusic>("music", {
      currentMusic: null,
      queue: {
        id: "",
        shuffle: false,
        activeIndex: 0,
        songs: [],
        type: "album",
      },
    });

  // current music details
  const [currentMusicDetails, setCurrentMusicDetails] =
    useState<NSMusic.IMusicProviderState>({
      music: localMusic.currentMusic ?? null,
      queue: {
        id: localMusic.queue.id,
        shuffle: false,
        songs: localMusic.queue.songs ?? [],
        activeIndex: localMusic.queue.activeIndex ?? 0,
        type: localMusic.queue.type ?? "album",
      },
      data: {
        newReleases: [],
        topCharts: [],
        topArtists: [],
        topPlaylists: [],
        trending: {
          albums: [],
          songs: [],
        },
        likedSongIdsMap: {},
      },
    });

  const setCurrentMusic = (music: NSMusic.IMusic | null) => {
    setCurrentMusicDetails((prev) => ({ ...prev, music }));
  };

  const setData = (data: NSMusic.IMusicProviderState["data"]) => {
    setCurrentMusicDetails((prev) => ({
      ...prev,
      data: {
        ...data,
        likedSongIdsMap: prev.data.likedSongIdsMap,
      },
    }));
  };

  const setQueue = (queue: {
    songs?: NSMusic.IMusic[];
    shuffle?: boolean;
    activeIndex?: number;
    type?: "album" | "playlist" | "artist";
  }) => {
    if (!queue.songs && !queue.shuffle && !queue.activeIndex && !queue.type)
      return;

    setCurrentMusicDetails((prev) => ({
      ...prev,
      queue: {
        ...currentMusicDetails.queue,
        ...queue,
      },
    }));
  };

  const addToQueue = (song: NSMusic.IMusic) => {
    // it should set song to just next to the current song
    // if current song is not present, then add it to the end
    const newQueue = [...currentMusicDetails.queue.songs];
    const activeIndex = currentMusicDetails.queue.activeIndex;
    // check if already in queue
    if (newQueue[activeIndex + 1]?.id === song.id) return false;
    newQueue.splice(activeIndex + 1, 0, song);
    setQueue({ songs: newQueue });
    return true;
  };
  const removeFromQueye = (songId: string) => {
    if (currentMusicDetails.queue.songs.length === 0) {
      return false;
    } else if (
      currentMusicDetails.queue.songs.find((song) => song.id === songId)
    ) {
      const newQueue = currentMusicDetails.queue.songs.filter(
        (song) => song.id !== songId,
      );
      setQueue({ songs: newQueue });
      return true;
    }
    return false;
  };

  const setLikedSongsIdsMap = (id: string) => {
    setCurrentMusicDetails((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        likedSongIdsMap: {
          ...prev.data.likedSongIdsMap,
          [id]: true,
        },
      },
    }));
  };

  const unsetLikedSongsIdsMap = (id: string) => {
    setCurrentMusicDetails((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        likedSongIdsMap: {
          ...prev.data.likedSongIdsMap,
          [id]: false,
        },
      },
    }));
  };

  useEffect(() => {
    const newInQueueMap: Record<string, boolean> = {};
    currentMusicDetails.queue.songs.forEach((song) => {
      newInQueueMap[song.id] = true;
    });
    setInQueueMap(newInQueueMap);
  }, [currentMusicDetails.queue.songs]);

  useEffect(() => {
    setLocalMusic((prev) => ({
      ...prev,
      queue: currentMusicDetails.queue,
    }));
  }, [currentMusicDetails.queue]);

  const refetchLikedSongs = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getLikedSongIds().then((res) => {
      if (!res.error) {
        const likedMap: Record<string, boolean> = {};
        res.data.map((id) => {
          likedMap[id] = true;
        });
        setCurrentMusicDetails((prev) => ({
          ...prev,
          data: {
            ...prev.data,
            likedSongIdsMap: likedMap,
          },
        }));
      }
    });
  };

  useEffect(() => {
    refetchLikedSongs();
  }, []);

  return (
    <MusicContext.Provider
      value={{
        // music
        currentMusic: currentMusicDetails.music,
        setCurrentMusic,

        // local storage music
        localMusic,
        setLocalMusic,

        data: currentMusicDetails.data,
        setData,

        queue: {
          id: currentMusicDetails.queue.id,
          activeIndex: currentMusicDetails.queue.activeIndex,
          songs: currentMusicDetails.queue.songs,
          shuffle: currentMusicDetails.queue.shuffle,
          type: currentMusicDetails.queue.type,
        },
        setQueue,
        addToQueue,
        removeFromQueye,
        inQueueMap,

        likedSongIdsMap: currentMusicDetails.data.likedSongIdsMap ?? {},
        setLikedSongsIdsMap,
        unsetLikedSongsIdsMap,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContextProvider;
