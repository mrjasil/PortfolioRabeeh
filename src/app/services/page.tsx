"use client";

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ServiceCard from "@/components/ServiceCard";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [isMounted, setIsMounted] = useState(false);

  const services = [
    { 
      title: "Event Videography", 
      desc: "Capture weddings, parties & events with cinematic visuals that tell your unique story through motion and emotion.",
      icon: "🎬",
      color: "from-blue-500 to-cyan-500",
      features: ["4K Resolution", "Multi-camera Setup", "Professional Audio", "Same-day Highlights"]
    },
    { 
      title: "Commercial Shoots", 
      desc: "Professional ads, product videos, and brand promos that elevate your business and captivate your audience.",
      icon: "💼",
      color: "from-purple-500 to-pink-500",
      features: ["Brand Storytelling", "Product Demos", "Corporate Videos", "Social Media Ads"]
    },
    { 
      title: "Drone Footage", 
      desc: "Aerial shots for cinematic perspectives that add epic scale and breathtaking views to your projects.",
      icon: "🚁",
      color: "from-green-500 to-emerald-500",
      features: ["Aerial Cinematography", "Property Showcases", "Event Coverage", "Location Scouting"]
    },
    { 
      title: "Photo Sessions", 
      desc: "Creative portrait & event photography that freezes moments in time with artistic composition and lighting.",
      icon: "📸",
      color: "from-orange-500 to-red-500",
      features: ["Portrait Photography", "Event Coverage", "Product Shots", "Creative Compositions"]
    },
    { 
      title: "Video Editing", 
      desc: "Professional post-production with color grading, sound design, and visual effects to polish your footage.",
      icon: "✂️",
      color: "from-indigo-500 to-purple-500",
      features: ["Color Grading", "Sound Design", "Motion Graphics", "Quick Turnaround"]
    },
    { 
      title: "Live Streaming", 
      desc: "High-quality multi-camera live streaming for events, conferences, and special occasions.",
      icon: "📡",
      color: "from-yellow-500 to-orange-500",
      features: ["Multi-camera Setup", "Real-time Editing", "Platform Integration", "Professional Audio"]
    }
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Grid items animation
      gsap.fromTo(gridRef.current?.children || [],
        {
          opacity: 0,
          y: 60,
          rotationY: 15
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

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
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 sm:w-48 sm:h-48 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6 opacity-0"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 drop-shadow-2xl">
              CREATIVE SERVICES
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-6" />
          
          <p className="text-lg xs:text-xl sm:text-2xl text-gray-400 font-light tracking-wide max-w-3xl mx-auto px-4 leading-relaxed">
            Professional video production and photography services tailored to bring your vision to life 
            with cinematic excellence and creative storytelling.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              desc={service.desc}
              icon={service.icon}
              color={service.color}
              features={service.features}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 md:mt-20">
          <div className="inline-block bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 md:p-8 max-w-2xl">
            <h3 className="text-xl xs:text-2xl font-bold text-white mb-4 tracking-wide">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-300 font-light leading-relaxed text-sm xs:text-base mb-6">
              Let's discuss how we can bring your vision to life with professional video production and photography services.
            </p>
            <button className="group relative px-8 py-4 bg-transparent border-2 border-gray-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-400 active:scale-95 md:hover:scale-105">
              <span className="absolute inset-0 bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm group-hover:from-gray-700/40 group-hover:to-gray-800/40 transition-all duration-500" />
              <span className="relative flex items-center justify-center space-x-3">
                <span className="tracking-widest uppercase text-lg font-light text-gray-300 group-hover:text-white transition-colors duration-300">
                  Get Free Consultation
                </span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
}