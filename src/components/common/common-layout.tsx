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

const CommonLayout = ({
  children,
  data,
}: PropsWithChildren & {
  data: NSMusic.IMusicProviderState["data"];
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { setData, setIsRightSidebarOpen } =
    useMusicContext();

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

  return (
    <main className="flex flex-col">
      <div className="md:grid md:grid-cols-12">
        {sidebar && <Sidebar setSidebar={setSidebar} />}
        <div className={cn(sidebar ? "md:col-span-10" : "md:col-span-12")}>
          <Navbar sidebar={sidebar} setSidebar={setSidebar} />
          <div className="p-4 md:p-6 lg:p-8">
            <div className={cn(!online && "hidden")}>{children}</div>
            {!online && <NoInternet />}
          </div>
        </div>
      </div>
      <BottomPlayer />
      {/* mobile specific floating button to open currently playing song drawer */}
      <Button
        startContent={<Music2 size={16} />}
        onClick={() => setIsRightSidebarOpen((val) => !val)}
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
