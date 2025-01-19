"use client";
import { LogIn, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { ROUTE_PATHS } from "@/constants";
import useGetCurrentUser from "@/api/auth/useGetCurrentUser";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { NAV_ITEM_LIST } from "@/data";

const Header: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const { cartCount } = useCart();
  const { data } = useGetCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isAdmin = data?.role === "ADMIN";

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const pos = window.pageYOffset;
        headerRef.current.classList.toggle("scroll", pos > 20);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropDownItemStyle = `px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-base border-b border-gray-200`;

  return (
    <header
      className="w-full fixed top-0 left-0 z-[100] py-4 pr-12 duration-300 scroll:shadow-lg"
      ref={headerRef}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="logo ml-16">
          <Link href="/">
            <Image
              src="/logo.png"
              width={100}
              height={150}
              style={{
                width: "auto",
                height: "auto",
              }}
              alt="logo"
              priority
            />
          </Link>
        </div>

        {/* Navigation */}
        <div className="ml-auto flex items-center justify-end gap-4 w-[75%]">
          <nav>
            <ul className="flex gap-8 items-center mb-0 text-lg">
              {NAV_ITEM_LIST.map((navItem) => (
                <li key={navItem.id}>
                  <Link href={navItem.navigateTo}>{navItem.text}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cart */}
          <Link href={ROUTE_PATHS.cart} className="relative">
            <IconButton
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
              aria-label="Shopping Bag Button"
            >
              <ShoppingBag className="w-6 h-6 text-gray-700" />
            </IconButton>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-1 flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Dropdown */}
          {data ? (
            <div className="relative">
              <IconButton
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
                aria-label="User Icon Button"
                onClick={toggleDropdown}
              >
                <User className="w-6 h-6 text-gray-700" />
              </IconButton>
              {isOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg border border-gray-200 z-10"
                  role="menu"
                >
                  <ul className="flex flex-col p-2">
                    <li
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-base border-b border-gray-200"
                      role="menuitem"
                      onClick={() => handleOptionClick("/update-profile")}
                    >
                      Update Profile
                    </li>
                    <li
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-base border-b border-gray-200"
                      role="menuitem"
                      onClick={() => handleOptionClick("/change-password")}
                    >
                      Change Password
                    </li>
                    {isAdmin && (
                      <li
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-base border-b border-gray-200"
                        role="menuitem"
                        onClick={() => handleOptionClick("/admin/category")}
                      >
                        Dashboard
                      </li>
                    )}
                    <li
                      className="px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer text-base"
                      role="menuitem"
                      onClick={() => handleOptionClick("/logout")}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link href={ROUTE_PATHS.signin}>
              <Button className="btn-red ml-2 relative group">
                <span className="group-hover:opacity-0 transition-opacity duration-300">
                  Sign In
                </span>
                <LogIn
                  size={20}
                  className="text-red-500 absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
