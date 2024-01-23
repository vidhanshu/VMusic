"use client";

import React from "react";
import {
  Heart,
  Pause,
  Play,
  Repeat,
  Repeat1,
  SkipBack,
  SkipForward,
  ThumbsUp,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button, Slider, Tooltip } from "@nextui-org/react";

import useMusicContext from "@/contexts/music-context/use-music-context";

import { formattedTime, percentageToSeconds } from "@/utils/helpers";

export interface IAudioPlayerProps {
  isSideBarPlayer?: boolean;
  setSongProgress: React.Dispatch<React.SetStateAction<number>>;
  songProgress: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  volume: number;
}
const AudioPlayer = ({
  isSideBarPlayer,
  setSongProgress,
  setVolume,
  songProgress,
  volume,
}: IAudioPlayerProps) => {
  const { mute, toggleMute, currentMusic, audioRef } = useMusicContext();

  const onUpdateMusicProgress = (val: number | number[]) => {
    const val1 = val as number;

    setSongProgress(val1);
    if (!audioRef?.current || !currentMusic?.duration) return;
    audioRef.current.currentTime = (val1 * Number(currentMusic.duration)) / 100;
  };

  const onUpdateVolume = (val: number | number[]) => {
    const val1 = val as number;

    if (audioRef?.current) {
      audioRef.current.volume = val1 / 100;
      setVolume(val1);
    }
  };

  return (
    <>
      {isSideBarPlayer ? (
        <div className="flex flex-col items-center gap-4">
          <EssentialControls />
          <Slider
            aria-label="progress"
            isDisabled={!currentMusic}
            disableAnimation={!currentMusic}
            onChange={onUpdateMusicProgress}
            renderThumb={(props) => (
              <span
                {...props}
                className="absolute top-[1px] h-4 w-4 cursor-pointer rounded-full bg-primary-50 hover:bg-primary-100 active:bg-primary-200"
              />
            )}
            startContent={
              <StartTime
                duration={Number(currentMusic?.duration)}
                completedPercentage={songProgress}
              />
            }
            endContent={<EndTime duration={Number(currentMusic?.duration)} />}
            classNames={{
              track: "cursor-pointer",
            }}
            size="sm"
            value={songProgress}
            color="secondary"
          />
          <div className="self-start">
            <SoundControls
              mute={mute}
              toggleMute={toggleMute}
              volume={volume}
              handleUpdateVolume={onUpdateVolume}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-grow items-center gap-x-8">
          <Slider
            aria-label="progress"
            isDisabled={!currentMusic}
            disableAnimation={!currentMusic}
            onChange={onUpdateMusicProgress}
            renderThumb={(props) => (
              <span
                {...props}
                className="absolute top-[1px] h-4 w-4 cursor-pointer rounded-full bg-primary-50 hover:bg-primary-100 active:bg-primary-200"
              />
            )}
            classNames={{
              track: "cursor-pointer",
            }}
            startContent={
              <div className="flex items-center gap-x-4">
                <EssentialControls />
                <StartTime
                  duration={Number(currentMusic?.duration)}
                  completedPercentage={songProgress}
                />
              </div>
            }
            endContent={<EndTime duration={Number(currentMusic?.duration)} />}
            size="sm"
            value={songProgress}
            color="secondary"
          />
          <div className="flex items-center gap-x-2">
            <Button
              variant="light"
              radius="full"
              isIconOnly
              size="sm"
              startContent={<Heart className="text-white" size={20} />}
            />
            <SoundControls
              mute={mute}
              toggleMute={toggleMute}
              volume={volume}
              handleUpdateVolume={onUpdateVolume}
            />
          </div>
        </div>
      )}
    </>
  );
};

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;

export const StartTime = ({
  completedPercentage,
  duration,
}: {
  completedPercentage: number;
  duration: number;
}) => {
  return (
    <p className="text-xs text-white">
      {formattedTime(
        percentageToSeconds(completedPercentage, Number(duration)),
      )}
    </p>
  );
};

