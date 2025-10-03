"use client";

import Link from "next/link";
import { FaInstagram, FaYoutube, FaFacebook, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Simple fade-in animation for all footer content
      gsap.fromTo(footerRef.current?.children || [],
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, [isMounted]);

  const handleSocialHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSocialLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-br from-gray-900 via-black to-gray-950 py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left - Brand Section */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-3xl lg:text-4xl font-black tracking-tighter mb-4 text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
                CINE_VOWS
              </span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-gray-600 to-transparent mb-4 mx-auto md:mx-0" />
            <p className="text-sm xs:text-base sm:text-lg text-gray-400 font-light tracking-wide leading-relaxed max-w-md">
              Capturing timeless stories through the art of cinematic storytelling.
            </p>
          </div>

          {/* Middle - Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-6 text-white tracking-wider">
              EXPLORE
            </h3>
            
            <div className="w-12 h-0.5 bg-gradient-to-r from-gray-600 to-transparent mb-6 mx-auto md:mx-0" />
            
            <ul className="space-y-3 xs:space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/portfolio", label: "My Works" },
                { href: "/services", label: "Services" },
                { href: "/contact", label: "Contact" }
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link 
                    href={href}
                    className="inline-block text-sm xs:text-base text-gray-400 font-light tracking-wide hover:text-white transition-colors duration-300 py-1"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Social Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-6 text-white tracking-wider">
              CONNECT
            </h3>
            
            <div className="w-12 h-0.5 bg-gradient-to-r from-gray-600 to-transparent mb-6 mx-auto md:mx-0" />
            
            <div className="flex justify-center md:justify-start space-x-4">
              {[
                { 
                  icon: FaInstagram, 
                  href: "https://www.instagram.com/cine_vows_/", 
                  label: "Instagram",
                  color: "hover:text-pink-500"
                },
                { 
                  icon: FaYoutube, 
                  href: "https://youtube.com", 
                  label: "YouTube",
                  color: "hover:text-red-500"
                },
                { 
                  icon: FaFacebook, 
                  href: "https://facebook.com", 
                  label: "Facebook",
                  color: "hover:text-blue-500"
                },
                { 
                  icon: FaWhatsapp, 
                  href: "https://wa.me/918590153109", // Replace with your actual WhatsApp number
                  label: "WhatsApp",
                  color: "hover:text-green-500"
                },
                { 
                  icon: FaEnvelope, 
                  href: "mailto:Rbieeh3@gmail.com", 
                  label: "Email",
                  color: "hover:text-cyan-500"
                }
              ].map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 group"
                  onMouseEnter={handleSocialHover}
                  onMouseLeave={handleSocialLeave}
                  aria-label={label}
                >
                  <Icon 
                    size={20} 
                    className={`text-gray-400 transition-colors duration-300 ${color}`} 
                  />
                </a>
              ))}
            </div>
            
            {/* WhatsApp Quick Contact */}
            <div className="mt-6 text-center md:text-left">
              <p className="text-xs xs:text-sm text-gray-400 font-light mb-2">
                Quick contact via WhatsApp
              </p>
              <a 
                href="https://wa.me/919074463354" // Replace with your actual WhatsApp number
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-600/30 rounded-lg text-green-400 text-sm font-medium hover:bg-green-600/30 hover:border-green-500/50 transition-all duration-300"
              >
                <FaWhatsapp className="text-green-400" />
                <span>Message Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800/50 mt-8 pt-8 text-center">
          <p className="text-xs xs:text-sm text-gray-500 font-light tracking-wide">
            © {new Date().getFullYear()} CINE_VOWS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}