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
import Button from "@mui/material/Button";
import { ROUTE_PATHS } from "@/constants";
import useGetCurrentUser from "@/api/auth/useGetCurrentUser";
import useGetCart from "@/api/cart/useGetCart";
import Spinner from "../icons/Spinner";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { NAV_ITEM_LIST } from "@/data";

const Header: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement | null>(null);

  const router = useRouter();

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

  const dropDownItemStyle = `px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-base flex items-center gap-2 font-[500] border-b border-gray-200 first:border-t-0 last:border-b-0`;

  return (
    <header
      className="w-full fixed top-0 left-0 z-[100] py-4 pr-12 duration-300"
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

        <div className="flex items-center gap-4 w-[85%]">
          <nav>
            <ul className="flex gap-8 items-center mb-0 text-lg">
              {NAV_ITEM_LIST.map((navItem) => (
                <li key={navItem.id}>
                  <Link href={navItem.navigateTo}>{navItem.text}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex gap-8 items-center">
            {data?.role === "USER" && (
              <Link href={ROUTE_PATHS.cart} className="relative cartTab">
                <ShoppingBag className="w-7 h-7 text-[#f7be27]" />
                {cartData && cartData.items.length > 0 && (
                  <span className="flex items-center justify-center text-xs absolute -top-3">
                    {cartData.items.length}
                  </span>
                )}
              </Link>
            )}

            {data ? (
              <div className="relative">
                <div className="cursor-pointer" onClick={toggleDropdown}>
                  {data.avatar.url ? (
                    <img
                      src={data.avatar.url}
                      alt="User Profile Image"
                      className="w-[46px] h-[46px] rounded-full border-2 border-primary object-cover"
                    />
                  ) : (
                    <IconButton
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
                      aria-label="User Icon Button"
                    >
                      <User className="w-6 h-6 text-gray-700" />
                    </IconButton>
                  )}
                </div>

                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-10"
                    role="menu"
                  >
                    <ul className="flex flex-col p-2">
                      <li
                        className={`${dropDownItemStyle} justify-center`}
                        role="menuitem"
                        onClick={() => handleOptionClick("/profile")}
                      >
                        <span className="font-bold flex ">
                          <div className="uppercase">{data.fullName}</div>

                          <div className="ml-1">
                            ({data.role === "ADMIN" ? "ADMIN" : "USER"})
                          </div>
                        </span>
                      </li>

                      <li
                        className={`${dropDownItemStyle}`}
                        role="menuitem"
                        onClick={() =>
                          data.role === "USER"
                            ? handleOptionClick("/myOrders")
                            : handleOptionClick("/admin/category")
                        }
                      >
                        {data.role === "USER" ? (
                          <>
                            <BookmarkCheck size={24} className="mr-2" /> My
                            Orders
                          </>
                        ) : (
                          <>
                            <LayoutDashboard size={24} className="mr-2" />{" "}
                            Dashboard
                          </>
                        )}
                      </li>

                      <li
                        className={`${dropDownItemStyle}`}
                        role="menuitem"
                        onClick={() =>
                          data.role === "USER" &&
                          handleOptionClick("/myRatings")
                        }
                      >
                        {data.role === "USER" && (
                          <>
                            <Star size={24} className="mr-2" /> My Ratings
                          </>
                        )}
                      </li>

                      <li
                        className={`${dropDownItemStyle}`}
                        role="menuitem"
                        onClick={() => handleOptionClick("/update-profile")}
                      >
                        <UserRoundPen size={24} className="mr-2" /> Update
                        Profile
                      </li>

                      <li
                        className={`${dropDownItemStyle}`}
                        role="menuitem"
                        onClick={() => handleOptionClick("/change-password")}
                      >
                        <KeyRound size={24} className="mr-2" /> Change Password
                      </li>

                      <li
                        className={`${dropDownItemStyle} text-red-600 hover:bg-red-100 `}
                        role="menuitem"
                        onClick={() => handleOptionClick("/logout")}
                      >
                        <LogOut size={24} className="mr-2" /> Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : isPending ? (
              <Spinner className="fill-gray-500" />
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
      </div>
    </header>
  );
};

export default Header;
