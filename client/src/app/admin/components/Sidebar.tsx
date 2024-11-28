"use client";
import {
  BookmarkCheck,
  ChartColumnStacked,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathName = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Category", href: "/admin/category", icon: ChartColumnStacked },
    { name: "Products", href: "/admin/product", icon: ClipboardList },
    { name: "Orders", href: "/admin/order", icon: BookmarkCheck },
    { name: "Users", href: "/admin/user", icon: Users },
  ];

  return (
    <div
      className={`relative ${
        isOpen ? "w-48" : "w-18"
      } bg-white text-black min-h-screen p-4 transition-all duration-300 ease-in-out`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-[11%] right-[-10px] transform -translate-y-1/2 p-2 rounded-full bg-white border-r"
      >
        {isOpen ? (
          <span className="text-sm">
            <ChevronLeft className="w-4 h-4" />
          </span>
        ) : (
          <span className="text-sm">
            <ChevronRight className="w-4 h-4" />
          </span>
        )}
      </button>

      <ul className="mt-28 space-y-8 cursor-pointer">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathName === item.href;

          return (
            <li
              key={index}
              className={`${
                isActive
                  ? "bg-gray-200 text-brown rounded-xl font-medium"
                  : "hover:bg-gray-100 hover:text-gray-900 rounded-xl "
              }`}
            >
              <Link
                href={item.href}
                className="flex items-center space-x-4 p-2"
              >
                <Icon className="text-xl" />
                {isOpen && <span className="text-lg">{item.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
