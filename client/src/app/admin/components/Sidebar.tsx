"use client";
import { ROUTE_PATHS } from "@/constants";
import {
  BookmarkCheck,
  ChartColumnStacked,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarMinimized((prev) => !prev);
  };

  const handleLogout = () => {
    // Add your logout logic here (e.g., API call or clearing tokens).
    console.log("Logging out...");
    router.push("/logout");
  };

  const navItems = [
    { name: "Category", href: ROUTE_PATHS.category, icon: ChartColumnStacked },
    { name: "Foods", href: ROUTE_PATHS.food, icon: ClipboardList },
    { name: "Orders", href: ROUTE_PATHS.adminOrder, icon: BookmarkCheck },
  ];

  return (
    <div
      className={`relative ${
        isSidebarMinimized ? "w-18" : "w-48"
      } bg-white text-black min-h-screen p-4 transition-all duration-300 ease-in-out`}
    >
      {/* Logo */}
      <div className="flex justify-center items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className={`transition-all duration-300 ease-in-out ${
            isSidebarMinimized ? "w-16 h-auto" : "w-32 h-auto"
          }`}
        />
      </div>

      {/* Sidebar Toggle Button */}
      <button
        className="absolute top-[5.5rem] right-0 transform translate-x-[50%] p-2 rounded-full bg-white border shadow-sm"
        onClick={toggleSidebar}
      >
        {isSidebarMinimized ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Navigation Items */}
      <ul className="mt-16 space-y-4">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathName.startsWith(item.href);

          return (
            <li
              key={index}
              className={`font-medium ${
                isActive
                  ? "bg-gray-200 text-gray-900 rounded-xl"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-xl"
              }`}
            >
              <Link
                href={item.href}
                className={`flex items-center ${
                  isSidebarMinimized ? "justify-center p-2" : "p-3 space-x-4"
                }`}
              >
                <Icon className="text-xl" />
                {!isSidebarMinimized && (
                  <span className="text-lg">{item.name}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <div
        className={`mt-96 flex items-center ${
          isSidebarMinimized ? "justify-center" : "justify-start"
        } cursor-pointer text-red-600 hover:bg-red-100 rounded-xl p-3`}
        onClick={handleLogout}
      >
        <LogOut className="text-xl" />
        {!isSidebarMinimized && <span className="ml-3 text-lg">Logout</span>}
      </div>
    </div>
  );
}
