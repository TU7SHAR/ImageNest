// Footer.js
import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Image Nest</h2>
            <p className="text-sm">Capturing moments, one image at a time.</p>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link
              href="/about"
              className="hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="hover:text-blue-400 transition-colors"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="hover:text-blue-400 transition-colors"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-blue-400 transition-colors"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-blue-400 transition-colors"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Image Nest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
