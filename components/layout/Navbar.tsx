"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Biography", link: "#biography" },
    { name: "Vision", link: "#vision" },
    { name: "Manifesto", link: "#manifesto" },
    { name: "Priorities", link: "#priorities" },
    { name: "News", link: "#news" },
    { name: "Gallery", link: "#gallery" },
    { name: "Volunteer", link: "#volunteer" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-white/90 shadow-lg backdrop-blur-md">

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-4">
          <Image
            src="/images/apc-logo.jpg"
            alt="APC Logo"
            width={60}
            height={60}
            priority
            className="rounded-full"
          />

          <div>
            <h1 className="text-2xl font-extrabold text-green-700">
              GAJERE 2027
            </h1>

            <p className="text-sm text-gray-500">
              Kebbi South Senatorial Campaign
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-7 md:flex">

          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.link}
                className="relative font-semibold text-gray-700 transition-colors duration-300 hover:text-green-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-green-700 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </a>
            </li>
          ))}

        </ul>

        {/* Desktop Button */}
        <a
          href="#volunteer"
          className="hidden rounded-xl bg-green-700 px-6 py-3 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-green-800 md:block"
        >
          Join Us
        </a>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="text-3xl font-bold text-green-700 transition md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>

      </nav>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t bg-white shadow-lg md:hidden">

          <ul className="space-y-1 px-6 py-5">

            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.link}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                >
                  {item.name}
                </a>
              </li>
            ))}

            <li className="pt-4">
              <a
                href="#volunteer"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-green-700 px-4 py-3 text-center font-bold text-white transition hover:bg-green-800"
              >
                Join Us
              </a>
            </li>

          </ul>

        </div>
      )}

    </header>
  );
}