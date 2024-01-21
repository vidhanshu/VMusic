"use client";

import React, { PropsWithChildren, useState } from "react";
import { cn } from "@nextui-org/react";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import RightSideBar from "./right-sidebar";
import BottomPlayer from "./bottom-player";

import useMusicContext from "@/contexts/music-context/use-music-context";

const CommonLayout = ({ children }: PropsWithChildren) => {
  const [sidebar, setSidebar] = useState(true);
  const { isPlaying } = useMusicContext();

  return (
    <main className="flex flex-col">
      <div className="grid grid-cols-12">
        {sidebar && <Sidebar />}
        <div className={cn(sidebar ? "col-span-10" : "col-span-12")}>
          <Navbar sidebar={sidebar} setSidebar={setSidebar} />
          <div className={cn(isPlaying && "grid grid-cols-12")}>
            <div className={cn("p-8", isPlaying && "col-span-9 px-4 py-6")}>
              {children}
            </div>
            {isPlaying && (
              <div className={cn(isPlaying && "col-span-3")}>
                <RightSideBar />
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomPlayer />
    </main>
  );
};

export default CommonLayout;
