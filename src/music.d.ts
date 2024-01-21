namespace NSMusic {
  interface Music {
    
  }

  interface IMusicContext {
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  }
}

export default NSMusic;
