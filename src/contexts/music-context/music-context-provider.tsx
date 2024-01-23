"use client";

import React, {
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

import MusicContext from "./music-context";

import type NSMusic from "@/music";
import { useLocalStorage } from "usehooks-ts";
import { getMusicUrl } from "@/utils/common/helpers";

const MusicContextProvider = ({ children }: PropsWithChildren) => {
  // to store the last playing music
  const [localMusic, setLocalMusic] = useLocalStorage<NSMusic.IMusic | null>(
    "music",
    null,
  );

  // Audio ref for audio player
  const audioRef = useRef<HTMLAudioElement>(null);

  // Keeping sidebar state global, so that it can be accessed from anywhere
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // current music details
  const [currentMusicDetails, setCurrentMusicDetails] =
    useState<NSMusic.IMusicProviderState>({
      isPlaying: false,
      music: localMusic,
      loop: false,
      mute: false,
      data: {
        newReleases: [],
        topCharts: [],
        topArtists: [],
        topPlaylists: [],
        trending: {
          albums:[],
          songs: []
        }
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
    setLocalMusic(music);

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
  }

  // effects
  useEffect(() => {
    if (!audioRef.current?.src) return;
    if (currentMusicDetails.isPlaying) {
      // eslint-disable-next-line
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentMusicDetails.isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = getMusicUrl(localMusic?.downloadUrl);
    }
  }, [localMusic]);

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
        data:currentMusicDetails.data,
        setData
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContextProvider;
