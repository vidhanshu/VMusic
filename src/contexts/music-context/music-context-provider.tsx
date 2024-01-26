"use client";

import React, { type PropsWithChildren, useState } from "react";

import MusicContext from "./music-context";

import { useLocalStorage } from "usehooks-ts";

import type NSMusic from "@/music";

const MusicContextProvider = ({ children }: PropsWithChildren) => {
  // to store the last playing music
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
      },
    });

  const setCurrentMusic = (music: NSMusic.IMusic | null) => {
    setCurrentMusicDetails((prev) => ({ ...prev, music }));
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
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContextProvider;
