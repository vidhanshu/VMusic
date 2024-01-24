import type NSMusic from "@/music";

export const REVALIDATE = 43200;

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
