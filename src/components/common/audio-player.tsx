"use client";

import React, { useEffect } from "react";
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
  VolumeX,
  X,
} from "lucide-react";
import { Button, Slider, Tooltip } from "@nextui-org/react";

import { formattedTime, percentageToSeconds } from "@/utils/helpers";
import useMusicContext from "@/contexts/music-context/use-music-context";

interface IAudioPlayerProps {
  isSideBarPlayer?: boolean;
}
const AudioPlayer = ({ isSideBarPlayer }: IAudioPlayerProps) => {
  const {
    mute,
    toggleMute,
    currentMusic,
    completedPercentage,
    setCompletedPercentage,
    audioRef,
    volume,
    setVolume,
  } = useMusicContext();

  const onUpdateMusicProgress = (val: any) => {
    setCompletedPercentage(val);
    if (!audioRef?.current || !currentMusic?.duration) return;
    audioRef.current.currentTime = (val * Number(currentMusic.duration)) / 100;
  };

  const onUpdateVolume = (val: any) => {
    if (audioRef?.current) {
      audioRef.current.volume = val / 100;
      setVolume(val);
    }
  };

  if (isSideBarPlayer) {
    return (
      <div className="flex flex-col items-center gap-4">
        <AudioPlayer.EssentialControls />
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
            <AudioPlayer.StartTime
              duration={Number(currentMusic?.duration)}
              completedPercentage={completedPercentage}
            />
          }
          endContent={
            <AudioPlayer.EndTime duration={Number(currentMusic?.duration)} />
          }
          classNames={{
            track: "cursor-pointer",
          }}
          size="sm"
          value={completedPercentage}
          color="secondary"
        />
        <div className="self-start">
          <AudioPlayer.SoundControls
            mute={mute}
            toggleMute={toggleMute}
            volume={volume}
            handleUpdateVolume={onUpdateVolume}
          />
        </div>
      </div>
    );
  }

  return (
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
            <AudioPlayer.EssentialControls />
            <AudioPlayer.StartTime
              duration={Number(currentMusic?.duration)}
              completedPercentage={completedPercentage}
            />
          </div>
        }
        endContent={
          <AudioPlayer.EndTime duration={Number(currentMusic?.duration)} />
        }
        size="sm"
        value={completedPercentage}
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
        <AudioPlayer.SoundControls
          mute={mute}
          toggleMute={toggleMute}
          volume={volume}
          handleUpdateVolume={onUpdateVolume}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;

AudioPlayer.StartTime = ({
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

AudioPlayer.EndTime = ({ duration }: { duration: number }) => {
  return (
    <p className="text-xs text-white">{formattedTime(Number(duration))}</p>
  );
};

AudioPlayer.SoundControls = ({
  mute,
  toggleMute,
  handleUpdateVolume,
  volume,
}: {
  handleUpdateVolume: (val: any) => void;
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
          mute ? (
            <VolumeX className="text-white" size={20} />
          ) : (
            <Volume1 className="text-white" size={20} />
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

AudioPlayer.EssentialControls = () => {
  const { loop, toggleLoop, currentMusic, togglePlay, isPlaying } =
    useMusicContext();

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
