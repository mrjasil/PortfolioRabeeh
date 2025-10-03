"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from "next/image";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Main timeline for about section
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
      // Text animation
      .fromTo(textRef.current,
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
      // Image animation
      .fromTo(imageRef.current,
        {
          opacity: 0,
          scale: 0.8,
          rotationY: -30
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "back.out(1.7)"
        },
        "-=0.3"
      );

      // Stats animation with proper null check
      if (statsRef.current && statsRef.current.children) {
        tl.fromTo(statsRef.current.children,
          {
            opacity: 0,
            y: 20,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
          },
          "-=0.5"
        );
      }

      // Continuous floating animation for image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-6 max-w-6xl mx-auto text-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950"
    >
      {/* Background decorative elements */} 
       <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-gray-400 rounded-full animate-pulse" />
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-gray-500 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
      </div>

      <div className="relative z-10"> 
        {/* Section Title */}
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-black mb-8 opacity-0"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-200 to-gray-400 drop-shadow-2xl">
            ABOUT ME
          </span>
        </h1>

        {/* Divider */}
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-950 to-transparent mx-auto mb-12" />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-left">
            <p 
              ref={textRef}
              className="text-gray-300 leading-relaxed text-lg md:text-xl mb-8 opacity-0"
            >
              Hi, I&apos;m <span className="text-gray-200 font-semibold">Rabeeh</span>, a passionate 
              <span className="text-gray-200 font-semibold"> cinematic storyteller</span> and visual artist 
              dedicated to capturing timeless stories through my lens. With years of experience in the film 
              industry, I specialize in creating emotionally resonant visuals that transcend the ordinary.
            </p>

            <p className="text-gray-400 leading-relaxed text-lg mb-8">
              Whether it&apso;s <span className="text-gray-300">weddings</span>, <span className="text-gray-300">commercial shoots</span>, 
              or <span className="text-gray-300">creative projects</span>, I approach each frame with an artist&apso;s eye and a 
              director&apso;s vision. My work is characterized by dramatic lighting, compelling composition, 
              and a deep understanding of visual narrative.
            </p>

            <p className="text-gray-400 leading-relaxed text-lg">
              I believe that every moment has a story worth telling, and my mission is to transform 
              those moments into <span className="text-gray-300">cinematic experiences</span> that connect emotionally and last forever.
            </p>
          </div>

          {/* Image */}
          <div 
            ref={imageRef}
            className="relative opacity-0"
          >
            <div className="relative group">
              <Image
                src="/work.png"
                alt="Me working on cinematic project"
                width={500}
                height={700}
                className="mx-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Image overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl group-hover:from-black/10 transition-all duration-500" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl border border-gray-700/50 group-hover:border-gray-500/70 transition-all duration-500" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 transform rotate-3">
              <span className="text-gray-300 text-sm font-light tracking-wider">DIRECTOR&apso;S VIEW</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {[
            { number: "150+", label: "Projects Completed" },
            { number: "3+", label: "Years Experience" },
            { number: "50+", label: "Happy Clients" },
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:scale-105 opacity-0"
            >
              <div className="text-3xl md:text-4xl font-bold text-gray-200 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm font-light tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Signature */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="text-gray-500 font-light tracking-widest text-sm">
            CRAFTING VISUAL NARRATIVES SINCE 2022
          </div>
        </div>
      </div>

      {/* Background vignette */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 100%)" />
    </section>
  );
}