import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-600 body-font bg-gray-100 mt-4">
      {/* Email Subscription Section */}
      <div className="w-full px-4 py-10 bg-gray-100 mt-10 text-center">
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
            className="px-4 py-2 border border-gray-300 rounded-l-lg w-2/3 md:w-1/3 focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </div>
      <div className="container px-8 pt-8 pb-10 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <span className="text-xl">LOGO</span>
          </a>
          <p className="mt-2 text-sm text-gray-500">
            Air plant banjo lyft occupy retro adaptogen indego
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {["COMPANY", "CATEGORIES", "CATEGORIES"].map((category, index) => (
            <div key={index} className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font text-gray-900 font-bold tracking-widest text-md mb-3">
                {category}
              </h2>
              <nav className="list-none mb-10">
                {["First Link", "Second Link", "Third Link", "Fourth Link"].map(
                  (link, i) => (
                    <li key={i}>
                      <a className="text-gray-600 hover:text-gray-800">
                        {link}
                      </a>
                    </li>
                  )
                )}
              </nav>
            </div>
          ))}
        </div>
      </div>
      <hr className="text-black" />
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2024 COMPANY NAME
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            {["facebook", "twitter", "instagram", "linkedin"].map(
              (social, idx) => (
                <a key={idx} className="ml-3 text-gray-500" href="#">
                  {social === "facebook" && <Facebook className="w-5 h-5" />}
                  {social === "twitter" && <Twitter className="w-5 h-5" />}
                  {social === "instagram" && <Instagram className="w-5 h-5" />}
                  {social === "linkedin" && <Linkedin className="w-5 h-5" />}
                </a>
              )
            )}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
