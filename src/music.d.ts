/* eslint-disable */

namespace NSMusic {
  interface IImageSong {
    quality: string;
    link: string;
  }

  interface IMusic {
    id: string;
    name: string;
    title?: string;
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
    primaryArtists: IArtist[] | string;
    primaryArtistsId?: string;
    songCount?: string;
    featuredArtists: IArtist[];
    artists: IArtist[];
    image: IImageSong[];
    songs: [];
  }

  interface IPlaylist {
    id: string;
    userId: string;
    title: string;
    name?: string;
    subtitle: string;
    type: string;
    image: IImageSong[];
    url: string;
    songCount: string;
    firstname: string;
    followerCount: string;
    lastUpdated: string;
    explicitContent: string;
    songs?: IMusic[];
  }

  type IChart = { language: string } & Omit<
    IPlaylist,
    "songCount" | "userId" | "followerCount" | "lastUpdated"
  >;

  interface IArtist {
    id: string;
    name: string;
    title?: string;
    url: string;
    role: string;
    image: IImageSong[];
    isRadioPresent: boolean;
  }

  interface IDetailedArtist {
    id: string;
    name: string;
    url: string;
    image: IImageSong[];
    followerCount: string;
    fanCount: string;
    isVerified: true;
    dominantLanguage: string;
    dominantType: string;
    bio: [];
    dob: string;
    fb: string;
    twitter: string;
    wiki: string;
    availableLanguages: string[];
    isRadioPresent: true;
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
    // music queue
    queue: {
      id: string;
      songs: IMusic[];
      activeIndex: number;
      shuffle: boolean;
      type: "artist" | "album" | "playlist";
    };
    setQueue: (queue: {
      id?: string;
      songs?: IMusic[];
      shuffle?: boolean;
      activeIndex?: number;
      type?: "artist" | "album" | "playlist";
    }) => void;
    prevSong: () => boolean;
    nextSong: () => boolean;

    // home page stuffs
    data: IMusicProviderState["data"];
    setData: (data: IMusicProviderState["data"]) => void;
  }

  interface IMusicProviderState {
    isPlaying: boolean;
    music: null | IMusic;
    loop: boolean;
    mute: boolean;
    queue: {
      id: string;
      songs: IMusic[];
      activeIndex: number;
      shuffle: boolean;
      type: "artist" | "album" | "playlist";
    };
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

  interface ISearchAllType {
    topQuery: {
      results: NSMusic.IMusic[];
      position: 0;
    };
    songs: {
      results: NSMusic.IMusic[];
      position: 2;
    };
    albums: {
      results: NSMusic.IAlbum[];
      position: 1;
    };
    artists: {
      results: NSMusic.IArtist[];
      position: 4;
    };
    playlists: {
      results: NSMusic.IPlaylist[];
      position: 3;
    };
  }
}

export default NSMusic;
