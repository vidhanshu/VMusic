import Image from "next/image";
import React from "react";

interface ILogoProps {
  withName?: boolean;
}
const Logo = ({ withName = false }: ILogoProps) => {
  return (
    <div className="flex items-end gap-x-1">
      <Image src="/logo.svg" alt="logo-name" width={40} height={40} />
      {withName && <h1 className={"text-2xl text-white font-bold"}>VMusic</h1>}
    </div>
  );
};

export default Logo;
