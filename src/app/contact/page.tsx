"use client";

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Simple fade-in animation
      gsap.fromTo([titleRef.current, formRef.current, contactInfoRef.current],
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      borderColor: "rgba(255, 255, 255, 0.8)",
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      borderColor: "rgba(75, 85, 99, 0.5)",
      boxShadow: "none",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      // Using Formspree to send email directly to your inbox
      const response = await fetch('https://formspree.io/f/xjvnqgwe', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
        
        // Success animation
        if (formRef.current) {
          gsap.to(formRef.current, {
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            duration: 0.5,
            yoyo: true,
            repeat: 1
          });
        }
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      
      // Error animation
      if (formRef.current) {
        gsap.to(formRef.current, {
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          duration: 0.5,
          yoyo: true,
          repeat: 1
        });
      }
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
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
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <h1 
            ref={titleRef}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6 opacity-0"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 drop-shadow-2xl">
              GET IN TOUCH
            </span>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-6" />
          
          <p className="text-lg xs:text-xl sm:text-2xl text-gray-400 font-light tracking-wide max-w-2xl mx-auto px-4">
            Have a project in mind? Let&apso;s create something cinematic together.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 opacity-0"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full px-6 py-4 bg-gray-800/30 backdrop-blur-sm border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 font-light tracking-wide"
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full px-6 py-4 bg-gray-800/30 backdrop-blur-sm border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 font-light tracking-wide"
                  />
                </div>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  required
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="w-full px-6 py-4 bg-gray-800/30 backdrop-blur-sm border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none font-light tracking-wide"
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-2xl text-green-300 text-center">
                  ✅ Thank you! Your message has been sent successfully. I&apso;ll get back to you soon!
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-2xl text-red-300 text-center">
                  ❌ Sorry, there was an error sending your message. Please try again or email me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-8 py-4 bg-transparent border-2 border-gray-600 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-400 active:scale-95 md:hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm group-hover:from-gray-700/40 group-hover:to-gray-800/40 transition-all duration-500" />
                
                <span className="relative flex items-center justify-center space-x-3">
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="tracking-widest uppercase text-lg font-light text-gray-300">
                        Sending...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="tracking-widest uppercase text-lg font-light text-gray-300 group-hover:text-white transition-colors duration-300">
                        Send Message
                      </span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
              </button>

              <p className="text-gray-500 text-sm text-center">
                Your message will be sent directly to my email inbox
              </p>
            </form>
          </div>

          {/* Contact Information */}
          <div 
            ref={contactInfoRef}
            className="lg:col-span-1 opacity-0"
          >
            <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 h-full">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white tracking-wider">
                CONTACT INFO
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-light mb-1">Email</p>
                    <a href="mailto:Rbieeh3@gmail.com" className="text-white hover:text-gray-300 transition-colors duration-300 font-medium">
                      Rbieeh3@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-light mb-1">Phone</p>
                    <a href="tel:+918590153109" className="text-white hover:text-gray-300 transition-colors duration-300 font-medium">
                      +91 8590153109
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-light mb-1">Based In</p>
                    <p className="text-white font-medium">Kerala, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <p className="text-sm text-gray-400 font-light text-center">
                  Typically reply within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
}