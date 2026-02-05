import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LoadingIndicator from "./ui/loading-indicator";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokedex | Explore Pokemon",
  description:
    "Browse and discover Pokemon from all generations. Search, filter, and view detailed stats for your favorite Pokemon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingIndicator />
        {children}
      </body>
    </html>
  );
}
