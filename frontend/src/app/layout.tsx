import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import ScrollManager from "@/components/ScrollManager";
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
  title: "Gabriel Cruz",
  description:
    "Software Developer with over 4 years of experience designing, developing, and maintaining software solutions.",
  icons: {
    icon: [
      { url: "/light-icon.png", media: "(prefers-color-scheme: light)" },
      { url: "/dark-icon.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white text-gray-800 dark:bg-[#0d0d0d] dark:text-gray-100">
        <ThemeProvider>
          <ScrollManager />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
