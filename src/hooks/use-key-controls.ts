"use client";

import { useEffect } from "react";
import useAudioPlayerContext from "@/contexts/audio-player-context/use-audio-player-context";

const useKeyControls = () => {
  const { togglePlay, nextSong, prevSong } = useAudioPlayerContext();
  const handleKeyDownEvents = (e: KeyboardEvent) => {
    if (e.key === "MediaPlayPause") {
      togglePlay();
    } else if (e.key === "MediaNextTrack") {
      nextSong();
    } else if (e.key === "MediaTrackPrevious") {
      prevSong();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDownEvents);
    return () => {
      document.removeEventListener("keydown", handleKeyDownEvents);
    };
  }, []);
};

export default useKeyControls;
