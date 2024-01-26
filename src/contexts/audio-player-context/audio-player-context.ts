/* eslint-disable */

import { createContext } from "react";

import type NSAudio from "@/audio";

export const AudioPlayerContext = createContext<NSAudio.IAudioPlayerContext>({
  audioRef: null,
  // Play/Pause
  isPlaying: false,
  setIsPlaying: () => {},
  togglePlay: () => {},
  playThisSong: () => {},

  // Audio player sidebar
  isRightSidebarOpen: false,
  setIsRightSidebarOpen: () => {},

  // Loop
  loop: false,
  toggleLoop: () => {},

  // Mute
  mute: false,
  setMute: () => {},
  toggleMute: () => {},

  // Song change
  prevSong: () => false,
  nextSong: () => false,
});
