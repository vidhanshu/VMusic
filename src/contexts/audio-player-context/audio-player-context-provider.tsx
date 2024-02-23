"use client";

import { type PropsWithChildren, useRef, useState, useEffect } from "react";

import { getMusicUrl, isAudioPlaying } from "@/utils/common";

import { AudioPlayerContext } from "./audio-player-context";

import useMusicContext from "../music-context/use-music-context";

import type NSMusic from "@/music";
import type NSAudio from "@/audio";

const AudioPlayerContextProvider = ({ children }: PropsWithChildren) => {
  // USING HOOKS ---------------------------------------------------------------------------------
  const { currentMusic, queue, setQueue, setCurrentMusic, setLocalMusic } =
    useMusicContext();

  // STATE ---------------------------------------------------------------------------------------
  const [AudioPlayerState, setAudioPlayerState] =
    useState<NSAudio.IAudioPlayerState>({
      isPlaying: false,
      isRightSidebarOpen: false,
      loop: false,
      mute: false,
    });

  // REFS ----------------------------------------------------------------------------------------
  const audioRef = useRef<HTMLAudioElement>(null);

  // HANDLERS ------------------------------------------------------------------------------------
  const playTheAudioRef = () => {
    if (!audioRef.current || !currentMusic?.downloadUrl?.length) return;

    // if no src found, since there exist current music, set the src
    if (!audioRef.current.src) {
      const musicUrl = getMusicUrl(currentMusic.downloadUrl);
      audioRef.current.src = musicUrl;
    }

    const isPlaying = isAudioPlaying(audioRef.current);
    if (!isPlaying) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      audioRef.current.play();
    }
  };

  const pauseTheAudioRef = () => {
    if (!audioRef.current || !currentMusic?.downloadUrl?.length) return;

    // if no src found, since there exist current music, set the src
    if (!audioRef.current.src) {
      const musicUrl = getMusicUrl(currentMusic.downloadUrl);
      audioRef.current.src = musicUrl;
    }

    const isPlaying = isAudioPlaying(audioRef.current);
    if (isPlaying) {
      audioRef.current.pause();
    }
  };

  const setIsPlaying = (isPlaying: boolean) => {
    if (!audioRef.current || !currentMusic?.downloadUrl?.length) return;

    if (isPlaying) {
      playTheAudioRef();
    } else {
      pauseTheAudioRef();
    }

    setAudioPlayerState((prev) => ({ ...prev, isPlaying }));
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentMusic?.downloadUrl?.length) return;

    const isPlaying = isAudioPlaying(audioRef.current);
    if (isPlaying) {
      pauseTheAudioRef();
    } else {
      playTheAudioRef();
    }

    setAudioPlayerState((prev) => ({ ...prev, isPlaying: !isPlaying }));
  };

  const nextSong = () => {
    if (!audioRef.current) return false;

    const { songs, activeIndex } = queue;

    if (!songs?.length) {
      //TODO: if no queue exists, may be picking up random playlist wd be great
      return false;
    }

    const nextIndex = activeIndex + 1;
    const indexToSet = nextIndex % songs.length;
    playThisSong(songs[indexToSet] ?? null);
    setQueue({ activeIndex: nextIndex });
    return true;
  };

  const prevSong = () => {
    if (!audioRef.current) return false;

    const { songs, activeIndex } = queue;

    if (!songs?.length) return false;

    const prevIndex = activeIndex - 1;
    const indexToSet = prevIndex < 0 ? songs.length - 1 : prevIndex;
    playThisSong(songs[indexToSet] ?? null);
    setQueue({ activeIndex: prevIndex });

    return true;
  };

  const setIsRightSidebarOpen = (isRightSidebarOpen: boolean) => {
    setAudioPlayerState((prev) => ({ ...prev, isRightSidebarOpen }));
  };

  const toggleLoop = () => {
    if (!audioRef.current?.src) return;
    setAudioPlayerState((prev) => ({ ...prev, loop: !prev.loop }));
  };

  const toggleMute = () => {
    if (!audioRef.current?.src) return;
    setAudioPlayerState((prev) => ({ ...prev, mute: !prev.mute }));
  };

  const setMute = (mute: boolean) => {
    if (!audioRef.current?.src) return;
    setAudioPlayerState((prev) => ({ ...prev, mute }));
  };

  const playThisSong = (music: NSMusic.IMusic | null) => {
    if (!audioRef.current) return;

    setCurrentMusic(music);
    setLocalMusic((prev) => ({ ...prev, currentMusic: music }));
    const musicUrl = getMusicUrl(music?.downloadUrl);
    audioRef.current.src = musicUrl;
    setIsPlaying(true);
  };

  // EFFECTS -------------------------------------------------------------------------------------
  return (
    <AudioPlayerContext.Provider
      value={{
        audioRef,

        isPlaying: AudioPlayerState.isPlaying,
        setIsPlaying,
        togglePlay,
        playThisSong,

        isRightSidebarOpen: AudioPlayerState.isRightSidebarOpen,
        setIsRightSidebarOpen,

        loop: AudioPlayerState.loop,
        toggleLoop,
        mute: AudioPlayerState.mute,
        setMute,
        toggleMute,
        nextSong,
        prevSong,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerContextProvider;
