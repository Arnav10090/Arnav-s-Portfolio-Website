'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { trackResumeDownload } from '@/lib/analytics';
import { personalInfo } from '@/data/metadata';

export function CTASection() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = async () => {
    try {
      const response = await fetch('/api/resume');
      
      if (!response.ok) {
        throw new Error('Failed to download resume');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Arnav_Tiwari_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      
      trackResumeDownload('cta_section');
    } catch (error) {
      console.error('Error downloading resume:', error);
      const link = document.createElement('a');
      link.href = personalInfo.resumeUrl;
      link.download = 'Arnav_Tiwari_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Mouse movement tracking for gradient orb
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        section.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 sm:py-20 md:py-24 lg:py-[100px] bg-indigo-50 dark:bg-[rgba(30,41,59,0.3)]"
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
      aria-label="Call to action"
    >
      {/* Decorative gradient orb with color shift on mouse movement */}
      <div
        className="absolute pointer-events-none transition-all duration-700 ease-out"
        style={{
          width: '300px',
          height: '300px',
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
        aria-hidden="true"
      />

      {/* Centered content with responsive max-width */}
      <div
        className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          maxWidth: '100%',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.98)',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Heading - responsive font sizes */}
        <h2
          className="text-gray-900 dark:text-white mb-4 sm:mb-5 md:mb-6 px-4"
          style={{
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 700,
            lineHeight: '1.2',
            maxWidth: '900px',
            margin: '0 auto 1.5rem',
          }}
        >
          Ready to Build Something Amazing?
        </h2>

        <p
          className="text-gray-600 dark:text-white/80 mb-8 sm:mb-9 md:mb-10 px-4"
          style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            lineHeight: '1.7',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
          }}
        >
          Let's collaborate on your next project. I'm always open to discussing new opportunities and innovative ideas.
        </p>

        {/* Horizontal button layout with responsive gap and stacking */}
        <div
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToContact}
            className="w-full sm:w-auto min-h-[44px] group relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-floating"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '0ms',
            }}
          >
            Get In Touch
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={downloadResume}
            className="w-full sm:w-auto min-h-[44px] group relative transition-all duration-300 border border-gray-200 dark:border-white/10 hover:border-blue-600 hover:bg-blue-600 text-gray-900 dark:text-white hover:text-white rounded-xl bg-white/60 dark:bg-white/5"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '100ms',
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
