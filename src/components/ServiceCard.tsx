"use client";

import { useRef } from 'react';

interface ServiceCardProps {
  title: string;
  desc: string;
  icon: string;
  color: string;
  features: string[];
}

export default function ServiceCard({ title, desc, icon, color, features }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    if (cardRef.current && window.innerWidth > 768) {
      cardRef.current.style.transform = 'translateY(-10px) scale(1.02)';
    }
  };

  const handleLeave = () => {
    if (cardRef.current && window.innerWidth > 768) {
      cardRef.current.style.transform = 'translateY(0) scale(1)';
    }
  };

  const handleClick = () => {
    // Mobile tap feedback
    if (window.innerWidth <= 768) {
      if (cardRef.current) {
        cardRef.current.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (cardRef.current) {
            cardRef.current.style.transform = 'scale(1)';
          }
        }, 150);
      }
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-gray-800/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:border-gray-600/50 cursor-pointer"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      style={{
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${color}/20 border ${color.replace('from-', 'border-').replace('to-', '/30')} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500`}>
        <span className="text-2xl sm:text-3xl">{icon}</span>
      </div>

      {/* Content */}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 tracking-wide group-hover:text-gray-200 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base mb-4 sm:mb-6">
        {desc}
      </p>

      {/* Features List */}
      <div className="space-y-2">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-3">
            <div className={`w-2 h-2 bg-gradient-to-r ${color} rounded-full flex-shrink-0`} />
            <span className="text-gray-300 text-xs sm:text-sm font-light">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

      {/* Corner Accents */}
      <div className="absolute top-4 left-4 w-2 h-2 border-t-2 border-l-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
      <div className="absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300" />
      <div className="absolute bottom-4 left-4 w-2 h-2 border-b-2 border-l-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-400" />
      <div className="absolute bottom-4 right-4 w-2 h-2 border-b-2 border-r-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-500" />
    </div>
  );
}