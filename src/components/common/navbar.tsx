"use client";

import Link from "next/link";
import { Button, User } from "@nextui-org/react";
import { ChevronRight, Menu, Search, X } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { useMediaQuery } from "usehooks-ts";
import { setDocumentOverflow } from "@/utils/common";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

interface ICustomNavbarProps {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
const CustomNavbar = ({ sidebar, setSidebar }: ICustomNavbarProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  // // to close the side bar on route change, in mobile
  useEffect(() => {
    if (isMobile && sidebar) {
      setSidebar(false);
      setDocumentOverflow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b-[2px] border-primary-500 bg-background px-4 py-4">
      <nav className="flex justify-between gap-x-6">
        <div className="flex flex-grow items-center gap-x-4">
          <Logo className="lg:hidden" />
          <Button
            isIconOnly
            radius="full"
            variant="flat"
            color="secondary"
            startContent={!sidebar ? <Menu size={16} /> : <X size={16} />}
            onClick={() => {
              setSidebar((prev) => !prev);
              if (isMobile) {
                setDocumentOverflow(!sidebar);
              }
            }}
          />
        </div>
        <div className="flex items-center gap-x-4">
          <ThemeSwitcher />
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
              className="hidden md:flex"
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
