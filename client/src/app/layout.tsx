"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import Provider from "./providers";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  const isAdminPage = pathname.startsWith("/admin");

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
        <Provider>
          <CartProvider>
            {!isAuthPage && !isAdminPage && <Header />}
            <main className="min-h-screen">{children}</main>
            {!isAuthPage && !isAdminPage && <Footer />}
          </CartProvider>
        </Provider>
      </body>
    </html>
  );
}
