"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tooltip
      content={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
    >
      <Button
        isIconOnly
        radius="full"
        variant="flat"
        color="secondary"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        startContent={
          theme === "light" ? <Moon size={16} /> : <Sun size={16} />
        }
      />
    </Tooltip>
  );
}
