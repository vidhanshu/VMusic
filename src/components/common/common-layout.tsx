"use client";

import dynamic from "next/dynamic";
import { cn } from "@nextui-org/react";
import React, { type PropsWithChildren, useState, useEffect } from "react";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import NoInternet from "./no-internet";
const BottomPlayer = dynamic(() => import("./bottom-player"), { ssr: false });

import useOnline from "@/hooks/use-online";
import useMusicKeyboardControls from "@/hooks/use-music-keyboard-controls";
import useMusicContext from "@/contexts/music-context/use-music-context";

import type NSMusic from "@/music";

const CommonLayout = ({
  children,
  data,
}: PropsWithChildren & {
  data: NSMusic.IMusicProviderState["data"];
}) => {
  // apply key shortcuts
  useMusicKeyboardControls();
  const { setData } = useMusicContext();

  const [sidebar, setSidebar] = useState(true);
  const online = useOnline();

  useEffect(() => {
    if (data) {
      setData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <main className="flex flex-col">
      <div className="grid grid-cols-12">
        {sidebar && <Sidebar />}
        <div className={cn(sidebar ? "col-span-10" : "col-span-12")}>
          <Navbar sidebar={sidebar} setSidebar={setSidebar} />
          <div className="p-8">
            <div className={cn(!online && "hidden")}>{children}</div>
            {!online && <NoInternet />}
          </div>
        </div>
      </div>
      <BottomPlayer />
    </main>
  );
};

export default CommonLayout;
