"use client";
import { ROUTE_PATHS } from "@/constants";
import {
  BookmarkCheck,
  ChartColumnStacked,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  // Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const [isSidebarMinimized, setIsSiebarMinimized] = useState(false);
  const pathName = usePathname();

  const router = useRouter();

  const toggleSidebar = () => {
    setIsSiebarMinimized((prev) => !prev);
  };

  const navItems = [
    { name: "Category", href: ROUTE_PATHS.category, icon: ChartColumnStacked },
    { name: "Foods", href: ROUTE_PATHS.food, icon: ClipboardList },
    { name: "Orders", href: ROUTE_PATHS.adminOrder, icon: BookmarkCheck },
    // { name: "Users", href: "/admin/user", icon: Users },
  ];

  return (
    <div
      className={`relative ${
        !isSidebarMinimized ? "w-48" : "w-18"
      } bg-white text-black min-h-screen p-4 transition-all duration-300 ease-in-out`}
    >
      {/* Logo */}
      <div className="flex justify-center items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className={`transition-all duration-300 ease-in-out cursor-pointer ${
            !isSidebarMinimized ? "w-32 h-auto" : "w-16 h-auto"
          }`}
          onClick={() => router.push(ROUTE_PATHS.home)}
        />
      </div>

      <button
        className="absolute top-[5.5rem] right-0 transform translate-x-[50%] p-2 rounded-full bg-white border-r"
        onClick={toggleSidebar}
      >
        <span className="text-sm">
          {!isSidebarMinimized ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </span>
      </button>

      <ul className="mt-16 space-y-4">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathName.startsWith(item.href);

          return (
            <li
              key={index}
              className={`relative group font-medium text-brown ${
                isActive
                  ? "bg-gray-200  rounded-xl font-semibold"
                  : "hover:bg-gray-100 rounded-xl"
              }`}
            >
              <Link
                href={item.href}
                className={`flex items-center justify-center space-x-4 ${
                  !isSidebarMinimized ? "p-3" : "p-2"
                }`}
              >
                <Icon className="text-xl text-center" />
                {!isSidebarMinimized && (
                  <span className="text-lg flex justify-start w-full">
                    {item.name}
                  </span>
                )}
              </Link>

              {/* Tooltip */}
              {isSidebarMinimized && (
                <span className="absolute top-2 right-0 bg-gray-900 text-white text-sm rounded shadow-sm px-2 py-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-[110%] transition-all duration-300">
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
