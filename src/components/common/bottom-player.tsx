import React from "react";
import { Button, Slider, User, cn } from "@nextui-org/react";
import { Heart, Play, SkipBack, SkipForward, Volume1 } from "lucide-react";
import SongMetaCard from "./song-meta-card";

const BottomPlayer = () => {
  return (
    <div className="relative h-[65px]">
      {/**
       * Cannot give h-full because it's not fix relative to the above div
       * rather it's relative to the whole page
       */}
      <div className="fixed bottom-0 flex h-[65px] w-full items-center justify-between gap-x-8 bg-[#1D1B2D] px-4">
        <SongMetaCard className="text-white" artist="Vishal Mishra" />
        <div className="flex flex-grow items-center gap-x-2">
          <Slider
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
                <div className="flex items-center gap-x-2">
                  <Button
                    className="rounded-full"
                    variant="light"
                    color="primary"
                    isIconOnly
                    startContent={<SkipBack size={20} className="text-white" />}
                  />
                  <Button
                    className="rounded-full"
                    variant="light"
                    color="primary"
                    isIconOnly
                    startContent={<Play size={20} className="text-white" />}
                  />
                  <Button
                    className="rounded-full"
                    variant="light"
                    color="primary"
                    isIconOnly
                    startContent={
                      <SkipForward size={20} className="text-white" />
                    }
                  />
                </div>
                <p className="text-white">00:30</p>
              </div>
            }
            size="sm"
            defaultValue={50}
            color="secondary"
          />
          <p className="text-white">00:30</p>
          <Button
            variant="light"
            radius="full"
            isIconOnly
            size="sm"
            startContent={<Heart className="text-white" size={20} />}
          />

          <div className="flex min-w-[150px] items-center gap-x-2">
            <Button
              variant="light"
              radius="full"
              isIconOnly
              size="sm"
              startContent={<Volume1 className="text-white" size={20} />}
            />
            <Slider
              renderThumb={(props) => (
                <span
                  {...props}
                  className="absolute top-[1px] h-4 w-4 cursor-pointer rounded-full bg-success hover:bg-success-300 active:bg-success-200"
                />
              )}
              color="success"
              size="sm"
              defaultValue={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;
