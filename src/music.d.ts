/* eslint-disable */

namespace NSMusic {
  interface IImageSong {
    quality: string;
    link: string;
  }

  interface IMusic {
    id: string;
    name: string;
    type: string;
    album?: {
      id: string;
      name: string;
      url: string;
    };
    year: string;
    releaseDate: null | string;
    duration: string;
    label: string;
    primaryArtists: string;
    primaryArtistsId: string;
    featuredArtists: string;
    featuredArtistsId: string;
    explicitContent: number;
    playCount: string | number;
    language: string;
    hasLyrics: boolean | string;
    url: string;
    copyright: string;
    image: IImageSong[];
    downloadUrl: IImageSong[];
  }

  interface IArtist {
    id: string;
    name: string;
    url: string;
    role: string;
    image: IImageSong[];
    isRadioPresent: boolean;
  }

  interface IMusicContext {
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    setCurrentMusic: (music: IMusic | null) => void;
    togglePlay: () => void;
    setPlayPause: (isPlaying: boolean) => void;
    currentMusic: IMusic | null;
    audioRef: React.RefObject<HTMLAudioElement> | null;
    isRightSidebarOpen: boolean;
    setIsRightSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleLoop: () => void;
    loop: boolean;
    mute: boolean;
    toggleMute: () => void;
    setMute: (mute: boolean) => void;
  }

  interface IMusicProviderState {
    isPlaying: boolean;
    music: null | IMusic;
    loop: boolean;
    mute: boolean;
  }
}

export default NSMusic;
