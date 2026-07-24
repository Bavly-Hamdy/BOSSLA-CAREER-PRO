import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bossla Career | Smart Resume Analyzer & AI Career Co-Pilot",
  description: "Forensic ATS resume analyzer, keyword gap detector, bullet rewrites, and AI career co-pilot created by Bavly Hamdy.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
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
      className={`${plusJakartaSans.variable} ${inter.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* Subtle Analogue Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#888888_1px,transparent_1px)] [background-size:16px_16px] z-[999]" />
        {children}
      </body>
    </html>
  );
}
