"use client";

import Link from "next/link";
import { Button, User } from "@nextui-org/react";
import { ChevronRight, Menu, Search, X } from "lucide-react";

interface ICustomNavbarProps {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
const CustomNavbar = ({ sidebar, setSidebar }: ICustomNavbarProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b-[2px] border-primary-500 bg-background px-4 py-4">
      <nav className="flex justify-between gap-x-6">
        <div className="flex flex-grow items-center gap-x-4">
          <Button
            size="sm"
            isIconOnly
            radius="full"
            startContent={!sidebar ? <Menu /> : <X />}
            onClick={() => setSidebar((prev) => !prev)}
          />
        </div>
        <div className="flex items-center gap-x-4">
          <Button
            as={Link}
            isIconOnly
            radius="full"
            variant="flat"
            href="/search"
            color="secondary"
            endContent={<Search size={16} />}
          />
          {!true ? (
            <Button
              className="border-primary-100"
              variant="bordered"
              endContent={<ChevronRight size={16} />}
            >
              Login
            </Button>
          ) : (
            <User
              name="John Doe"
              avatarProps={{
                src: "/pahadon-mein.jpg",
              }}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default CustomNavbar;
