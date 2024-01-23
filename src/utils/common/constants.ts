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
