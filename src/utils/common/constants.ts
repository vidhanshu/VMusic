import type NSMusic from "@/music";
import {
  BarChart2,
  Compass,
  Search,
  ThumbsUp,
  UserSquareIcon,
} from "lucide-react";

export const REVALIDATE = 43200;
export const BASE_API_URL = process.env.BASE_API_URL;

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
    id: "908626",
    name: "Otilia",
    url: "https://www.jiosaavn.com/artist/otilia/WLQP3KsWqLE_",
    image: [
      {
        quality: "50x50",
        link: "https://c.saavncdn.com/artists/Otilia_000_20191129083040_50x50.jpg",
      },
      {
        quality: "150x150",
        link: "https://c.saavncdn.com/artists/Otilia_000_20191129083040_150x150.jpg",
      },
      {
        quality: "500x500",
        link: "https://c.saavncdn.com/artists/Otilia_000_20191129083040_500x500.jpg",
      },
    ],
    followerCount: "33559",
    fanCount: "573525",
    isVerified: false,
    dominantLanguage: "spanish",
    dominantType: "singer",
    bio: [],
    dob: "",
    fb: "",
    twitter: "",
    wiki: "",
    availableLanguages: [
      "spanish",
      "english",
      "turkish",
      "romanian",
      "unknown",
      "azerbaijani",
      "odia",
    ],
    isRadioPresent: true,
  },
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
  {
    id: "485956",
    name: "Yo Yo Honey Singh",
    url: "https://www.jiosaavn.com/artist/yo-yo-honey-singh/06QxyAvVpB4_",
    image: [
      {
        quality: "50x50",
        link: "https://c.saavncdn.com/artists/Yo_Yo_Honey_Singh_002_20221216102650_50x50.jpg",
      },
      {
        quality: "150x150",
        link: "https://c.saavncdn.com/artists/Yo_Yo_Honey_Singh_002_20221216102650_150x150.jpg",
      },
      {
        quality: "500x500",
        link: "https://c.saavncdn.com/artists/Yo_Yo_Honey_Singh_002_20221216102650_500x500.jpg",
      },
    ],
    followerCount: "4319552",
    fanCount: "4759852",
    isVerified: true,
    dominantLanguage: "hindi",
    dominantType: "singer",
    bio: [
      {
        text: "Honey Singh, better known by his stage name Yo Yo Honey Singh, is an Indian rapper, music producer, singer and film actor. Honey Singh was born as Hirdesh Singh in New Delhi. In his early life, he studied music at Trinity College, England. He began his career as a recording artist and a Bhangra music producer. His first claim to fame came when he received the ETC award for Best Sound for his song, Glassi in 2006. He then went onto win the PTC Best Folk Pop Award for Rebirth in 2009 and the PTC Punjab Best Music Director Award in 2011.",
        title: "Introduction",
        sequence: 1,
      },
      {
        text: "â€¢ Singer (Songs And Albums)\r\n\tHoney Singh and Diljit Dosanjh's Lak 28 Kudi Da, a promotional track for the film Lion of Punjab made it to No.1 on BBC Asian Download Charts in May 2011. A song called Gabru from his hit album International Villager that featured singer J-Star topped the Asian music charts and the BBC Asian charts. In Bollywood, he rose to fame with his debut with the title track of the movie Shakal Pe Mat Ja that featured Gagan Sidhu. His other hit songs include Blue Eyes, Bebo and ABCD from Yaarian. He is now famous for his song compositions in films like Mere Dad Ki Maruti, Bajatey Raho, Boss and Chennai Express. In 2014, some of his memorable numbers are Chaar Botal Vodka from Ragini MMS2 and Horn OK Please from Dedh Ishqiya. His song Angreji Beat which he sung with Gippy Grewal for his Album International Villager (2011), later used in the Bollywood movie Cocktail was again a big chartbuster. His songs Lungi Dance in Chennai Express and Party all Night in the film Boss have become all time hits. Of course his latest hit number â€˜Party with the Bhoothnathâ€™ in the recently released Amitabh Bachchan movie Bhoothnath Returns is topping the charts witnessing online streaming in millions. It seems thereâ€™s no stopping this phenomenal youngster.\r\n\r\nâ€¢ FILMS (Acting Career)\r\n\tHis acting career began when he starred as a gangster called Deesha in the 2012 film called Mirza, and then appeared in a Punjabi comedy film called Tu Mera 22 Main Tera 22 where he starred as a character called Rolly. He is all set to make his appearance in the upcoming Bollywood films called The Xpose and Zorawar, expected for release in 2014.\r\n\r\nHis first love remains music. â€œI'm also going to act in a movie being produced by Himesh Reshammiya ji. I'm playing the role of a villain in that movie. Then there is a Punjabi movie lined up for release as well. However, I have no inclination to turn into a full time actor. Music is the only love I have and that's all I'm concentrated on right now,\" says the artist.",
        title: "Career",
        sequence: 2,
      },
      {
        text: 'â€¢ The ETC award for the Best sound in 2006 for Glassi\r\nâ€¢ The PTC award for the Best Folk Pop Award 2009 for Rebirth\r\nâ€¢ PTC Punjabi Best Music Director 2010 for song Desi Daroo\r\nâ€¢ PTC Punjabi Best Music Director 2011 for album The Folkstar\r\nâ€¢ PTC Punjabi Best Music Director 2012 for album I.V.(International Villager)\r\nâ€¢ BritAsia Best International Act 2012\r\nâ€¢ UK Asian Music Awards Best International Album 2012 for Album album I.V.(International Villager)\r\nâ€¢ PTC Punjabi Film Award â€“ Best Music Director 2012 for "Mirza â€“ The Untold Story"\r\nâ€¢ PTC Punjabi Film Award â€“ Best Debut (Male) "Mirza â€“ The Untold Story"\r\nâ€¢ MTV VMAI Awards â€“ Best Indie Artist (male) 2013 for Brown Rang\r\nâ€¢ Power Brands Glam 2013 â€“ Power Brand Award 2013\r\nâ€¢ MTV EMA Awards â€“ Best India Act 2013 for "Bring me Back"\r\nâ€¢ 2013 BIG Star Entertainment Awards â€“ Singh was co-winner of Most Entertaining Singer (Male), and "Lungi Dance" was nominated as Most Entertaining Song.\r\nâ€¢ 2014 Global Indian Music Awards â€“ Singh was nominated for Best Music Arranger,and "Lungi Dance" won for Most Popular Song on Radio.\r\nâ€¢ Zee Cine Awards 2014 for International Icon Male.',
        title: "Awards",
        sequence: 3,
      },
      {
        text: "1. HIGH HEELS - Jaz Dhami Ft. Yo Yo Honey Singh, (2012)\r\n2. Lungi Dance - Chennai Express (2013)\r\n3. Desi Kalakaar - Desi Kalakaar (2014)\r\n4. Party All NIght - Boss (2013)\r\n5. Birthday Bash - Dilliwali Zaalim Girlfriend (2015)\r\n6. Chaar Botal Vodka - Ragini MMS 2 (2014)\r\n7. LOVE DOSE - Desi Kalakaar (2014)\r\n8. One Bottle Down - One Bottle Down (2015)\r\n9. Manali Trance - The Shaukeens (2014)\r\n10. Yaar Naa Miley - Kick (2014)",
        title: "Top 10 Hit Songs",
        sequence: 4,
      },
    ],
    dob: "15-03-1983",
    fb: "https://www.facebook.com/YOYOhoneysingh",
    twitter: "https://twitter.com/asliyoyo",
    wiki: "https://en.wikipedia.org/wiki/Yo_Yo_Honey_Singh",
    availableLanguages: [
      "hindi",
      "punjabi",
      "english",
      "bhojpuri",
      "tamil",
      "unknown",
      "bengali",
      "gujarati",
      "assamese",
      "nagpuri",
    ],
    isRadioPresent: true,
  },
];
