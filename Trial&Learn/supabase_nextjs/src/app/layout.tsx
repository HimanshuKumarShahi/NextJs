import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { ToastProvider } from "@/components/ui/Toast";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SNEAKERS | Authentic Vault & Exclusive Drops",
  description:
    "Buy 100% authentic Air Jordans, Nike Dunks, Adidas Yeezy, Sambas and performance kicks with fast delivery and Supabase security.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-orange-500 selection:text-black">
        <AuthProvider>
          <NotificationProvider>
            <CartProvider>
              <ToastProvider>
                <Navbar />
                <main className="flex-1 flex flex-col">{children}</main>
                <Footer />
              </ToastProvider>
            </CartProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
