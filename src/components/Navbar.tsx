"use client";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-black/70 backdrop-blur-lg text-white px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center border-b border-gray-800">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-xl sm:text-2xl font-black tracking-wider"
          onClick={closeMenu}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-200 to-gray-400">
            PORTFOLIO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 lg:space-x-8">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/services", label: "Services" }, 
            { href: "/skills", label: "Skills" }, 
            { href: "/portfolio", label: "My Work" },
            { href: "/contact", label: "Contact" }
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white font-light tracking-wider text-sm lg:text-base transition-all duration-300 hover:scale-105 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-300 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col space-y-1 w-6 h-6 relative z-60"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black/90 backdrop-blur-lg z-40 transition-all duration-500 md:hidden ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={closeMenu}
        />

        {/* Mobile Menu */}
        <div 
          className={`fixed top-0 right-0 h-full w-80 max-w-full bg-gray-900/95 backdrop-blur-lg z-50 transform transition-transform duration-500 md:hidden ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-24 px-8">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-8">
              {[
                 { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/services", label: "Services" }, 
            { href: "/skills", label: "Skills" }, 
            { href: "/portfolio", label: "My Work" },
            { href: "/contact", label: "Contact" }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-2xl font-light text-gray-300 hover:text-white tracking-wider transition-all duration-300 hover:translate-x-2 border-b border-gray-800 pb-4"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="mt-auto pb-12">
              <div className="w-16 h-0.5 bg-gradient-to-r from-gray-600 to-transparent mb-6" />
              <p className="text-gray-500 text-sm font-light tracking-wider">
                CINEMATIC STORYTELLER
              </p>
              <p className="text-gray-600 text-xs mt-2">
                Crafting visual narratives
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Prevent body scroll when menu is open */}
      <style jsx>{`
        body {
          overflow: ${isMenuOpen ? 'hidden' : 'auto'};
        }
      `}</style>
    </>
  );
}