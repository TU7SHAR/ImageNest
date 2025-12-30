"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Search Overlay state
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const inputRef = useRef(null); // To auto-focus input when opened

  // Auto-focus the input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/Gallery/${searchQuery.trim().toLowerCase()}`);
      setIsSearchOpen(false); // Close search after submitting
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <nav className="bg-white shadow-md relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* ------------------------------------------------------
               1. NORMAL NAVBAR CONTENT (Hidden when search is open) 
               ------------------------------------------------------ */}
            {!isSearchOpen && (
              <>
                {/* Logo */}
                <div className="flex items-center">
                  <Image
                    src="/iN.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="cursor-pointer"
                  />
                  <Link
                    href="/"
                    className="ml-2 text-xl font-bold text-blue-600"
                  >
                    ImageNest
                  </Link>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6 items-center">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Home
                  </Link>
                  <Link
                    href="/About"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    About
                  </Link>
                  <Link
                    href="/Login"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Login
                  </Link>

                  {/* Search Icon Button (Triggers Overlay) */}
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Mobile Menu Button + Search Icon */}
                <div className="flex items-center md:hidden space-x-4">
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                  <button onClick={toggleMenu} className="text-gray-600">
                    {isOpen ? (
                      <svg
                        className="h-6 w-6"
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
                        className="h-6 w-6"
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
              </>
            )}

            {/* ------------------------------------------------------
               2. FULL SCREEN SEARCH OVERLAY (Visible when open)
               ------------------------------------------------------ */}
            {isSearchOpen && (
              <div className="absolute inset-0 bg-white z-50 flex items-center px-4 animate-in fade-in zoom-in duration-200">
                <form
                  onSubmit={handleSearch}
                  className="w-full flex items-center max-w-3xl mx-auto"
                >
                  {/* Search Icon (Decorative) */}
                  <svg
                    className="h-6 w-6 text-gray-400 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>

                  {/* The Input Field */}
                  <input
                    ref={inputRef}
                    type="text"
                    className="flex-grow text-xl text-gray-800 placeholder-gray-400 bg-transparent border-none outline-none focus:ring-0"
                    placeholder="Search for nature, cars, tech..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  {/* Close (X) Button */}
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-4 p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full transition"
                  >
                    <svg
                      className="h-6 w-6"
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
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu (Only visible if Search is CLOSED) */}
        {!isSearchOpen && isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Home
              </Link>
              <Link
                href="/About"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                About
              </Link>
              <Link
                href="/Login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
