"use client";

import React, { PropsWithChildren, useState } from "react";
import { cn } from "@nextui-org/react";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import RightSideBar from "./right-sidebar";
import BottomPlayer from "./bottom-player";

import useMusicContext from "@/contexts/music-context/use-music-context";
import useMusicKeyboardControls from "@/hooks/use-music-keyboard-controls";

const CommonLayout = ({ children }: PropsWithChildren) => {
  // apply key shortcuts
  useMusicKeyboardControls();
  
  const [sidebar, setSidebar] = useState(true);
  const { isRightSidebarOpen } = useMusicContext();

  return (
    <main className="flex flex-col">
      <div className="grid grid-cols-12">
        {sidebar && <Sidebar />}
        <div className={cn(sidebar ? "col-span-10" : "col-span-12")}>
          <Navbar sidebar={sidebar} setSidebar={setSidebar} />
          <div className={cn(isRightSidebarOpen && "grid grid-cols-12")}>
            <div className={cn("p-8", isRightSidebarOpen && "col-span-9 px-4")}>
              {children}
            </div>
            {isRightSidebarOpen && (
              <div className={cn(isRightSidebarOpen && "col-span-3")}>
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
