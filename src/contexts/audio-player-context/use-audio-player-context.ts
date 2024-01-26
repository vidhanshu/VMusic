"use client";

import { useContext } from "react";
import { AudioPlayerContext } from "./audio-player-context";

export default function useAudioPlayerContext() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      "useAudioPlayerContext must be used within a AudioPlayerContextProvider",
    );
  }
  return context;
}
