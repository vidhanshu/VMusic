/* eslint-disable */

import { createContext } from "react";

import NSMusic from "@/music";

const MusicContext = createContext<NSMusic.IMusicContext>({
  isPlaying: false,
  setIsPlaying: () => {},
  currentMusic: null,
  audioRef: null,
  isRightSidebarOpen: false,
  loop: false,
  mute: false,
  setCurrentMusic: () => {},
  setIsRightSidebarOpen: () => {},
  setMute: () => {},
  setPlayPause: () => {},
  toggleLoop: () => {},
  toggleMute: () => {},
  togglePlay: () => {},
  data: {
    newReleases: [],
    topCharts: [],
    topPlaylists: [],
    topArtists: [],
    trending: {
      albums: [],
      songs: [],
    },
  },
  setData: () => {},
  queue: {
    id: "",
    songs: [],
    activeIndex: 0,
    shuffle: false,
  },
  prevSong: () => false,
  nextSong: () => false,
  setQueue: () => {},
});

export default MusicContext;
