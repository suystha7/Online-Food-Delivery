"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export default function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/admin");

  return (
    <div>
      {!isAdminPage && <Header />}
      <main className="min-h-screen w-full">{children}</main>
      {/* {!isAdminPage && <Footer />} */}
    </div>
  );
}
