import React from "react";
import Image from "next/image";
import { cn } from "@nextui-org/react";
import Link from "next/link";

interface ILogoProps {
  withName?: boolean;
  className?: string;
}
const Logo = ({ withName = false, className }: ILogoProps) => {
  return (
    <Link href="/" className={cn("flex items-end gap-x-1", className)}>
      <Image src="/logo.svg" alt="logo-name" width={40} height={40} />
      {withName && <h1 className={"text-2xl font-bold text-white"}>VMusic</h1>}
    </Link>
  );
};

export default Logo;
