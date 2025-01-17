"use client";
import { LogIn, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { useCart } from "@/context/CartContext";
import { ROUTE_PATHS } from "@/constants";
import useGetCurrentUser from "@/api/auth/useGetCurrentUser";
import { IconButton } from "@mui/material";

const Header: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const { cartCount } = useCart();

  const { data } = useGetCurrentUser();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (headerRef.current) {
        const pos = window.pageYOffset;
        if (pos > 20) {
          headerRef.current.classList.add("scroll");
        } else {
          headerRef.current.classList.remove("scroll");
        }
      }
    });
  }, []);

  return (
    <header
      className="w-full fixed top-0 left-0 z-[100] py-4 pr-12 duration-300"
      ref={headerRef}
    >
      <div className="flex items-center justify-between">
        <div className="logo ml-16">
          <Link href="/">
            <Image src="/logo.png" width={100} height={100} alt="logo" />
          </Link>
        </div>

        <div className="ml-auto flex items-center justify-end gap-4 w-[75%]">
          <nav>
            <ul className="flex gap-8 items-center mb-0 text-lg">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="#menu">Our Menu</Link>
              </li>
              <li>
                <Link href="#services">Services</Link>
              </li>
              <li>
                <Link href="#contact">Contact Us</Link>
              </li>
            </ul>
          </nav>

          <Link href={ROUTE_PATHS.cart} className="relative cartTab">
            <div className="relative">
              <IconButton
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200  focus:outline-none"
                aria-label="Shopping Bag Button"
              >
                <ShoppingBag className="w-6 h-6 text-gray-700" />
              </IconButton>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center h-4 w-4 text-xs font-bold text-white bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {data ? (
            <div>
              <IconButton
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
                aria-label="User Icon Button"
              >
                <User className="w-6 h-6 text-gray-700" />
              </IconButton>
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
