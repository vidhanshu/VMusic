"use client";

import { useContext } from "react";
import MusicContext from "./music-context";

const useMusicContext = () => {
  const val = useContext(MusicContext);
  if (!val) throw new Error("Please use within MusicContextProvider");
  return val;
};

export default useMusicContext;
