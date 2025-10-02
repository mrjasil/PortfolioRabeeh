"use client";

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function PhotoGallery() {
  const photos = ["/archpic.jpg", "/archpic1.jpg", "/archpic2.jpg","bridepic.jpg","bridepic1.jpg","weds.jpg"];
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Title animation
      tl.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.7)"
        }
      );

      // Staggered photo animations
      tl.fromTo(galleryRef.current?.children || [],
        {
          opacity: 0,
          y: 80,
          rotationY: 15,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.out"
        },
        "-=0.8"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth > 768) {
      gsap.to(e.currentTarget, {
        scale: 1.05,
        y: -10,
        rotationY: 5,
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Highlight effect
      gsap.to(e.currentTarget.querySelector('.image-overlay'), {
        opacity: 0,
        duration: 0.3
      });
    }
  };

  const handleImageLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth > 768) {
      gsap.to(e.currentTarget, {
        scale: 1,
        y: 0,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      
      gsap.to(e.currentTarget.querySelector('.image-overlay'), {
        opacity: 0.3,
        duration: 0.3
      });
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Mobile tap feedback
    if (window.innerWidth <= 768) {
      gsap.to(e.currentTarget, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Animated light spots */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-20">
          <h2 
            ref={titleRef}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 opacity-0"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 drop-shadow-2xl">
              VISUAL PORTFOLIO
            </span>
          </h2>
          
          <div className="w-20 xs:w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-6" />
          
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-400 font-light tracking-wider max-w-2xl mx-auto px-4">
            Capturing moments through the lens of cinematic artistry and visual storytelling
          </p>
        </div>

        {/* Photo Gallery Grid */}
        <div 
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 lg:gap-10 px-2"
        >
          {photos.map((src, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/5] sm:aspect-[4`/4] rounded-2xl sm:rounded-2xl overflow-hidden transform-gpu cursor-pointer bg-gray-800 shadow-2xl"
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
              onClick={handleImageClick}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Main Image */}
              <img
                src={src}
                alt={`Cinematic Shot ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-cover transform-gpu group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="image-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-30 transition-opacity duration-500" />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              {/* Border Glow */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-gray-700/50 group-hover:border-gray-400/30 transition-all duration-500" />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 xs:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-white">
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    SHOT {String(idx + 1).padStart(2, '0')}
                  </h3>
                  <p className="text-gray-300 text-sm xs:text-base opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    Cinematic Photography
                  </p>
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-2 h-2 border-t-2 border-l-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300" />
              <div className="absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-400" />
              <div className="absolute bottom-4 left-4 w-2 h-2 border-b-2 border-l-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-500" />
              <div className="absolute bottom-4 right-4 w-2 h-2 border-b-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-600" />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12 md:mt-20">
          <button className="group relative inline-flex items-center px-6 xs:px-8 sm:px-12 py-3 xs:py-4 bg-transparent border border-gray-600 text-gray-200 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-400 active:scale-95 md:hover:scale-105">
            <span className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-gray-900/20 backdrop-blur-sm group-hover:from-gray-700/30 group-hover:to-gray-800/30 transition-all duration-500" />
            <span className="relative flex items-center space-x-3">
              <span className="tracking-widest uppercase text-sm xs:text-base font-light text-gray-300">
                View Full Portfolio
              </span>
              <svg className="w-4 h-4 xs:w-5 xs:h-5 transform group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-300 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Section Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
}