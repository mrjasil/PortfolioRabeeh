"use client";

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const [isMounted, setIsMounted] = useState(false);

  const experiences = [
    {
      period: "2025 - Present",
      role: "Video Producer & Digital Marketing Specialist",
      company: "TipTop Architects",
      type: "Full-time",
      description: "Leading video production for architectural projects and managing digital marketing campaigns. Creating cinematic walkthroughs, project documentaries, and promotional content.",
      achievements: ["Produced 50+ architectural videos", "Increased social media engagement by 200%", "Developed brand video strategy"]
    },
    {
      period: "2022 - 2023",
      role: "Senior Videographer & Editor",
      company: "Event Liya Wedding Company",
      type: "Contract",
      description: "Specialized in wedding cinematography and event coverage. Captured and edited memorable moments for 40+ weddings with cinematic storytelling approach.",
      achievements: ["Shot 40+ wedding events", "Implemented drone cinematography", "Created signature wedding film style"]
    },
    {
      period: "2022 - Present",
      role: "Freelance Video Producer",
      company: "Self-Employed",
      type: "Freelance",
      description: "Providing end-to-end video production services for various clients including corporate, events, and creative projects. 3+ years of freelance experience.",
      achievements: ["150+ projects completed", "95% client satisfaction rate", "Expert in Adobe Creative Suite"]
    }
  ];

  const stats = [
    { number: "3+", label: "Years Experience", suffix: "" },
    { number: "150+", label: "Projects Completed", suffix: "" },
    { number: "40+", label: "Weddings Captured", suffix: "" },
    { number: "20+", label: "Architectural Videos", suffix: "" }
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
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Timeline animation
      gsap.fromTo(timelineRef.current?.children || [],
        {
          opacity: 0,
          y: 60
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

      // Stats animation
      gsap.fromTo(statsRef.current?.children || [],
        {
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
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
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 xs:px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-gray-900 via-black to-gray-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Animated light spots - smaller on mobile */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-blue-500/5 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-purple-500/5 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl lg:max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 
            ref={titleRef}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 sm:mb-6 opacity-0"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 drop-shadow-2xl">
              PROFESSIONAL JOURNEY
            </span>
          </h2>
          
          <div className="w-20 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-4 sm:mb-6" />
          
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-400 font-light tracking-wide max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed">
            3+ years of crafting visual stories across weddings, architecture, and corporate projects. 
            Currently shaping digital narratives at TipTop Architects.
          </p>
        </div>

        {/* Stats Section - Improved mobile spacing */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className="text-center p-4 sm:p-5 md:p-6 bg-gray-800/20 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl hover:border-gray-600/50 transition-all duration-500 group"
            >
              <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium text-xs xs:text-sm sm:text-base tracking-wide leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Experience Timeline - Improved mobile layout */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line - hidden on small screens */}
          <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700 transform md:-translate-x-1/2 hidden sm:block" />
          
          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp) => (
              <div 
                key={`${exp.period}-${exp.role}`}
                className={`relative flex flex-col sm:flex-row ${
                  exp.period === "2025 - Present" ? 'sm:flex-row-reverse' : ''
                } gap-4 sm:gap-6 md:gap-8 group`}
              >
                {/* Timeline dot - visible on all screens but positioned differently */}
                <div className="absolute left-3 sm:left-4 md:left-1/2 top-6 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full border-2 sm:border-3 md:border-4 border-gray-900 transform md:-translate-x-1/2 z-10" />
                
                {/* Content Card - Improved mobile margins */}
                <div className="flex-1 sm:w-5/12 ml-10 sm:ml-12 md:ml-0">
                  <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:border-gray-600/50 transition-all duration-500 group-hover:transform group-hover:scale-[1.02] sm:group-hover:scale-105">
                    {/* Period badge */}
                    <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-gray-700/50 border border-gray-600/50 rounded-full mb-3 sm:mb-4">
                      <span className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide">
                        {exp.period}
                      </span>
                    </div>

                    {/* Role and Company */}
                    <h3 className="text-lg xs:text-xl sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 tracking-wide leading-tight">
                      {exp.role}
                    </h3>
                    
                    <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3 mb-3 sm:mb-4">
                      <p className="text-cyan-300 font-medium text-base sm:text-lg tracking-wide">
                        {exp.company}
                      </p>
                      <span className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300 w-fit">
                        {exp.type}
                      </span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-400 font-light leading-relaxed text-sm xs:text-base mb-3 sm:mb-4">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-1 sm:space-y-2">
                      {exp.achievements.map((achievement) => (
                        <div key={achievement} className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full flex-shrink-0" />
                          <span className="text-gray-300 text-xs sm:text-sm font-light leading-tight">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden sm:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Focus - Improved mobile styling */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20">
          <div className="inline-block bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 max-w-full sm:max-w-2xl">
            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 tracking-wide">
              Current Focus
            </h3>
            <p className="text-gray-300 font-light leading-relaxed text-sm xs:text-base sm:text-lg">
              Currently dedicated to creating architectural cinematography that bridges the gap between 
              design and emotion at TipTop Architects, while continuing freelance projects that tell 
              compelling human stories.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
}