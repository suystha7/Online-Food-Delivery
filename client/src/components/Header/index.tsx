"use client";
import { FC, useState, useEffect } from "react";
import { Search, Menu, X, ShoppingBag, CircleUser } from "lucide-react"; // Import Lucide Icons
import Link from "next/link"; // Ensure to import Link from next/link

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu toggle state
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Search bar toggle state
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll position

  // Toggle the menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Toggle the search bar visibility
  const toggleSearchBar = () => setIsSearchOpen(!isSearchOpen);

  // Track the scroll position to add/remove transparent and blurred background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 
      ${
        isScrolled
          ? "bg-black bg-opacity-40 backdrop-blur text-white shadow-lg"
          : "bg-transparent text-white"
      }`}
    >
      <div className="flex items-center space-x-4">
        <h1 className="font-semibold text-2xl">Logo</h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-grow justify-center space-x-8 text-md">
        <ul className="flex space-x-8">
          <li>
            <Link
              href="/"
              className="uppercase font-semibold hover:text-blue-600 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/menu"
              className="uppercase font-semibold hover:text-blue-600 transition duration-200"
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="uppercase font-semibold hover:text-blue-600 transition duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="uppercase font-semibold hover:text-blue-600 transition duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Icons (Search, Cart, User) */}
      <div className="flex items-center space-x-6">
        <div className="cursor-pointer" onClick={toggleSearchBar}>
          <Search size={22} />
        </div>
        <div>
          <ShoppingBag size={22} />
        </div>
        <div>
          <CircleUser size={22} />
        </div>
      </div>

      {/* Hamburger for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-black bg-opacity-80 transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col items-center py-6 space-y-6">
          <li>
            <Link
              href="/"
              className="uppercase font-semibold text-white text-xl"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="uppercase font-semibold text-white text-xl"
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="uppercase font-semibold text-white text-xl"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="uppercase font-semibold text-white text-xl"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="absolute top-0 left-0 right-0 z-40 bg-white p-4 md:hidden flex items-center justify-between mt-16">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
          />
          <button onClick={toggleSearchBar} className="text-gray-500 ml-2">
            <X size={20} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
