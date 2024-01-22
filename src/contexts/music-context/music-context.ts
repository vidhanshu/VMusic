import { createContext } from "react";

import NSMusic from "@/music";

const MusicContext = createContext<NSMusic.IMusicContext>({
  isPlaying: false,
  setIsPlaying: () => {},
  currentMusic: null,
  audioRef: null,
});

export default MusicContext;
