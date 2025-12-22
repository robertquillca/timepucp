import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'], // Specify required subsets
  display: 'swap',   // Optional: use 'swap' for better user experience
});


export const metadata: Metadata = {
  title: "Time PUCP",
  description: "Timer for PUCP assessments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
