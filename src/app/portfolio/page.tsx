"use client";

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import VideoGallery from "@/components/VideoGallery";
import PhotoGallery from "@/components/PhotoGallery";

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('videos');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Main timeline for portfolio section
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
          filter: "blur(10px)"
        },
        { 
          opacity: 1, 
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out"
        }
      )
      // Subtitle animation
      .fromTo(subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.2)"
        },
        "-=0.5"
      )
      // Tabs animation
      .fromTo(tabsRef.current,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        },
        "-=0.3"
      );

      // Continuous glow animation for title
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          textShadow: "0 0 20px rgba(100, 100, 100, 0.5), 0 0 40px rgba(50, 50, 50, 0.3)",
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Add tab switch animation
    gsap.to(`.tab-content`, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        setTimeout(() => {
          gsap.to(`.tab-content`, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }, 100);
      }
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black min-h-screen"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 md:top-32 left-2 md:left-5 w-1 h-1 md:w-2 md:h-2 bg-gray-500 rounded-full animate-pulse" />
        <div className="absolute top-40 md:top-60 right-4 md:right-16 w-1 h-1 bg-gray-400 rounded-full animate-pulse" />
        <div className="absolute bottom-32 md:bottom-40 left-1/4 w-1 h-1 bg-gray-500 rounded-full animate-pulse" />
        <div className="absolute bottom-20 md:bottom-28 right-1/4 w-1 h-1 md:w-2 md:h-2 bg-gray-400 rounded-full animate-pulse" />
        <div className="absolute top-32 md:top-44 left-1/2 w-1 h-1 bg-gray-500 rounded-full animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 opacity-0"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-200 to-gray-400 drop-shadow-2xl">
              MY WORKS
            </span>
          </h1>

          {/* Divider */}
          <div className="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-6 md:mb-8" />

          <p 
            ref={subtitleRef}
            className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 opacity-0"
          >
            A curated collection of my finest cinematic work. Each project tells a unique story 
            through the lens of visual artistry and technical excellence.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div 
          ref={tabsRef}
          className="flex justify-center mb-12 md:mb-16 opacity-0"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-1 md:p-2 border border-gray-800 w-full max-w-md md:max-w-lg">
            <div className="flex space-x-1 md:space-x-2">
              {[
                { id: 'videos', label: 'Videos' },
                { id: 'photos', label: 'Photos' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold text-sm md:text-lg transition-all duration-300 flex-1 ${
                    activeTab === tab.id
                      ? 'bg-gray-800 text-gray-200 shadow-lg transform scale-105'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  <span className="hidden sm:inline">
                    {tab.id === 'videos' ? 'Cinematic Videos' : 'Photography'}
                  </span>
                  <span className="sm:hidden">
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'videos' && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300 mb-3 md:mb-4">
                  Cinematic Reels
                </h2>
                <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto" />
                <p className="text-gray-500 mt-3 md:mt-4 max-w-2xl mx-auto px-4 text-sm md:text-base">
                  Motion pictures that capture emotion, tell stories, and create lasting impressions.
                </p>
              </div>
              <VideoGallery />
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300 mb-3 md:mb-4">
                  Visual Stories
                </h2>
                <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto" />
                <p className="text-gray-500 mt-3 md:mt-4 max-w-2xl mx-auto px-4 text-sm md:text-base">
                  Frozen moments in time, each frame telling a story of its own.
                </p>
              </div>
              <PhotoGallery />
            </div>
          )}
        </div>

        {/* Portfolio Stats */}
        <div className="mt-16 md:mt-20 pt-8 md:pt-12 border-t border-gray-800">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              { number: "4K+", label: "Frames Captured" },
              { number: "120+", label: "Hours Edited" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "25+", label: "Locations" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4 md:p-6 bg-gray-900/30 backdrop-blur-sm rounded-lg md:rounded-xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:scale-105"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-200 mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm font-light tracking-wider leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16 pt-6 md:pt-8">
          <p className="text-gray-500 font-light tracking-wider text-xs md:text-sm mb-4 md:mb-6">
            READY TO CREATE SOMETHING EXTRAORDINARY?
          </p>
          <button className="group relative inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-gray-600 text-gray-200 font-semibold rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-400 hover:scale-105 w-full max-w-xs mx-auto">
            <span className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-gray-900/20 backdrop-blur-sm group-hover:from-gray-700/30 group-hover:to-gray-800/30 transition-all duration-500" />
            <span className="relative flex items-center space-x-2 md:space-x-3 justify-center w-full">
              <span className="tracking-widest uppercase text-xs md:text-sm font-light">Start Your Project</span>
              <svg className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Background vignette */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 100%)" />

      {/* Custom styles for fade animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}