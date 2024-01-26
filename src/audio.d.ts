/* eslint-disable */

import type NSMusic from "./music";

namespace NSAudio {
  interface IAudioPlayerContext {
    // Audio ref
    audioRef: React.RefObject<HTMLAudioElement> | null;
    // Play/Pause
    isPlaying: boolean;
    setIsPlaying: (val: boolean) => void;
    togglePlay: () => void;
    playThisSong: (music: NSMusic.IMusic | null) => void;

    // Audio player sidebar
    isRightSidebarOpen: boolean;
    setIsRightSidebarOpen: (val: boolean) => void;

    // Loop
    loop: boolean;
    toggleLoop: () => void;

    // Mute
    mute: boolean;
    setMute: (val: boolean) => void;
    toggleMute: () => void;

    // Song change
    prevSong: () => boolean;
    nextSong: () => boolean;
  }
  interface IAudioPlayerState {
    isPlaying: boolean;
    isRightSidebarOpen: boolean;
    loop: boolean;
    mute: boolean;
  }
}

export default NSAudio;
