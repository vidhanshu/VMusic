"use client";

import dynamic from "next/dynamic";
import { Music2 } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { Button, cn } from "@nextui-org/react";
import React, { type PropsWithChildren, useState, useEffect } from "react";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import NoInternet from "./no-internet";
const BottomPlayer = dynamic(() => import("./bottom-player"), { ssr: false });

import useOnline from "@/hooks/use-online";
import useMusicContext from "@/contexts/music-context/use-music-context";

import type NSMusic from "@/music";
import CustomBreadcrumbs from "./custom-breadcrumbs";
import useAudioPlayerContext from "@/contexts/audio-player-context/use-audio-player-context";
import { useSearchParams } from "next/navigation";
import { getSongById } from "@/actions";
import { toast } from "sonner";

const CommonLayout = ({
  children,
  data,
}: PropsWithChildren & {
  data: NSMusic.IMusicProviderState["data"];
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const searchParams = useSearchParams();
  const songId = searchParams.get("song");

  const { setData } = useMusicContext();
  const {
    setIsRightSidebarOpen,
    isRightSidebarOpen,
    playThisSong,
    setIsPlaying,
    audioRef,
  } = useAudioPlayerContext();

  const [sidebar, setSidebar] = useState(true);
  const online = useOnline();

  useEffect(() => {
    if (data) {
      setData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (isMobile) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!songId) return;

    getSongById(songId)
      .then((songs) => {
        const song = songs?.[0];
        if (!song) return toast.error("Song not found");
        playThisSong(song);
        setIsPlaying(false);
        setIsRightSidebarOpen(true);
      })
      .catch((err: { message: string }) => {
        toast.error(err.message);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songId, audioRef]);

  return (
    <main className="flex flex-col">
      <div className="md:grid md:grid-cols-12">
        {sidebar && <Sidebar setSidebar={setSidebar} />}
        <div className={cn(sidebar ? "md:col-span-10" : "md:col-span-12")}>
          <Navbar sidebar={sidebar} setSidebar={setSidebar} />
          <div className="p-4 md:p-6 lg:p-8">
            <CustomBreadcrumbs />
            <div className={cn(!online && "hidden")}>{children}</div>
            {!online && <NoInternet />}
          </div>
        </div>
      </div>
      <BottomPlayer />
      {/* mobile specific floating button to open currently playing song drawer */}
      <Button
        startContent={<Music2 size={16} />}
        onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
        variant="solid"
        color="success"
        isIconOnly
        radius="full"
        className="fixed bottom-4 right-4 text-white md:hidden"
      />
    </main>
  );
};

export default CommonLayout;
