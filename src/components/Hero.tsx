"use client";

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lightBeam1Ref = useRef<HTMLDivElement>(null);
  const lightBeam2Ref = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);
  
  const [isMounted, setIsMounted] = useState(false);

  // Fixed particle positions to avoid hydration mismatch
  const particlePositions = [
    { left: 15, top: 20 },
    { left: 25, top: 80 },
    { left: 60, top: 10 },
    { left: 40, top: 5 },
    { left: 90, top: 25 },
    { left: 35, top: 15 },
    { left: 30, top: 65 },
    { left: 40, top: 60 },
    { left: 50, top: 75 },
    { left: 85, top: 70 },
    { left: 60, top: 35 },
    { left: 10, top: 90 }
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Create cinematic opening sequence
      const tl = gsap.timeline();

      // Start with black screen
      tl.set(heroRef.current, { backgroundColor: "#000000" })
        
        // Fade in video with dramatic scale
        .fromTo(videoRef.current, 
          { 
            scale: 1.5,
            opacity: 0,
            filter: "blur(20px) brightness(0.3)"
          },
          { 
            scale: 1,
            opacity: 1,
            filter: "blur(0px) brightness(0.7)",
            duration: 3,
            ease: "power2.inOut"
          }
        )
        
        // Light beams animation - reduced on mobile
        .fromTo([lightBeam1Ref.current, lightBeam2Ref.current],
          { 
            scaleX: 0,
            opacity: 0 
          },
          { 
            scaleX: 1,
            opacity: 0.4,
            duration: 2,
            ease: "power3.out"
          },
          "-=2"
        )

        // Particle effect - reduced on mobile
        .fromTo(particleRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.7)" },
          "-=1.5"
        )

        // Title and profile animations
        .fromTo(titleRef.current,
          { 
            opacity: 0, 
            x: -100,
            filter: "blur(20px)"
          },
          { 
            opacity: 1, 
            x: 0,
            filter: "blur(0px)",
            duration: 2,
            ease: "power3.out"
          }
        )
        .fromTo(profileRef.current,
          { 
            opacity: 0,
            x: 100,
            scale: 0.8,
            rotation: 15
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotation: 0,
            duration: 1.8,
            ease: "back.out(2)"
          },
          "-=1.5"
        )

        // Subtitle reveal
        .fromTo(subtitleRef.current,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.7)"
          },
          "-=1.5"
        )

        // Button reveal with dramatic entrance
        .fromTo(buttonRef.current,
          { 
            opacity: 0, 
            scale: 0,
            rotationY: 180
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.5,
            ease: "back.out(2)"
          },
          "-=1"
        );

      // Continuous subtle animations - reduced on mobile
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          textShadow: "0 0 20px rgba(100, 100, 100, 0.5), 0 0 40px rgba(50, 50, 50, 0.3)",
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Profile photo continuous subtle animation
      if (profileRef.current) {
        gsap.to(profileRef.current, {
          y: -5,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Floating particles animation - reduced on mobile
      if (particleRef.current) {
        const particles = Array.from(particleRef.current.children);
        // Only animate particles on larger screens
        if (window.innerWidth > 768) {
          gsap.to(particles, {
            y: -15,
            rotation: 360,
            duration: 5,
            repeat: -1,
            yoyo: true,
            stagger: 0.3,
            ease: "sine.inOut"
          });
        }
      }

      // Light beams continuous animation - reduced on mobile
      if (lightBeam1Ref.current && lightBeam2Ref.current) {
        if (window.innerWidth > 768) {
          gsap.to([lightBeam1Ref.current, lightBeam2Ref.current], {
            opacity: 0.2,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      }

    }, heroRef);

    return () => ctx.revert();
  }, [isMounted]);

  const handleButtonHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only apply hover effects on non-touch devices
    if (window.innerWidth > 768) {
      gsap.to(e.currentTarget, { 
        scale: 1.1, 
        boxShadow: "0 0 25px rgba(139, 92, 246, 0.6)",
        duration: 0.3 
      });
    }
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth > 768) {
      gsap.to(e.currentTarget, { 
        scale: 1, 
        boxShadow: "0 0 15px rgba(100, 100, 100, 0.2)",
        duration: 0.3 
      });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center text-center overflow-hidden cursor-default bg-gradient-to-br from-gray-900 via-gray-950 to-black"
    >
      {/* Background video with enhanced styling */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-0"
          // Add poster for mobile performance
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-reel.mp4" type="video/mp4" />
          <source src="/videos/hero-reel.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        
        {/* Enhanced dark gradient overlay */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/60 to-black/90"
        />
        
        {/* Dark cinematic light beams - hidden on mobile */}
        <div 
          ref={lightBeam1Ref}
          className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-gray-700/50 to-transparent transform -skew-x-12 opacity-0 hidden md:block"
        />
        <div 
          ref={lightBeam2Ref}
          className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-gray-600/40 to-transparent transform skew-x-12 opacity-0 hidden md:block"
        />

        {/* Subtle particle effect with fixed positions - reduced on mobile */}
        <div ref={particleRef} className="absolute inset-0 opacity-0 hidden sm:block">
          {particlePositions.map((position, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-500/20 rounded-full"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
              }}
            />
          ))}
        </div>

        {/* Subtle film grain effect - reduced on mobile */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9Ii4wNSIvPjwvc3ZnPg==')] hidden sm:block"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content grid - Name on left, Photo on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Side - Name and Content */}
          <div className="text-left">
            <div ref={titleRef} className="opacity-0">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-black tracking-tighter mb-4 md:mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-200 to-gray-400 drop-shadow-2xl leading-tight">
                  MUHAMMED<br />RABEEH
                </span>
              </h1>
            </div>
            
            {/* Subtitle with responsive sizing */}
            <div ref={subtitleRef} className="mb-6 md:mb-8 opacity-0">
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-400 tracking-widest uppercase mb-3 md:mb-4 leading-tight">
                CINEMATIC STORYTELLER
              </p>
              <div className="w-16 xs:w-20 sm:w-24 md:w-32 h-0.5 bg-gradient-to-r from-gray-600 to-transparent mb-3 md:mb-4" />
              <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 font-light tracking-wider leading-relaxed">
                DIRECTOR OF PHOTOGRAPHY • VIDEOGRAPHER<br className="hidden sm:block" /> • VISUAL ARTIST
              </p>
            </div>

            {/* Enhanced CTA Button with responsive sizing */}
            <div ref={buttonRef} className="opacity-0">
              <a
                href="/portfolio"
                className="group relative inline-flex items-center px-4 xs:px-6 sm:px-8 md:px-10 py-3 xs:py-4 sm:py-4 md:py-5 bg-transparent border border-gray-600 md:border-2 text-gray-200 font-bold rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-400 active:scale-95 md:hover:scale-105 shadow-2xl text-sm xs:text-base sm:text-lg md:text-xl"
                style={{
                  boxShadow: '0 0 15px rgba(100, 100, 100, 0.2)'
                }}
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                onClick={(e) => {
                  // Add tap feedback for mobile
                  if (window.innerWidth <= 768) {
                    gsap.to(e.currentTarget, {
                      scale: 0.95,
                      duration: 0.1,
                      yoyo: true,
                      repeat: 1
                    });
                  }
                }}
              >
                {/* Dark button background */}
                <span className="absolute inset-0 bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm group-hover:from-gray-700/40 group-hover:to-gray-800/40 transition-all duration-500" />
                
                {/* Subtle shine effect - hidden on mobile */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 hidden md:block" />
                
                {/* Button text and icon */}
                <span className="relative flex items-center space-x-2 xs:space-x-3 sm:space-x-4">
                  <span className="tracking-widest uppercase text-xs xs:text-sm sm:text-base md:text-lg font-light text-gray-300">
                    EXPLORE MY WORKS
                  </span>
                  <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-300 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* Right Side - Profile Photo */}
          <div 
            ref={profileRef}
            className="flex justify-center lg:justify-end items-center opacity-0"
          >
            <div className="relative group">
              {/* Main profile image container */}
              <div className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-gray-600/70 shadow-2xl backdrop-blur-sm">
                <img 
                  src="/rabeeh.jpg" // Update with your actual image path
                  alt="Muhammed Rabeeh"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
              </div>
              
              {/* Animated outer ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-gray-500/30 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Pulsing glow effect */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-gray-400/20 to-gray-300/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 animate-pulse" />
              
              {/* Floating dots around the profile */}
              <div className="absolute -top-3 -left-3 w-4 h-4 bg-gray-400/50 rounded-full animate-bounce" />
              <div className="absolute -top-3 -right-3 w-3 h-3 bg-gray-400/40 rounded-full animate-bounce delay-300" />
              <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-gray-400/40 rounded-full animate-bounce delay-500" />
              <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-gray-400/50 rounded-full animate-bounce delay-700" />
            </div>
          </div>
        </div>

        {/* Scroll indicator - hidden on very small screens */}
        <div className="absolute bottom-6 xs:bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 hidden xs:block">
          <div className="w-6 h-10 xs:w-7 xs:h-12 sm:w-8 sm:h-14 border border-gray-600/30 xs:border-2 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 xs:h-4 bg-gradient-to-b from-gray-500 to-gray-400 rounded-full mt-2 xs:mt-3 animate-bounce" />
          </div>
          <p className="text-gray-500 text-xs xs:text-sm mt-1 xs:mt-2 tracking-widest">SCROLL TO DISCOVER</p>
        </div>
      </div>

      {/* Strong vignette effect for dark cinematic look */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.9) 100%)" />
      
      {/* Additional dark overlay for mood */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
    </section>
  );
}