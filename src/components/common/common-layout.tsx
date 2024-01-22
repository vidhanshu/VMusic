"use client";

import React, { type PropsWithChildren, useState } from "react";
import { cn } from "@nextui-org/react";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import BottomPlayer from "./bottom-player";
import useMusicKeyboardControls from "@/hooks/use-music-keyboard-controls";

const CommonLayout = ({ children }: PropsWithChildren) => {
  // apply key shortcuts
  useMusicKeyboardControls();

  const [sidebar, setSidebar] = useState(true);

  return (
    <main className="flex flex-col">
      <div className="grid grid-cols-12">
        {sidebar && <Sidebar />}
        <div className={cn(sidebar ? "col-span-10" : "col-span-12")}>
          <Navbar sidebar={sidebar} setSidebar={setSidebar} />
          <div className="p-8">{children}</div>
        </div>
      </div>
      <BottomPlayer />
    </main>
  );
};

export default CommonLayout;
