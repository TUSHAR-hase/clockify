"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null); // Track which dropdown is open

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("navbar");
      if (!el) return;
      if (window.scrollY > 8)
        el.classList.add("shadow-md", "bg-white/80", "backdrop-blur");
      else el.classList.remove("shadow-md", "bg-white/80", "backdrop-blur");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDropdown = (name) => {
    setDropdown(dropdown === name ? null : name);
  };

  return (
    <header
      id="navbar"
      className="sticky top-0 z-50 transition-colors bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
              C
            </span>
            <span className="font-semibold text-lg">Clockify</span>
          </div>

          {/* Center: Nav Links (Desktop) */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8 relative">
            {/* Product Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("product")}
                className="flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm font-medium"
              >
                Product <FiChevronDown size={16} />
              </button>
              {dropdown === "product" && (
                <div className="absolute top-full mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                  <Link
                    href="/product/overview"
                    className="block px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    Overview
                  </Link>
                  <Link
                    href="/product/pricing"
                    className="block px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    Pricing
                  </Link>
                </div>
              )}
            </div>

            {/* Features Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("features")}
                className="flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm font-medium"
              >
                Features <FiChevronDown size={16} />
              </button>
              {dropdown === "features" && (
                <div className="absolute top-full mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                  <Link
                    href="/features/time-tracking"
                    className="block px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    Time Tracking
                  </Link>
                  <Link
                    href="/features/reports"
                    className="block px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    Reports
                  </Link>
                </div>
              )}
            </div>

            {/* Download Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("download")}
                className="flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm font-medium"
              >
                Download <FiChevronDown size={16} />
              </button>
              {dropdown === "download" && (
                <div className="absolute top-full mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                  <Link
                    href="/download/windows"
                    className="block px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    Windows
                  </Link>
                  <Link
                    href="/download/mac"
                    className="block px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    Mac
                  </Link>
                </div>
              )}
            </div>
          </nav>
          {/* Right: Login and Sign Up (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Login Link */}
            <Link
              href="pages/login"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Login
            </Link>

            {/* Sign Up Button */}
            <Link href="pages/signup">
              <span className="inline-flex items-center gap-2 rounded-lg bg-gray-600 px-5 py-2 text-white font-semibold shadow hover:bg-gray-700 transition">
                Sign Up
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle Menu"
            className="md:hidden inline-flex items-center justify-center rounded-xl px-3 py-2 ml-2"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t py-3">
            <div className="flex flex-col gap-3">
              {/* Product */}
              <div>
                <button
                  onClick={() => toggleDropdown("product")}
                  className="flex justify-between w-full px-3 py-2 hover:bg-gray-100 rounded"
                >
                  Product <FiChevronDown />
                </button>
                {dropdown === "product" && (
                  <div className="pl-6">
                    <Link href="/product/overview" className="block py-2">
                      Overview
                    </Link>
                    <Link href="/product/pricing" className="block py-2">
                      Pricing
                    </Link>
                  </div>
                )}
              </div>

              {/* Features */}
              <div>
                <button
                  onClick={() => toggleDropdown("features")}
                  className="flex justify-between w-full px-3 py-2 hover:bg-gray-100 rounded"
                >
                  Features <FiChevronDown />
                </button>
                {dropdown === "features" && (
                  <div className="pl-6">
                    <Link href="/features/time-tracking" className="block py-2">
                      Time Tracking
                    </Link>
                    <Link href="/features/reports" className="block py-2">
                      Reports
                    </Link>
                  </div>
                )}
              </div>

              {/* Download */}
              <div>
                <button
                  onClick={() => toggleDropdown("download")}
                  className="flex justify-between w-full px-3 py-2 hover:bg-gray-100 rounded"
                >
                  Download <FiChevronDown />
                </button>
                {dropdown === "download" && (
                  <div className="pl-6">
                    <Link href="/download/windows" className="block py-2">
                      Windows
                    </Link>
                    <Link href="/download/mac" className="block py-2">
                      Mac
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/get-started"
                className="mt-3 px-3 py-2 rounded-lg bg-gray-900 text-white text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
