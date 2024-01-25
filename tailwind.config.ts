import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/theme";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#29263F",
            foreground: "#FFFFFF",
            primary: {
              DEFAULT: "#3E395C",
              50: "#938ADA",
              100: "#837BC2",
              200: "#676099",
              300: "#454066",
              400: "#3E395C",
              500: "#35314E",
              600: "#312C46",
              700: "#302B46",
              800: "#2F2B45",
              900: "#29263F",
            },
          },
        },
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#000000",
            primary: {
              DEFAULT: "#3E395C",
              50: "#938ADA",
              100: "#837BC2",
              200: "#676099",
              300: "#454066",
              400: "#3E395C",
              500: "#eee",
              600: "#312C46",
              700: "#302B46",
              800: "#2F2B45",
              900: "#29263F",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
