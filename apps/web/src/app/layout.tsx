import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
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
  title: {
    template: "%s | Campfire",
    default: "Campfire",
  },
  description: "Campfire is a community built by and for the people. Get authentic product reviews directly from verified owners, with zero brand sponsorship, affiliate links, or filtering.",
  keywords: ["authentic product reviews", "verified owners", "real consumer reviews", "unsponsored tech reviews", "campfire community"],
  authors: [{ name: "Campfire Community" }],
  robots: "index, follow",
  openGraph: {
    title: {
      template: "%s | Campfire",
      default: "Campfire",
    },
    description: "Campfire is a community built by and for the people. Get authentic product reviews directly from verified owners, with zero brand sponsorship, affiliate links, or filtering.",
    type: "website",
    siteName: "Campfire",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campfire",
    description: "Campfire is a community built by and for the people. Get authentic product reviews directly from verified owners, with zero brand sponsorship, affiliate links, or filtering.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jersey+25&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden w-full">
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
