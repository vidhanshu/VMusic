"use client";

import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

import MusicContext from "./music-context";

import NSMusic from "@/music";

const MusicContextProvider = ({ children }: PropsWithChildren) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [currentMusicDetails, setCurrentMusicDetails] =
  useState<NSMusic.IMusicProviderState>({
    isPlaying: false,
    music: null,
      completedPercentage: 0,
      loop: false,
      mute: false,
      volume: 100,
    });
    
  const setIsPlaying = (isPlaying: boolean) => {
    if (!audioRef.current?.src) return;

    setCurrentMusicDetails((prev) => ({ ...prev, isPlaying }));
  };

  const setCurrentMusic = (music: NSMusic.IMusic) => {
    if (!audioRef.current) return;

    setCurrentMusicDetails((prev) => ({ ...prev, music }));

    const musicUrl =
      music.downloadUrl?.[2]?.link ||
      music.downloadUrl?.[1]?.link ||
      music.downloadUrl?.[0]?.link ||
      "";
    audioRef.current.src = musicUrl;
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current?.src) return;
    setIsPlaying(!currentMusicDetails.isPlaying);
  };

  const setCompletedPercentage = (percentage: number) => {
    if (!audioRef.current?.src) return;

    setCurrentMusicDetails((prev) => ({
      ...prev,
      completedPercentage: percentage,
    }));
  };

  const toggleLoop = () => {
    if (!audioRef.current?.src) return;

    setCurrentMusicDetails((prev) => ({ ...prev, loop: !prev.loop }));
  };

  const toggleMute = () => {
    if (!audioRef.current?.src) return;

    setCurrentMusicDetails((prev) => ({ ...prev, mute: !prev.mute }));
  };

  const setVolume = (volume: number) => {
    if (!audioRef.current?.src) return;

    setCurrentMusicDetails((prev) => ({ ...prev, volume }));
  };

  const setMute = (mute: boolean) => {
    if (!audioRef.current?.src) return;

    setCurrentMusicDetails((prev) => ({ ...prev, mute }));
  };

  const setPlayPause = (isPlaying: boolean) => {
    if (!audioRef.current?.src) return;

    setCurrentMusicDetails((prev) => ({ ...prev, isPlaying }));
  };

  // effects
  useEffect(() => {
    if (!audioRef.current?.src) return;
    if (currentMusicDetails.isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentMusicDetails.isPlaying]);

  return (
    <MusicContext.Provider
      value={{
        // right sidebar
        isRightSidebarOpen,
        setIsRightSidebarOpen: setIsRightSidebarOpen as React.Dispatch<
          React.SetStateAction<boolean>
        >,
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
        setVolume,
        mute: currentMusicDetails.mute,
        volume: currentMusicDetails.volume,
        loop: currentMusicDetails.loop,
        setCompletedPercentage,
        completedPercentage: currentMusicDetails.completedPercentage,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContextProvider;
