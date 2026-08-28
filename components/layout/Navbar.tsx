"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/components/language/LanguageContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/90 shadow-lg backdrop-blur-md">

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">

          <Image
            src="/images/apc-logo.jpg"
            alt="APC Logo"
            width={55}
            height={55}
            priority
            className="rounded-full"
          />

          <div>
            <h1 className="text-xl font-extrabold text-green-700 md:text-2xl">
              GAJERE 2027
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Kebbi South Senatorial Campaign
            </p>
          </div>

        </a>


        {/* Desktop Menu */}
        <ul className="hidden items-center gap-6 lg:flex">

          {menuItems.map((item) => (

            <li key={item.name}>

              <a
                href={item.link}
                className="relative font-semibold text-gray-700 transition hover:text-green-700 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-green-700 after:transition-all hover:after:w-full"
              >
                {item.name}
              </a>

            </li>

          ))}

        </ul>


        {/* Right Side */}
        <div className="hidden items-center gap-3 md:flex">


          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            className="rounded-lg border border-green-700 px-3 py-2 text-sm font-bold text-green-700 transition hover:bg-green-700 hover:text-white"
          >
            {language === "en" ? "HA" : "EN"}
          </button>


          {/* Join Button */}
          <a
            href="#volunteer"
            className="rounded-xl bg-green-700 px-6 py-3 font-bold text-white shadow-md transition hover:-translate-y-1 hover:bg-green-800"
          >
            Join Us
          </a>


        </div>


        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          className="text-3xl text-green-700 md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>


      </nav>


      {/* Mobile Menu */}

      {open && (

        <div className="border-t bg-white shadow-xl md:hidden">

          <ul className="space-y-1 px-6 py-5">

            {menuItems.map((item) => (

              <li key={item.name}>

                <a
                  href={item.link}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700"
                >
                  {item.name}
                </a>

              </li>

            ))}


            <li className="pt-3">

              <button
                onClick={() =>
                  toggleLanguage()
                }
                className="mb-3 w-full rounded-lg border border-green-700 py-3 font-bold text-green-700"
              >
                Language: {language === "en" ? "HA" : "EN"}
              </button>


              <a
                href="#volunteer"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-green-700 px-4 py-3 text-center font-bold text-white"
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


