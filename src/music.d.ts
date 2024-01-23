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
    primaryArtists: string | IArtist[];
    primaryArtistsId?: string;
    featuredArtists: string;
    featuredArtistsId?: string | IArtist[];
    explicitContent: number;
    playCount: string | number;
    language: string;
    hasLyrics: boolean | string;
    url: string;
    copyright: string;
    image: IImageSong[];
    downloadUrl?: IImageSong[];
  }

  interface IAlbum {
    id: string;
    name: string;
    year: string;
    type: string;
    playCount: string;
    language: string;
    explicitContent: string;
    url: string;
    primaryArtists: IArtist[];
    featuredArtists: IArtist[];
    artists: IArtist[];
    image: IImageSong[];
    songs: [];
  }

  interface IPlaylist {
    id: string;
    userId: string;
    title: string;
    subtitle: string;
    type: string;
    image: IImageSong[];
    url: string;
    songCount: string;
    firstname: string;
    followerCount: string;
    lastUpdated: string;
    explicitContent: string;
  }

  type IChart = { language: string } & Omit<
    IPlaylist,
    "songCount" | "userId" | "followerCount" | "lastUpdated"
  >;

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

    // home page stuffs
    data: IMusicProviderState["data"];
    setData: (data: IMusicProviderState["data"]) => void;
  }

  interface IMusicProviderState {
    isPlaying: boolean;
    music: null | IMusic;
    loop: boolean;
    mute: boolean;
    data: {
      newReleases: IMusic[];
      topCharts: IChart[];
      topPlaylists: IPlaylist[];
      topArtists: IArtist[];
      trending: {
        songs: IMusic[];
        albums: IAlbum[];
      };
    };
  }
}

export default NSMusic;
