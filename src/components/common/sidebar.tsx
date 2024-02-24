"use client";

import Link from "next/link";
import { motion as m } from "framer-motion";
import { usePathname } from "next/navigation";
import { Button, cn } from "@nextui-org/react";
import { ChevronRight, X, type LucideIcon, LogOut } from "lucide-react";

import Logo from "./Logo";
import Typography from "./Typography";

import useAudioPlayerContext from "@/contexts/audio-player-context/use-audio-player-context";

import { SIDEBAR_MENU } from "@/utils/common";
import { SIDEBAR_ANIMATION } from "@/utils/common";
import { setDocumentOverflow } from "@/utils/common";
import { signOut, useSession } from "next-auth/react";

const Sidebar = ({
  setSidebar,
}: {
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { status } = useSession();
  const { isRightSidebarOpen } = useAudioPlayerContext();

  return (
    <m.aside
      {...SIDEBAR_ANIMATION}
      className={cn(
        "bg-primary-700 py-4 lg:sticky lg:top-0 lg:z-[50] lg:col-span-2 lg:flex lg:h-[calc(100vh-65px)] lg:flex-grow lg:flex-col lg:justify-between lg:border-r-[2px] lg:border-primary-500",
        "fixed inset-0 z-[52]",
        isRightSidebarOpen && "h-screen lg:h-screen",
      )}
    >
      <div>
        <div className="flex flex-grow items-center gap-x-4 px-4 lg:hidden">
          <Logo className="lg:hidden" />
          <Button
            isIconOnly
            radius="full"
            variant="flat"
            color="secondary"
            startContent={<X size={16} />}
            onClick={() => {
              setSidebar(false);
              setDocumentOverflow(false);
            }}
          />
        </div>
        <div className="hidden items-center justify-between gap-x-4 px-4 py-0 lg:flex lg:justify-center lg:px-0 lg:py-6">
          <Button
            className="flex lg:hidden"
            isIconOnly
            radius="full"
            variant="flat"
            color="secondary"
            startContent={<X size={16} />}
            onClick={() => {
              setSidebar(false);
              setDocumentOverflow(false);
            }}
          />
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
        {status === "authenticated" ? (
          <Button
            onClick={() => signOut()}
            endContent={<LogOut size={16} />}
            fullWidth
            variant="bordered"
            className="border-primary-100 text-white"
          >
            Sign out
          </Button>
        ) : (
          <Button
            href="/sign-in"
            as={Link}
            endContent={<ChevronRight size={16} />}
            fullWidth
            variant="bordered"
            className="border-primary-100 text-white"
          >
            Login
          </Button>
        )}
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
