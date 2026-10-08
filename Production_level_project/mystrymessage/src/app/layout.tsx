import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import './globals.css'
import AuthProvider from "@/context/AuthProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MystryMessage",
  description: "Receive anonymous feedback securely.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <AuthProvider>
        <body className="min-h-full flex flex-col">
          <Navbar/>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
