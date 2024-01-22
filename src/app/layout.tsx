import Logo from "@/components/common/Logo";
import Typography from "@/components/common/Typography";
import { Providers } from "@/components/common/nextui-provider";
import MusicContextProvider from "@/contexts/music-context/music-context-provider";
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
        <div className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-background md:hidden">
          <div className="space-y-8">
            <Logo withName className="mx-auto w-fit scale-[2]" />
            <Typography variant="T_Bold_H2">
              Music streaming platform
            </Typography>
          </div>
        </div>
      </body>
    </html>
  );
}
