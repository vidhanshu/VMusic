"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, cn } from "@nextui-org/react";
import { motion as m } from "framer-motion";
import { ChevronRight, type LucideIcon } from "lucide-react";

import Logo from "./Logo";

import { SIDEBAR_MENU } from "@/utils/constants";
import Typography from "./Typography";
import useMusicContext from "@/contexts/music-context/use-music-context";
import { SIDEBAR_ANIMATION } from "@/utils/common/constants";

const Sidebar = () => {
  const { isRightSidebarOpen } = useMusicContext();

  return (
    <m.aside
      {...SIDEBAR_ANIMATION}
      className={cn(
        "sticky top-0 z-[50] col-span-2 flex h-[calc(100vh-65px)] flex-grow flex-col justify-between border-r-[2px] border-primary-500 bg-primary-700 py-4",
        isRightSidebarOpen && "h-screen",
      )}
    >
      <div>
        <div className="flex items-center justify-center py-6">
          <Logo withName />
        </div>
        <div className="space-y-8 pl-4  pt-8">
          {SIDEBAR_MENU.map((item, idx) => (
            <div key={idx}>
              <Typography
                className="mb-4"
                color="secondary"
                variant="T_SemiBold_H8"
              >
                {item.title}
              </Typography>
              <ul className="space-y-2">
                {item.menuItems.map((menuItem, idx) => (
                  <li key={idx}>
                    <MenuItem {...menuItem} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-4">
        <Button
          endContent={<ChevronRight size={16} />}
          fullWidth
          variant="bordered"
          className="border-primary-100"
        >
          Login
        </Button>
      </div>
    </m.aside>
  );
};

export default Sidebar;

interface IMenuItemProps {
  icon: LucideIcon;
  title: string;
  link: string;
}

export const MenuItem = function ({ icon: Icon, title, link }: IMenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Button
      as={Link}
      href={link}
      disableRipple
      fullWidth
      startContent={<Icon size={16} />}
      className={cn(
        "relative justify-start rounded-none rounded-l-md bg-transparent font-semibold text-primary-50 hover:bg-primary-300 hover:text-white focus-visible:outline-none",
        isActive &&
          "bg-gradient-to-r from-primary-300 to-primary-700 text-white",
      )}
    >
      {title}
      {isActive && (
        <div className="absolute right-0 h-full w-1 rounded-l-md bg-white" />
      )}
    </Button>
  );
};
