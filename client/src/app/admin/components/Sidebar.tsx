"use client";
import {
  BookmarkCheck,
  ChartColumnStacked,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathName = usePathname();

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust 768px as needed
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    if (!isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const menuItems = [
    { name: "Category", href: "/admin/category", icon: ChartColumnStacked },
    { name: "Products", href: "/admin/product", icon: ClipboardList },
    { name: "Orders", href: "/admin/order", icon: BookmarkCheck },
  ];

  return (
    <div
      className={`relative ${
        isOpen ? "w-48" : "w-18"
      } bg-white text-black min-h-screen p-4 transition-[width] duration-300 ease-in-out`}
    >
      {/* Logo */}
      <div className="flex justify-center items-center">
        <div className="transition-opacity duration-500 ease-in-out flex items-center">
          {isOpen && (
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" width={100} height={100} alt="logo" />
            </Link>
          )}
          {!isOpen && <span className="text-2xl font-bold mt-16"></span>}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-[11%] right-[-10px] transform p-2 rounded-full bg-white border-r hover:animate-move shadow-sm "
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {/* Menu Items */}
      <ul className="mt-20 space-y-8 cursor-pointer transition-opacity duration-500 ease-in-out">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathName === item.href;

          return (
            <li
              key={index}
              className={`relative group ${
                isActive
                  ? "bg-gray-200 text-brown rounded-xl font-medium"
                  : "hover:bg-gray-100 hover:text-gray-900 rounded-xl"
              }`}
            >
              <Link
                href={item.href}
                className={`flex items-center space-x-4 ${
                  isOpen ? "p-3" : "p-2"
                }`}
              >
                <Icon className="text-xl text-center" />
                {isOpen && (
                  <span className="text-lg flex justify-start w-full">
                    {item.name}
                  </span>
                )}
              </Link>
              {/* Tooltip */}
              {!isOpen && (
                <span className="absolute top-2 left-12 bg-gray-900 text-white text-sm rounded shadow-sm px-2 py-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                  {item.name}
                  <span
                    className="absolute top-1/2 left-[-4px] -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"
                    aria-hidden="true"
                  ></span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
