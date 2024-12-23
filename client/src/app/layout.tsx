"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  return (
    <html lang="en">
      <head>
        <title>Online Food Delivery</title>
        <meta
          name="description"
          content="A short description of your website for SEO purposes."
        />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />
        <meta name="author" content="Your Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {!isAuthPage && <Navbar />}
        {children}
        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}
