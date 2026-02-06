import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "Climate Space Zimbabwe",
  description: "Youth-led climate organisation in Zimbabwe. Go Greener, Go Change the World.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased min-h-screen flex flex-col bg-brand-bg text-brand-secondary`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
