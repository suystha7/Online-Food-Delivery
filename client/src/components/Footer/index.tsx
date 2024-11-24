"use client";
import { ArrowUp, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React, { useState, useEffect } from "react";

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle the visibility of the scroll to top button
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <footer className="text-gray-600 body-font bg-gray-100">
      {/* Newsletter Subscription Section */}
      <div className="w-full px-4 py-10 bg-gray-100 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Subscribe to our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Stay updated with our latest news and offers. Enter your email below to subscribe!
        </p>
        <div className="flex justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2.5 border rounded-l-lg w-2/3 md:w-1/3 focus:outline-none"
          />
          <button className="btn-red text-white px-6 py-2 rounded-r">
            Subscribe
          </button>
        </div>
      </div>

      <hr className="text-gray-500" />

      {/* Footer Content */}
      <div className="bg-gray-100 flex items-center justify-between py-4">
        <div className="container mx-auto px-5 flex flex-wrap justify-between  items-center">
          {/* Copyright Text */}
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2024 COMPANY NAME
          </p>

          {/* Footer Links */}
          <div className="flex items-center justify-center sm:justify-start space-x-4">
            <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
              About
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
              Company
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
              Links 
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="inline-flex sm:ml-auto mt-4 sm:mt-0 justify-center sm:justify-start space-x-4">
            {["facebook", "twitter", "instagram", "linkedin"].map((social, idx) => (
              <a
                key={idx}
                href="#"
                target="_blank"
                className="text-gray-500 hover:text-gray-700"
                aria-label={social}
              >
                {social === "facebook" && <Facebook className="w-5 h-5" />}
                {social === "twitter" && <Twitter className="w-5 h-5" />}
                {social === "instagram" && <Instagram className="w-5 h-5" />}
                {social === "linkedin" && <Linkedin className="w-5 h-5" />}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-20 right-6 p-3 rounded-full bg-brown text-white shadow-lg transition-opacity duration-300 transform ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        } hover:scale-110 hover:animate-bounce`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;
