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
  title: "Nile Gazer \u00b7 Full Stack Developer",
  description: "Nile Gazer is a full-stack developer specializing in JavaScript, React, Node.js, and building modern web applications.",
  keywords: ["Nile Gazer", "Full Stack Developer", "JavaScript", "React", "Node.js", "Web Development"],
  authors: [{ name: "Nile Gazer" }],
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%2300ff9d'/%3E%3Ctext x='50' y='67' font-size='45' text-anchor='middle' fill='%230a0c10' font-weight='bold'%3ENG%3C/text%3E%3C/svg%3E",
  },
  openGraph: {
    title: "Nile Gazer \u00b7 Full Stack Developer",
    description: "Full-stack JavaScript developer and open-source contributor.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Nile Gazer \u00b7 Full Stack Developer",
    description: "Full-stack JavaScript developer and open-source contributor.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
