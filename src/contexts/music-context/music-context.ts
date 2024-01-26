/* eslint-disable */

import { createContext } from "react";

import NSMusic from "@/music";

const MusicContext = createContext<NSMusic.IMusicContext>({
  currentMusic: null,
  setCurrentMusic: () => {},
  localMusic: {
    currentMusic: null,
    queue: {
      activeIndex: 0,
      id: "",
      shuffle: false,
      songs: [],
      type: "album",
    },
  },
  setLocalMusic: () => {},
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
    type: "album",
  },
  setQueue: () => {},
});

export default MusicContext;
