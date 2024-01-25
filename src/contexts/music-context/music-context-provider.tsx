"use client";

import React, {
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

import MusicContext from "./music-context";

import { useLocalStorage } from "usehooks-ts";

import { getMusicUrl } from "@/utils/common";

import type NSMusic from "@/music";

const MusicContextProvider = ({ children }: PropsWithChildren) => {
  // to store the last playing music
  const [localMusic, setLocalMusic] = useLocalStorage<{
    currentMusic: NSMusic.IMusic | null;
    queue: {
      id: string;
      shuffle: boolean;
      activeIndex: number;
      songs: NSMusic.IMusic[];
      type: "album" | "playlist" | "artist";
    };
  }>("music", {
    currentMusic: null,
    queue: {
      id: "",
      shuffle: false,
      activeIndex: 0,
      songs: [],
      type: "album",
    },
  });

  // Audio ref for audio player
  const audioRef = useRef<HTMLAudioElement>(null);

  // Keeping sidebar state global, so that it can be accessed from anywhere
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // current music details
  const [currentMusicDetails, setCurrentMusicDetails] =
    useState<NSMusic.IMusicProviderState>({
      isPlaying: false,
      music: localMusic.currentMusic ?? null,
      loop: false,
      mute: false,
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
      },
    });

  // Utility functions for player
  const setIsPlaying = (isPlaying: boolean) => {
    // to set localMusic src
    if (!audioRef.current?.src) {
      const musicUrl = getMusicUrl(currentMusicDetails.music?.downloadUrl);
      if (musicUrl && audioRef.current) {
        audioRef.current.src = musicUrl;
      } else {
        return;
      }
    }

    setCurrentMusicDetails((prev) => ({ ...prev, isPlaying }));
  };

  const setCurrentMusic = (music: NSMusic.IMusic | null) => {
    if (!audioRef.current) return;

    setCurrentMusicDetails((prev) => ({ ...prev, music }));
    // also store in local storage
    setLocalMusic((prev) => ({
      ...prev,
      currentMusic: music,
    }));

    const musicUrl =
      music?.downloadUrl?.[2]?.link ??
      music?.downloadUrl?.[1]?.link ??
      music?.downloadUrl?.[0]?.link ??
      "";
    audioRef.current.src = musicUrl;
    setIsPlaying(true);
  };

  const togglePlay = () => {
    // to set localMusic src
    if (!audioRef.current?.src) {
      const musicUrl = getMusicUrl(currentMusicDetails.music?.downloadUrl);
      if (musicUrl && audioRef.current) {
        audioRef.current.src = musicUrl;
      } else {
        return;
      }
    }
    setIsPlaying(!currentMusicDetails.isPlaying);
  };

  const toggleLoop = () => {
    if (!audioRef.current?.src) return;
    setCurrentMusicDetails((prev) => {
      if (!currentMusicDetails.isPlaying) {
        setIsPlaying(true);
      }
      return { ...prev, loop: !prev.loop };
    });
  };

  const toggleMute = () => {
    if (!audioRef.current?.src) {
      return;
    }

    setCurrentMusicDetails((prev) => ({ ...prev, mute: !prev.mute }));
  };

  const setMute = (mute: boolean) => {
    if (!audioRef.current?.src) return;

    setCurrentMusicDetails((prev) => ({ ...prev, mute }));
  };

  const setPlayPause = (isPlaying: boolean) => {
    if (!audioRef.current?.src) return;

    setCurrentMusicDetails((prev) => ({ ...prev, isPlaying }));
  };

  const setData = (data: NSMusic.IMusicProviderState["data"]) => {
    setCurrentMusicDetails((prev) => ({ ...prev, data }));
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

  const nextSong = () => {
    if (!audioRef.current) return false;

    const { songs, activeIndex } = currentMusicDetails.queue;
    // if no queue exists
    if (!songs?.length) {
      return false;
    }

    const nextIndex = activeIndex + 1;
    setCurrentMusic(songs[nextIndex % songs.length] ?? null);
    setQueue({
      activeIndex: nextIndex,
      songs,
      shuffle: currentMusicDetails.queue.shuffle,
    });

    return true;
  };

  const prevSong = () => {
    if (!audioRef.current) return false;

    const { songs, activeIndex } = currentMusicDetails.queue;
    // if no queue exists
    if (!songs?.length) return false;

    const prevIndex = activeIndex - 1;
    const indexToSet = prevIndex < 0 ? songs.length - 1 : prevIndex;
    setCurrentMusic(songs[indexToSet] ?? null);
    setQueue({
      activeIndex: prevIndex,
      songs,
      shuffle: currentMusicDetails.queue.shuffle,
    });
    return true;
  };

  const playTheAudioRef = async () => {
    if (!audioRef.current?.src) return;

    try {
      await audioRef.current.play();
    } catch (error) {
      console.log(error);
    }
  };

  // effects
  useEffect(() => {
    if (!audioRef.current?.src) return;
    if (currentMusicDetails.isPlaying) {
      // eslint-disable-next-line
      playTheAudioRef();
    } else {
      audioRef.current.pause();
    }
  }, [currentMusicDetails.isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = getMusicUrl(localMusic?.currentMusic?.downloadUrl);
    }
  }, [localMusic]);

  /**
   * @description this is currently causing a problem, whenever the queue changes, the localstorage is updated
   * and thus the the page re-renders and set the currentMusic back from localStorage, causing music restart on pagination
   *
   * TODO: fix this
   *
   * // if queue changes, then update the localstorage as well
   * useEffect(() => {
   *  setLocalMusic((prev) => ({
   *      ...prev,
   *  queue: currentMusicDetails.queue,
   * }));
   * // eslint-disable-next-line react-hooks/exhaustive-deps
   * }, [currentMusicDetails.queue]);
   */

  return (
    <MusicContext.Provider
      value={{
        // right sidebar
        isRightSidebarOpen,
        setIsRightSidebarOpen: setIsRightSidebarOpen,
        // music
        currentMusic: currentMusicDetails.music,
        isPlaying: currentMusicDetails.isPlaying,
        setIsPlaying,
        setCurrentMusic,
        setPlayPause,
        togglePlay,
        setMute,
        audioRef,
        toggleLoop,
        toggleMute,
        mute: currentMusicDetails.mute,
        loop: currentMusicDetails.loop,
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
        nextSong,
        prevSong,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContextProvider;
