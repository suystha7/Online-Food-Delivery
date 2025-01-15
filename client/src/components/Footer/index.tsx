"use client";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className=" text-gray-600 body-font bg-gray-100">
      {/* <div className="w-full px-4 py-10 bg-gray-100 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Subscribe to our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Stay updated with our latest news and offers. Enter your email below
          to subscribe!
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
      </div> */}

      <hr className="text-gray-500" />

      <div className="bg-gray-100 text-gray-300">
        <div className="container mx-auto px-6 py-5 flex flex-wrap justify-between items-center">
          {/* Copyright Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <p className="text-sm sm:text-left text-center mb-4 sm:mb-0">
              © 2024 <span className="font-bold text-black">COMPANY NAME</span>.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex space-x-6 mb-4 sm:mb-0 text-black font-medium">
            <a href="#" className="text-sm hover:text-black transition-colors">
              Contact Us
            </a>
            <a href="#" className="text-sm hover:text-black transition-colors">
              Our Company
            </a>
            <a href="#" className="text-sm hover:text-black transition-colors">
              Useful Links
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 text-gray-700">
            <a
              href="#"
              target="_blank"
              aria-label="Facebook"
              className="hover:text-white transition-colors"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a
              href="#"
              target="_blank"
              aria-label="Twitter"
              className="hover:text-white transition-colors"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a
              href="#"
              target="_blank"
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href="#"
              target="_blank"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
