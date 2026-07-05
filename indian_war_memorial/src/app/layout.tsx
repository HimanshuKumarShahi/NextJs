import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Indian War Memorial",
    default: "Indian War Memorial — Tribute to India's Brave Soldiers",
  },
  description:
    "A living tribute to the brave soldiers of India. Explore the history, sacrifices, and stories of our heroes across all wars and conflicts.",
  keywords: ["Indian Army", "War Memorial", "Soldiers", "Kargil", "India", "Tribute", "Heroes"],
  openGraph: {
    title: "Indian War Memorial",
    description: "A living tribute to the brave soldiers of India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: "#0B1006", color: "#F2F4F0" }}>
        {children}
      </body>
    </html>
  );
}
