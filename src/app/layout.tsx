import { Toaster } from "sonner";

import MusicContextProvider from "@/contexts/music-context/music-context-provider";
import { Providers } from "@/components/common/nextui-provider";
import { NunitoSans } from "@/fonts";
import "@/styles/globals.css";

import AudioPlayerContextProvider from "@/contexts/audio-player-context/audio-player-context-provider";

export const metadata = {
  metadataBase: "http://localhost:3000",
  title: {
    template: "%s | VMusic",
    default: "VMusic",
  },
  description: "VMusic - Music streaming platform built with Next.js",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${NunitoSans.variable} overflow-x-hidden`}>
        <Providers>
          <MusicContextProvider>
            <AudioPlayerContextProvider>{children}</AudioPlayerContextProvider>
          </MusicContextProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
