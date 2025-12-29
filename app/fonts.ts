import localFont from "next/font/local";

export const spotifymix = localFont({
  src: [
    {
      path: "./fonts/SpotifyMix-Extrabold.woff2",
      weight: "800",
      style: "extrabold",
    },
  ],
  variable: "--font-spotifymix",
  display: "swap",
});
