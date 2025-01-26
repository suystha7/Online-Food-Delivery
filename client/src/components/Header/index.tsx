"use client";
import {
  BookmarkCheck,
  KeyRound,
  LayoutDashboard,
  LogIn,
  LogOut,
  ShoppingBag,
  Star,
  User,
  UserRoundPen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BUTTON_TYPES, ROUTE_PATHS } from "@/constants";
import useGetCurrentUser from "@/api/auth/useGetCurrentUser";
import useGetCart from "@/api/cart/useGetCart";
import Spinner from "../icons/Spinner";
import { IconButton } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEM_LIST } from "@/data";
import { Button } from "../basic";

const Header: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement | null>(null);

  const router = useRouter();

  const pathName = usePathname();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: cartData } = useGetCart();

  const { data, isPending } = useGetCurrentUser();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleOptionClick = (path: string) => {
    router.push(path);
    setIsDropdownOpen(false);
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

  const dropDownItemStyle = `flex gap-2 items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-base border-b border-gray-200 last:border-b-0`;

  return (
    <header
      className="w-full fixed top-0 left-0 z-[10] py-4 pr-12 duration-300"
      ref={headerRef}
    >
      <div className="flex items-center justify-between">
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

        <div className="flex items-center gap-4 w-[75%]">
          <nav>
            <ul className="flex gap-8 items-center mb-0 text-lg">
              {NAV_ITEM_LIST.map((navItem) => (
                <li key={navItem.id}>
                  <Link
                    href={navItem.navigateTo}
                    className={`${
                      pathName === "/" ? "text-white" : "text-black"
                    }`}
                  >
                    {navItem.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex gap-8 items-center">
            <Link href={ROUTE_PATHS.cart} className="relative cartTab">
              <ShoppingBag
                className={`w-8 h-8 ${
                  pathName === "/" ? "text-white" : "text-black"
                }`}
              />
              {cartData && cartData.items.length > 0 && (
                <span className="flex items-center justify-center text-xs">
                  {cartData.items.length}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            {data ? (
              <div className="relative">
                <div className="cursor-pointer" onClick={toggleDropdown}>
                  {data.avatar.url ? (
                    <img
                      src={data.avatar.url}
                      alt="User Profile Image"
                      className="w-[54px] h-[54px] rounded-full border-2 border-primary object-cover"
                    />
                  ) : (
                    <div
                      className="p-2 rounded-full bg-white"
                      aria-label="User Icon Button"
                    >
                      <User className="w-6 h-6 text-gray-700" />
                    </div>
                  )}
                </div>

                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 min-w-52 bg-white shadow-lg rounded-lg border border-gray-200 z-10"
                    role="menu"
                  >
                    <ul className="flex flex-col p-2">
                      <li
                        className={`${dropDownItemStyle} justify-center`}
                        role="menuitem"
                        onClick={() => handleOptionClick("/my-profile")}
                      >
                        <span className="font-bold flex  text-nowrap">
                          <span className="uppercase">{data.fullName}</span>

                          <div className="ml-1">({data.role})</div>
                        </span>
                      </li>

                      <li
                        className={`${dropDownItemStyle}`}
                        role="menuitem"
                        onClick={() =>
                          data.role === "USER"
                            ? handleOptionClick("/my-orders")
                            : handleOptionClick("/admin/category")
                        }
                      >
                        {data.role === "ADMIN" ? (
                          <>
                            <LayoutDashboard size={24} />
                            <span>Dashboard</span>
                          </>
                        ) : (
                          <>
                            <BookmarkCheck size={24} />
                            <span> My Orders</span>
                          </>
                        )}
                      </li>

                      <li
                        className={`${dropDownItemStyle}`}
                        role="menuitem"
                        onClick={() => handleOptionClick("/update-profile")}
                      >
                        <UserRoundPen size={24} />
                        <span>Update Profile</span>
                      </li>

                      <li
                        className={`${dropDownItemStyle}`}
                        role="menuitem"
                        onClick={() => handleOptionClick("/change-password")}
                      >
                        <KeyRound size={24} />
                        <span>Change Password</span>
                      </li>

                      {data.role === "USER" && (
                        <li
                          className={`${dropDownItemStyle}`}
                          role="menuitem"
                          onClick={() =>
                            data.role === "USER" &&
                            handleOptionClick("/my-ratings")
                          }
                        >
                          <Star size={24} />
                          <span>My Ratings</span>
                        </li>
                      )}

                      <li
                        className={`${dropDownItemStyle} text-red-600 hover:bg-red-100 `}
                        role="menuitem"
                        onClick={() => handleOptionClick("/logout")}
                      >
                        <LogOut size={24} />
                        <span>Logout</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : isPending ? (
              <Spinner className="fill-gray-500" />
            ) : (
              <Link href={ROUTE_PATHS.signin}>
                <Button
                  buttonType={BUTTON_TYPES.redButton}
                  className="ml-2 relative group"
                >
                  <span className="group-hover:opacity-0 transition-opacity duration-300">
                    Sign In
                  </span>
                  <LogIn
                    size={20}
                    className="text-accent absolute left-1/2 top-1/2 -translate-y-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
