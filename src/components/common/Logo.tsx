import { cn } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

interface ILogoProps {
  withName?: boolean;
  className?: string;
}
const Logo = ({ withName = false, className }: ILogoProps) => {
  return (
    <div className={cn("flex items-end gap-x-1", className)}>
      <Image src="/logo.svg" alt="logo-name" width={40} height={40} />
      {withName && <h1 className={"text-2xl font-bold text-white"}>VMusic</h1>}
    </div>
  );
};

export default Logo;
