import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import RouteCatcher from "@/components/RouteCatcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js App with Tailwind & Framer Motion",
  description: "A modern Next.js application with Tailwind CSS and Framer Motion animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <LanguageProvider>
          <RouteCatcher>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </RouteCatcher>
        </LanguageProvider>
      </body>
    </html>
  );
}
