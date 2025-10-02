"use client";

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function SkillsEducation() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  
  const [isMounted, setIsMounted] = useState(false);

  const skills = [
    { name: "Cinematography", level: 95, color: "from-blue-400 to-cyan-400" },
    { name: "Video Editing", level: 90, color: "from-purple-400 to-pink-400" },
    { name: "Color Grading", level: 88, color: "from-orange-400 to-red-400" },
    // { name: "Directing", level: 85, color: "from-green-400 to-emerald-400" },
    { name: "Visual Storytelling", level: 92, color: "from-yellow-400 to-orange-400" },
    { name: "Sound Design", level: 80, color: "from-indigo-400 to-purple-400" }
  ];

  const education = [
    {
      year: "2023-2024",
      degree: "Higher Secondary",
      institution: "Al-ihsan English School",
      description: "commerce"
    },
    {
      year: "2021-2023",
      degree: "PPTMYHSS",
      description: "10TH"
    },
    
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

      // Skills animation
      gsap.fromTo(skillsRef.current?.children || [],
        {
          opacity: 0,
          x: -30
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

      // Education animation
      gsap.fromTo(educationRef.current?.children || [],
        {
          opacity: 0,
          x: 30
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: educationRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate skill bars
      if (skillsRef.current) {
        const skillBars = skillsRef.current.querySelectorAll('.skill-bar-fill');
        gsap.to(skillBars, {
          width: "100%",
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        });
      }

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
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 md:mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6 opacity-0"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 drop-shadow-2xl">
              SKILLS & EDUCATION
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-6" />
          
          <p className="text-lg xs:text-xl sm:text-2xl text-gray-400 font-light tracking-wide max-w-3xl mx-auto px-4">
            Mastering the art of visual storytelling through continuous learning and technical expertise
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Skills Section */}
          <div>
            <div className="text-center mb-10">
              <h3 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-4 text-white tracking-wider">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  TECHNICAL SKILLS
                </span>
              </h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto" />
            </div>

            <div ref={skillsRef} className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-300 font-medium tracking-wide text-sm xs:text-base">
                      {skill.name}
                    </span>
                    <span className="text-gray-400 text-xs xs:text-sm font-light">
                      {skill.level}%
                    </span>
                  </div>
                  
                  <div className="relative h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/30">
                    <div 
                      className={`skill-bar-fill absolute left-0 top-0 h-full bg-gradient-to-r ${skill.color} rounded-full transform origin-left`}
                      style={{ width: '0%' }}
                    />
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Skills Tags */}
            <div className="mt-10">
              <h4 className="text-lg font-semibold text-gray-300 mb-4 text-center">Tools & Software</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Adobe Premiere Pro", "LightRoom", "Capcut", 
                  "Photoshop", "Vn", "Snapseed", "Capcut Pro"
                ].map((tool) => (
                  <span 
                    key={tool}
                    className="px-4 py-2 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-full text-gray-300 text-sm font-light tracking-wide hover:border-gray-500/50 transition-all duration-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <div className="text-center mb-10">
              <h3 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-4 text-white tracking-wider">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  EDUCATION
                </span>
              </h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto" />
            </div>

            <div ref={educationRef} className="space-y-8">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="group relative bg-gray-800/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-500 hover:transform hover:scale-105"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-3 top-8 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-gray-900" />
                  
                  {/* Year badge */}
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-4">
                    <span className="text-purple-300 text-sm font-medium tracking-wide">
                      {edu.year}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2 tracking-wide">
                    {edu.degree}
                  </h4>
                  
                  <p className="text-cyan-300 font-medium mb-3 text-lg tracking-wide">
                    {edu.institution}
                  </p>
                  
                  <p className="text-gray-400 font-light leading-relaxed text-sm xs:text-base">
                    {edu.description}
                  </p>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>

            {/* Certifications */}
            {/* <div className="mt-10">
              <h4 className="text-lg font-semibold text-gray-300 mb-4 text-center">Certifications</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Advanced Color Grading Masterclass",
                  "Cinematic Lighting Techniques",
                  "Digital Film Production",
                  "Sound Design for Film"
                ].map((cert) => (
                  <div 
                    key={cert}
                    className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <span className="text-gray-300 text-sm font-light">{cert}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
}