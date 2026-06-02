import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutClient from "@/components/layout-client";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuyWise AI Admin",
  description: "High-fidelity admin dashboard for platform operations, review workflows, and retailer health.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased`}
    >
      <body suppressHydrationWarning className="h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 text-xs sm:text-sm md:text-base">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
