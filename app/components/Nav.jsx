"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="">
        <nav className="bg-white shadow-md ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Image
                  src="/iN.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="text-lg font-bold text-blue-600 cursor-pointer"
                />
                <Link
                  href="/"
                  className="relative text-lg font-bold text-blue-600 group"
                >
                  <span className="transition-colors duration-300 group-hover:text-black">
                    ImageNest
                  </span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-full bg-black transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
                </Link>
                <Link
                  href="/about"
                  className="ml-4 text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-md transition-colors"
                >
                  About
                </Link>
              </div>
              <div className="hidden md:flex space-x-4">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-md transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-md transition-colors"
                >
                  More
                </Link>
                <Link
                  href="/Register"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-md transition-colors"
                >
                  Register
                </Link>
                <Link
                  href="/register"
                  className="text-black relative group px-3 py-2 rounded-md transition-colors"
                >
                  <span className="relative z-10">By Tushar</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-500  to-purple-500 opacity-50 group-hover:opacity-70 transition-opacity duration-300 rounded-md"></span>
                </Link>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div
            className={`${isOpen ? "block" : "hidden"} md:hidden`}
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-100 block px-3 py-2 rounded-md transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-100 block px-3 py-2 rounded-md transition-colors"
              >
                About
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-100 block px-3 py-2 rounded-md transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-100 block px-3 py-2 rounded-md transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
