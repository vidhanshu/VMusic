"use client";

import { useEffect } from "react";

import useMusicContext from "@/contexts/music-context/use-music-context";

const useMusicKeyboardControls = () => {
  const { toggleMute, togglePlay, isPlaying } = useMusicContext();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault();
      togglePlay();
    } else if (e.code === "KeyM") {
      e.preventDefault();
      toggleMute();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);
};

export default useMusicKeyboardControls;
