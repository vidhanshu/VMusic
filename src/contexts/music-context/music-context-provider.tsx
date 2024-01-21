"use client";

import React, { PropsWithChildren, useState } from "react";
import MusicContext from "./music-context";

const MusicContextProvider = ({ children }: PropsWithChildren) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContextProvider;
