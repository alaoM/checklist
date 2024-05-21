import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import { flowbiteTheme } from "./theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
        </head>
        <body className={twMerge("bg-gray-50 dark:bg-gray-900", inter.className)}>
        <Flowbite theme={{ theme: flowbiteTheme }}>{children}</Flowbite>
      </body></html>
  );
}
