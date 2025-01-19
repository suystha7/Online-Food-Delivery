
import { CartProvider } from "@/context/CartContext";
import Provider from "./providers";
import { ToastContainer, toast } from "react-toastify";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            {children}
            <ToastContainer />
          </CartProvider>
        </Provider>
      </body>
    </html>
  );
}
