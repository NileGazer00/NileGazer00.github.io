import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nile Gazer | Full-Stack Developer & Open Source Contributor",
  description:
    "Nile Gazer is a full-stack developer specializing in JavaScript, TypeScript, Python, React, and Next.js. Builder of real software — from sentiment-driven trading bots to zero-dependency libraries. Available for hire.",
  keywords: [
    "Nile Gazer",
    "Full Stack Developer",
    "JavaScript",
    "TypeScript",
    "Python",
    "React",
    "Next.js",
    "Node.js",
    "Web Development",
    "Open Source",
    "Trading Bot",
    "LeadGen.js",
    "Freelance Developer",
    "Remote Developer",
  ],
  authors: [{ name: "Nile Gazer", url: "https://nilegazer00.github.io" }],
  creator: "Nile Gazer",
  metadataBase: new URL("https://nilegazer00.github.io"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Nile Gazer | Full-Stack Developer",
    description:
      "Building real software — from sentiment-driven trading bots to zero-dependency JavaScript libraries. Full-stack developer available for hire.",
    type: "website",
    url: "https://nilegazer00.github.io",
    siteName: "Nile Gazer Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nile Gazer | Full-Stack Developer",
    description:
      "Building real software with JavaScript, Python, and modern web technologies. Available for hire.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0A0C10" />
        <meta name="msapplication-TileColor" content="#00FF9D" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
