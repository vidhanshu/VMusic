"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

import Typography from "./Typography";

const NoInternet = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/no-internet.svg"
          alt="no-internet"
          width={180}
          height={180}
        />
        <div className="text-center space-y-1">
          <Typography variant="T_Bold_H4">Connect to the internet</Typography>
          <Typography variant="T_Regular_H7">
            You&apos;re offline. Check your connection.
          </Typography>
        </div>
        <Button onClick={() => router.refresh()} variant="bordered">
          Retry
        </Button>
      </div>
    </div>
  );
};

export default NoInternet;
