import { Toaster } from "sonner";

import MusicContextProvider from "@/contexts/music-context/music-context-provider";
import { Providers } from "@/components/common/nextui-provider";
import { NunitoSans } from "@/fonts";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AudioPlayerContextProvider from "@/contexts/audio-player-context/audio-player-context-provider";
import NextAuthSessionProvider from "@/components/auth/session-provider";
import PrintLogo from "@/components/common/print-logo";

export const metadata = {
  metadataBase: "http://localhost:3000",
  title: {
    template: "%s | VMusic",
    default: "VMusic",
  },
  description: "VMusic - Music streaming platform built with Next.js",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["spotify", "vmusic", "music app", "songs", "music streaming"],
  authors: [
    {
      name: "imvinojanv",
      url: "https://www.linkedin.com/in/imvinojanv/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "/vmusic-512x512.png" },
    { rel: "icon", url: "/favicon.ico" },
  ],
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
            <AudioPlayerContextProvider>
              <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
            </AudioPlayerContextProvider>
          </MusicContextProvider>
        </Providers>
        <Toaster position="top-right" duration={2000} />
        <Analytics />
        <SpeedInsights />
        <PrintLogo />
      </body>
    </html>
  );
}
