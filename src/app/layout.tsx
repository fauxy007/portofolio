import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Anton } from "next/font/google";
import "./globals.css";
import PortfolioLayout from "./components/portfolio-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "Fadzar | Web Developer Portfolio",
  description: "Membangun aplikasi web modern yang responsif dan performan. Lihat portofolio proyek terbaru saya di sini",
  openGraph: {
    title: "Fadzar - Portfolio",
    description: "Membangun solusi digital yang modern dan efisien.",
    url: "https://fadzar.my.id",
    siteName: "Fadzar - Portfolio",
    locale: "id_ID",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PortfolioLayout>{children}</PortfolioLayout>
      </body>
    </html>
  );
}
