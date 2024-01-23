import MusicContextProvider from "@/contexts/music-context/music-context-provider";
import { Providers } from "@/components/common/nextui-provider";
import { NunitoSans } from "@/fonts";
import "@/styles/globals.css";

export const metadata = {
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
    <html lang="en" className="purple-dark">
      <body className={`font-sans ${NunitoSans.variable} overflow-x-hidden`}>
        <Providers>
          <MusicContextProvider>{children}</MusicContextProvider>
        </Providers>
      </body>
    </html>
  );
}