export const EndTime = ({ duration }: { duration: number }) => {
  return (
    <p className="text-xs text-white">{formattedTime(Number(duration))}</p>
  );
};

export const SoundControls = ({
  mute,
  toggleMute,
  handleUpdateVolume,
  volume,
}: {
  handleUpdateVolume: (val: number | number[]) => void;
  mute: boolean;
  toggleMute: () => void;
  volume: number;
}) => {
  return (
    <div className="flex min-w-[150px] items-center gap-x-2">
      <Button
        onClick={toggleMute}
        variant="light"
        radius="full"
        isIconOnly
        size="sm"
        startContent={
          mute || !volume ? (
            <VolumeX className="text-white" size={20} />
          ) : volume <= 50 ? (
            <Volume1 className="text-white" size={20} />
          ) : (
            <Volume2 className="text-white" size={20} />
          )
        }
      />
      <Slider
        aria-label="volume"
        onChange={handleUpdateVolume}
        renderThumb={(props) => (
          <span
            {...props}
            className="absolute top-[1px] h-4 w-4 cursor-pointer rounded-full bg-success hover:bg-success-300 focus-visible:outline-1 active:bg-success-200"
          />
        )}
        color="success"
        size="sm"
        value={volume}
      />
    </div>
  );
};

export const EssentialControls = () => {
  const {
    loop,
    toggleLoop,
    currentMusic,
    togglePlay,
    isPlaying,
    nextSong,
    prevSong,
  } = useMusicContext();

  return (
    <div className="flex items-center gap-x-2">
      <Tooltip content="Like/Dislike">
        <Button
          disabled={!currentMusic}
          disableAnimation={!currentMusic}
          variant="light"
          radius="full"
          color="secondary"
          isIconOnly
          startContent={<ThumbsUp size={20} className="text-white" />}
        />
      </Tooltip>
      <Tooltip content="Previous">
        <Button
          disabled={!currentMusic}
          disableAnimation={!currentMusic}
          onClick={prevSong}
          variant="light"
          radius="full"
          color="secondary"
          isIconOnly
          startContent={<SkipBack size={20} className="text-white" />}
        />
      </Tooltip>
      <Tooltip content="Play/Pause">
        <Button
          disabled={!currentMusic}
          disableAnimation={!currentMusic}
          variant="light"
          radius="full"
          color="secondary"
          isIconOnly
          onClick={togglePlay}
          startContent={
            isPlaying ? (
              <Pause size={20} className="text-white" />
            ) : (
              <Play size={20} className="text-white" />
            )
          }
        />
      </Tooltip>
      <Tooltip content="Next">
        <Button
          disabled={!currentMusic}
          disableAnimation={!currentMusic}
          variant="light"
          radius="full"
          color="secondary"
          onClick={nextSong}
          isIconOnly
          startContent={<SkipForward size={20} className="text-white" />}
        />
      </Tooltip>
      <Tooltip content={loop ? "Looping" : "Loop"}>
        <Button
          disabled={!currentMusic}
          disableAnimation={!currentMusic}
          onClick={toggleLoop}
          variant="light"
          radius="full"
          color="secondary"
          isIconOnly
          startContent={
            loop ? (
              <Repeat1 className="text-white" size={20} />
            ) : (
              <Repeat className="text-white" size={20} />
            )
          }
        />
      </Tooltip>
    </div>
  );
};

export const HiddenAudioElement = ({
  setSongProgress,
}: {
  setSongProgress: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { audioRef, currentMusic, mute, loop, nextSong, setIsPlaying } =
    useMusicContext();

  return (
    <audio
      muted={mute}
      loop={loop}
      autoPlay
      hidden
      onEnded={() => {
        if (!loop) {
          if (!nextSong()) {
            setSongProgress(0);
            setIsPlaying(false);
          }
        }
      }}
      ref={audioRef}
      onTimeUpdate={(a) => {
        const timestamp = a.currentTarget;
        const duration = Number(currentMusic?.duration) || 0;
        const percentage = (timestamp.currentTime / duration) * 100;
        setSongProgress(percentage);
      }}
    />
  );
};
