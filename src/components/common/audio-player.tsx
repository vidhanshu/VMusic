"use client";

import React from "react";
import {
  Heart,
  Mic2,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Share2,
  SkipBack,
  SkipForward,
  ThumbsUp,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Spinner,
  cn,
} from "@nextui-org/react";
import { Button, Slider, Tooltip } from "@nextui-org/react";

import Typography from "./Typography";

import useMusicContext from "@/contexts/music-context/use-music-context";

import { getLyricsById } from "@/actions";

import { formattedTime, percentageToSeconds } from "@/utils/common";
import { useCopyToClipboard, useMediaQuery } from "usehooks-ts";
import useAudioPlayerContext from "@/contexts/audio-player-context/use-audio-player-context";
import { toast } from "sonner";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copyFn] = useCopyToClipboard();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [lyrics, setLyrics] = React.useState<{
    data: {
      lyrics: string;
      snippet: string;
      copyright: string;
    } | null;
    loading: boolean;
    noLyrics: boolean;
  }>({
    data: null,
    loading: false,
    noLyrics: false,
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { currentMusic } = useMusicContext();
  const { mute, toggleMute, audioRef } = useAudioPlayerContext();

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

  const handleGetLyrics = async () => {
    if (!currentMusic?.id) return;

    setLyrics((prev) => ({ ...prev, loading: true, noLyrics: false }));
    const l = await getLyricsById(currentMusic.id);
    if (l?.lyrics) {
      setLyrics({
        data: {
          lyrics: l.lyrics,
          snippet: l.snippet,
          copyright: l.copyright,
        },
        loading: false,
        noLyrics: false,
      });
    } else {
      setLyrics({ data: null, loading: false, noLyrics: true });
    }
  };

  return (
    <>
      <Modal
        size="2xl"
        isDismissable={false}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
        placement="center"
      >
        <ModalContent>
          <div className="py-8">
            <ModalBody>
              {lyrics.loading ? (
                <Spinner color="success" />
              ) : lyrics.noLyrics ? (
                <Typography className="text-center" variant="T_SemiBold_H2">
                  No Lyrics
                </Typography>
              ) : (
                <div className="space-y-4">
                  <Typography variant="T_Bold_H3">
                    {lyrics.data?.snippet}
                  </Typography>
                  <Typography variant="T_Regular_H6">
                    {lyrics.data?.lyrics}
                  </Typography>
                  <Typography color="secondary" variant="T_Regular_H8">
                    {lyrics.data?.copyright}
                  </Typography>
                </div>
              )}
            </ModalBody>
          </div>
        </ModalContent>
      </Modal>
      {isSideBarPlayer ? (
        <div className="flex flex-col items-center gap-4">
          <EssentialControls isLightModeEnabled />
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
                isLightModeEnabled
                duration={Number(currentMusic?.duration)}
                completedPercentage={songProgress}
              />
            }
            endContent={
              <EndTime
                isLightModeEnabled
                duration={Number(currentMusic?.duration)}
              />
            }
            classNames={{
              track: "cursor-pointer",
            }}
            size="sm"
            value={isNaN(songProgress) ? 0 : songProgress}
            color="secondary"
          />
          <div className="self-start">
            <SoundControls
              mute={mute}
              toggleMute={toggleMute}
              volume={volume}
              isLightModeEnabled
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
            value={isNaN(songProgress) ? 0 : songProgress}
            color="secondary"
          />
          <div className="flex items-center gap-x-2">
            {currentMusic?.id ? (
              <Tooltip content="Share">
                <Button
                  onClick={async () => {
                    await copyFn(
                      `${window.location.origin}?song=${currentMusic?.id}`,
                    );
                    toast.success("Link copied!");
                  }}
                  variant="light"
                  radius="full"
                  isIconOnly
                  size={isMobile ? "sm" : "md"}
                  startContent={
                    <Share2 className="h-4 w-4 text-white md:h-5 md:w-5" />
                  }
                />
              </Tooltip>
            ) : null}
            <Tooltip content="Lyrics">
              <Button
                onClick={async () => {
                  if (isOpen) {
                    onClose();
                  } else {
                    onOpen();
                    await handleGetLyrics();
                  }
                }}
                variant="light"
                radius="full"
                isIconOnly
                size={isMobile ? "sm" : "md"}
                startContent={
                  <Mic2 className="h-4 w-4 text-white md:h-5 md:w-5" />
                }
              />
            </Tooltip>
            <Tooltip content="Like">
              <Button
                variant="light"
                radius="full"
                isIconOnly
                size={isMobile ? "sm" : "md"}
                startContent={
                  <Heart className="h-4 w-4 text-white md:h-5 md:w-5" />
                }
              />
            </Tooltip>
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
  isLightModeEnabled = false,
}: {
  completedPercentage: number;
  duration: number;
  isLightModeEnabled?: boolean;
}) => {
  return (
    <p
      className={cn(
        isLightModeEnabled
          ? "text-black dark:text-white"
          : "text-xs text-white",
      )}
    >
      {formattedTime(
        percentageToSeconds(completedPercentage, Number(duration)),
      )}
    </p>
  );
};

export const EndTime = ({
  duration,
  isLightModeEnabled = false,
}: {
  duration: number;
  isLightModeEnabled?: boolean;
}) => {
  return (
    <p
      className={cn(
        isLightModeEnabled
          ? "text-black dark:text-white"
          : "text-xs text-white",
      )}
    >
      {formattedTime(Number(duration))}
    </p>
  );
};

export const SoundControls = ({
  mute,
  toggleMute,
  handleUpdateVolume,
  volume,
  isLightModeEnabled,
}: {
  handleUpdateVolume: (val: number | number[]) => void;
  mute: boolean;
  toggleMute: () => void;
  volume: number;
  isLightModeEnabled?: boolean;
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex min-w-[150px] items-center gap-x-2">
      <Button
        onClick={toggleMute}
        variant="light"
        radius="full"
        isIconOnly
        size={isMobile ? "sm" : "md"}
        startContent={
          mute || !volume ? (
            <VolumeX
              className={cn(
                "h-4 w-4 md:h-5 md:w-5",
                isLightModeEnabled
                  ? "text-black dark:text-white"
                  : "text-white",
              )}
            />
          ) : volume <= 50 ? (
            <Volume1
              className={cn(
                "h-4 w-4 md:h-5 md:w-5",
                isLightModeEnabled
                  ? "text-black dark:text-white"
                  : "text-white",
              )}
            />
          ) : (
            <Volume2
              className={cn(
                "h-4 w-4 md:h-5 md:w-5",
                isLightModeEnabled
                  ? "text-black dark:text-white"
                  : "text-white",
              )}
            />
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
        value={isNaN(volume) ? 0 : volume}
      />
    </div>
  );
};

export const EssentialControls = ({
  isLightModeEnabled = false,
}: {
  isLightModeEnabled?: boolean;
}) => {
  const { currentMusic } = useMusicContext();
  const { loop, toggleLoop, togglePlay, isPlaying, nextSong, prevSong } =
    useAudioPlayerContext();

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
          startContent={
            <ThumbsUp
              size={20}
              className={cn(
                isLightModeEnabled
                  ? "text-black dark:text-white"
                  : "text-white",
              )}
            />
          }
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
          startContent={
            <SkipBack
              size={20}
              className={cn(
                isLightModeEnabled
                  ? "text-black dark:text-white"
                  : "text-white",
              )}
            />
          }
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
              <Pause
                size={20}
                className={cn(
                  isLightModeEnabled
                    ? "text-black dark:text-white"
                    : "text-white",
                )}
              />
            ) : (
              <Play
                size={20}
                className={cn(
                  isLightModeEnabled
                    ? "text-black dark:text-white"
                    : "text-white",
                )}
              />
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
          startContent={
            <SkipForward
              size={20}
              className={cn(
                isLightModeEnabled
                  ? "text-black dark:text-white"
                  : "text-white",
              )}
            />
          }
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
              <Repeat1
                className={cn(
                  isLightModeEnabled
                    ? "text-black dark:text-white"
                    : "text-white",
                )}
                size={20}
              />
            ) : (
              <Repeat
                className={cn(
                  isLightModeEnabled
                    ? "text-black dark:text-white"
                    : "text-white",
                )}
                size={20}
              />
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
  const { currentMusic } = useMusicContext();
  const { loop, mute, audioRef, nextSong, setIsPlaying } =
    useAudioPlayerContext();

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
