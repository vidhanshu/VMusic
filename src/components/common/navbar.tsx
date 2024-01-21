"use client";

import { Button, User } from "@nextui-org/react";
import { ChevronRight, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface ICustomNavbarProps {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
const CustomNavbar = ({ sidebar, setSidebar }: ICustomNavbarProps) => {
  const router = useRouter();

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
          <input
            onClick={() => {
              router.push("/search");
            }}
            className="flex-grow self-stretch rounded-md bg-primary-700 px-4 focus:outline-none"
            placeholder="Search song, artist, album...."
          />
        </div>
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
      </nav>
    </header>
  );
};

export default CustomNavbar;
