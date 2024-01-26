import type NSMusic from "@/music";
import {
  BarChart2,
  Compass,
  Search,
  ThumbsUp,
  UserSquareIcon,
} from "lucide-react";

export const REVALIDATE = 43200;
export const BASE_API_URL = "https://saavn.me";

// Animation constants
export const SIDEBAR_ANIMATION = {
  initial: {
    x: -300,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  transition: {
    stiffness: 0,
  },
};

export const BOTTOM_PLAYER_ANIMATION = {
  transition: {
    stiffness: 0,
  },
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 100,
    opacity: 0,
  },
};

export const RIGHT_SONG_PLAYER_ANIMATION = {
  initial: {
    x: 300,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 300,
    opacity: 0,
  },
  transition: {
    stiffness: 0,
  },
};

export const HERO_CARD_ANIMATION = {
  initial: { y: -30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    stiffness: 0,
  },
};

export const SONG_LIST_ITEM_ANIMATION = {
  initial: { opacity: 0, x: -100 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
};

export const DEFAULT_SEARCH_ALL_VAL: NSMusic.ISearchAllType = {
  topQuery: {
    results: [],
    position: 0,
  },
  albums: {
    results: [],
    position: 1,
  },
  songs: {
    results: [],
    position: 2,
  },
  playlists: {
    results: [],
    position: 3,
  },
  artists: {
    results: [],
    position: 4,
  },
};

export const SIDEBAR_MENU = [
  {
    title: "MENU",
    menuItems: [
      {
        title: "Discover",
        icon: Compass,
        link: "/",
      },
      {
        title: "Top Artists",
        icon: UserSquareIcon,
        link: "/artists",
      },
      {
        title: "Top Playlists",
        icon: BarChart2,
        link: "/top-playlists",
      },
      {
        title: "Search",
        icon: Search,
        link: "/search",
      },
    ],
  },
  {
    title: "COLLECTIONS",
    menuItems: [
      {
        title: "Liked Songs",
        icon: ThumbsUp,
        link: "/liked-songs",
      },
      {
        title: "Playlists",
        icon: UserSquareIcon,
        link: "/playlists",
      },
    ],
  },
];

export const ARTISTS = [
  {
    id: "1992504",
    name: "Elley Duhe",
    url: "https://www.jiosaavn.com/artist/elley-duhe/djVy4zV9yTM_",
    image: [
      {
        quality: "50x50",
        link: "https://c.saavncdn.com/artists/Elley_Duhe_000_20230829065931_50x50.jpg",
      },
      {
        quality: "150x150",
        link: "https://c.saavncdn.com/artists/Elley_Duhe_000_20230829065931_150x150.jpg",
      },
      {
        quality: "500x500",
        link: "https://c.saavncdn.com/artists/Elley_Duhe_000_20230829065931_500x500.jpg",
      },
    ],
    followerCount: "37289",
    fanCount: "464903",
    isVerified: false,
    dominantLanguage: "english",
    dominantType: "associatedperformer",
    bio: [],
    dob: "",
    fb: "",
    twitter: "",
    wiki: "",
    availableLanguages: ["english", "instrumental", "unknown", "spanish"],
    isRadioPresent: true,
  },
  {
    id: "8797744",
    name: "Mohammad Faiz",
    url: "https://www.jiosaavn.com/artist/mohammad-faiz-songs/3-uyLZJYAp8_",
    role: "Artist",
    image: [
      {
        quality: "50x50",
        link: "https://c.saavncdn.com/artists/Mohammad_Faiz_000_20231108095903_50x50.jpg",
      },
      {
        quality: "150x150",
        link: "https://c.saavncdn.com/artists/Mohammad_Faiz_000_20231108095903_150x150.jpg",
      },
      {
        quality: "500x500",
        link: "https://c.saavncdn.com/artists/Mohammad_Faiz_000_20231108095903_500x500.jpg",
      },
    ],
    isRadioPresent: true,
  },
  {
    id: "702452",
    name: "Vishal Mishra",
    url: "https://www.jiosaavn.com/artist/vishal-mishra-songs/f0sXoS0mUnE_",
    role: "Artist",
    image: [
      {
        quality: "50x50",
        link: "https://c.saavncdn.com/artists/Vishal_Mishra_004_20230804115745_50x50.jpg",
      },
      {
        quality: "150x150",
        link: "https://c.saavncdn.com/artists/Vishal_Mishra_004_20230804115745_150x150.jpg",
      },
      {
        quality: "500x500",
        link: "https://c.saavncdn.com/artists/Vishal_Mishra_004_20230804115745_500x500.jpg",
      },
    ],
    isRadioPresent: true,
  },
  {
    id: "459320",
    name: "Arijit Singh",
    url: "https://www.jiosaavn.com/artist/arijit-singh-songs/LlRWpHzy3Hk_",
    role: "Artist",
    image: [
      {
        quality: "50x50",
        link: "https://c.saavncdn.com/artists/Arijit_Singh_002_20230323062147_50x50.jpg",
      },
      {
        quality: "150x150",
        link: "https://c.saavncdn.com/artists/Arijit_Singh_002_20230323062147_150x150.jpg",
      },
      {
        quality: "500x500",
        link: "https://c.saavncdn.com/artists/Arijit_Singh_002_20230323062147_500x500.jpg",
      },
    ],
    isRadioPresent: true,
  },
  {
    id: "1274170",
    name: "Dua Lipa",
    url: "https://www.jiosaavn.com/artist/dua-lipa-songs/r-OWIKgpX2I_",
    role: "Artist",
    image: [
      {
        quality: "50x50",
        link: "https://c.saavncdn.com/artists/Dua_Lipa_004_20231120090922_50x50.jpg",
      },
      {
        quality: "150x150",
        link: "https://c.saavncdn.com/artists/Dua_Lipa_004_20231120090922_150x150.jpg",
      },
      {
        quality: "500x500",
        link: "https://c.saavncdn.com/artists/Dua_Lipa_004_20231120090922_500x500.jpg",
      },
    ],
    isRadioPresent: true,
  },
  {
    id: "680475",
    name: "Jaani",
    url: "https://www.jiosaavn.com/artist/jaani-songs/a0Vk-AlzJu8_",
    role: "Artist",
    image: [
      {
        quality: "50x50",
        link: "https://c.saavncdn.com/artists/Jaani_001_20191128083617_50x50.jpg",
      },
      {
        quality: "150x150",
        link: "https://c.saavncdn.com/artists/Jaani_001_20191128083617_150x150.jpg",
      },
      {
        quality: "500x500",
        link: "https://c.saavncdn.com/artists/Jaani_001_20191128083617_500x500.jpg",
      },
    ],
    isRadioPresent: true,
  },
  {
    id: "7436979",
    name: "Raghav Chaitanya",
    url: "https://www.jiosaavn.com/artist/raghav-chaitanya-songs/WZZxrSnCG6o_",
    role: "Artist",
    image: [
      {
        quality: "50x50",
        link: "https://c.saavncdn.com/artists/Raghav_Chaitanya_20200211095003_50x50.jpg",
      },
      {
        quality: "150x150",
        link: "https://c.saavncdn.com/artists/Raghav_Chaitanya_20200211095003_150x150.jpg",
      },
      {
        quality: "500x500",
        link: "https://c.saavncdn.com/artists/Raghav_Chaitanya_20200211095003_500x500.jpg",
      },
    ],
    isRadioPresent: true,
  },
  {
    id: "788130",
    name: "B Praak",
    url: "https://www.jiosaavn.com/artist/b-praak-songs/CfABr-vmQdw_",
    role: "Artist",
    image: [
      {
        quality: "50x50",
        link: "https://c.saavncdn.com/artists/B_Praak_001_20191118112005_50x50.jpg",
      },
      {
        quality: "150x150",
        link: "https://c.saavncdn.com/artists/B_Praak_001_20191118112005_150x150.jpg",
      },
      {
        quality: "500x500",
        link: "https://c.saavncdn.com/artists/B_Praak_001_20191118112005_500x500.jpg",
      },
    ],
    isRadioPresent: true,
  },
  {
    id: "568707",
    name: "Sia",
    url: "https://www.jiosaavn.com/artist/sia-songs/C4hxFiXrHws_",
    role: "Artist",
    image: [
      {
        quality: "50x50",
        link: "https://c.saavncdn.com/artists/Sia_002_20200921152829_50x50.jpg",
      },
      {
        quality: "150x150",
        link: "https://c.saavncdn.com/artists/Sia_002_20200921152829_150x150.jpg",
      },
      {
        quality: "500x500",
        link: "https://c.saavncdn.com/artists/Sia_002_20200921152829_500x500.jpg",
      },
    ],
    isRadioPresent: true,
  },
  {
    id: "468245",
    name: "Diljit Dosanjh",
    url: "https://www.jiosaavn.com/artist/diljit-dosanjh-songs/oIVHdWIO5F8_",
    role: "Artist",
    image: [
      {
        quality: "50x50",
        link: "https://c.saavncdn.com/artists/Diljit_Dosanjh_005_20231025073054_50x50.jpg",
      },
      {
        quality: "150x150",
        link: "https://c.saavncdn.com/artists/Diljit_Dosanjh_005_20231025073054_150x150.jpg",
      },
      {
        quality: "500x500",
        link: "https://c.saavncdn.com/artists/Diljit_Dosanjh_005_20231025073054_500x500.jpg",
      },
    ],
    isRadioPresent: true,
  },
];