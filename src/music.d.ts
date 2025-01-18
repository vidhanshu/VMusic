/* eslint-disable */

namespace NSMusic {
  interface IImageSong {
    quality: string;
    url: string;
  }

  interface IMusic {
    id: string;
    name: string;
    title?: string;
    type: string | null;
    year: string;
    releaseDate: string | null;
    duration: string | null;
    label: string | null;
    explicitContent: boolean;
    playCount: string | null;
    language: string | null;
    hasLyrics: boolean | null;
    lyricsId: string | null;
    url: string;
    copyright: string | null;
    album?: {
      id: string;
      name: string;
      url: string;
    };
    artists: {
      primary: IArtist[];
      featured: IArtist[];
      all: IArtist[];
    };
    image: IImageSong[];
    downloadUrl: IImageSong[];
    primaryArtists?: string;
  }

  interface IAlbum {
    id: string;
    name: string;
    title?: title;
    description: string;
    type: string;
    year: string;
    playCount: string | null;
    language: string | null;
    explicitContent: boolean;
    url: string;
    songCount: string;
    artists: {
      primary: IArtist[];
      featured: IArtist[];
      all: IArtist[];
    };
    image: IImageSong[];
    songs: IMusic[];
  }

  interface IPlaylist {
    id: string;
    name: string;
    title?: string;
    description: string;
    type: string;
    year: null | string;
    playCount: null | string;
    language: null | string;
    explicitContent: boolean;
    url: string;
    songCount: string | null;
    artists: IArtist[];
    image: IImageSong[];
    songs: IMusic[];
  }

  type IChart = IPlaylist;

  interface IArtist {
    id: string;
    name: string;
    title?: string;
    role: string;
    image: IImageSong[];
    type: string;
    url: string;
  }

  interface IDetailedArtist {
    id: string;
    name: string;
    url: string;
    type: string;
    followerCount: number;
    fanCount: string;
    isVerified: boolean;
    dominantLanguage: string;
    dominantType: string;
    bio: string[];
    dob: string | null;
    fb: string | null;
    twitter: string | null;
    wiki: string | null;
    availableLanguages: string[];
    isRadioPresent: boolean;
    image: IImageSong[];
    topSongs: IMusic[];
    topAlbums: IAlbum[];
    singles: IMusic[];
    similarArtists: IArtist[];
  }

  interface IMusicContext {
    setCurrentMusic: (music: IMusic | null) => void;
    currentMusic: IMusic | null;

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
    addToQueue: (song: IMusic) => boolean;
    removeFromQueue: (songId: string) => boolean;
    inQueueMap: Record<string, boolean>;

    // home page stuffs
    data: IMusicProviderState["data"];
    setData: (data: IMusicProviderState["data"]) => void;

    // local storage
    localMusic: ILocalStorageMusic;
    setLocalMusic: React.Dispatch<React.SetStateAction<ILocalStorageMusic>>;

    // liked songs
    likedSongIdsMap: Record<string, boolean>;
    setLikedSongsIdsMap: (id: string) => void;
    unsetLikedSongsIdsMap: (id: string) => void;
  }

  interface ILocalStorageMusic {
    currentMusic: NSMusic.IMusic | null;
    queue: {
      id: string;
      shuffle: boolean;
      activeIndex: number;
      songs: NSMusic.IMusic[];
      type: "album" | "playlist" | "artist";
    };
  }

  interface IMusicProviderState {
    music: null | IMusic;
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
      likedSongIdsMap: Record<string, boolean>;
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
