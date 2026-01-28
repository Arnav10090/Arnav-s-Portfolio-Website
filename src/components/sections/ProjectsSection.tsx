'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { DecorativeBackground } from '@/components/ui/DecorativeBackground';
import { cn } from '@/lib/utils';

export const ProjectsSection: React.FC<{ id?: string }> = ({ id }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Defer animation to next frame for better performance
          rafRef.current = requestAnimationFrame(() => {
            setIsVisible(true);
          });
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="py-16 sm:py-20 md:py-24 bg-blue-50/50 dark:bg-background"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Main Content (85%) */}
          <div className="w-full lg:w-[85%]">
            <div className="text-left mb-12 sm:mb-16 md:mb-20">
              <SectionHeading
                subtitle="Problem-solving through code: Real projects with measurable impact"
                className="text-left"
                id="projects-heading"
              >
                Personal Projects
              </SectionHeading>
            </div>

            {/* Grid layout for all projects - 2 columns on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10" role="list">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={cn(
                    "transition-all duration-600",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                  role="listitem"
                >
                  <ProjectCard project={project} isFeatured={false} />
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Decorative Background (15%) */}
          <div className="hidden lg:block lg:w-[15%] relative min-h-[600px]">
            <DecorativeBackground position="right" variant="compact" className="!static !w-full !h-full" />
          </div>
        </div>

        {/* Call to Action - responsive spacing */}
        <div
          className={cn(
            "text-center mt-16 sm:mt-20 md:mt-24 transition-all duration-600",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{
            transitionDelay: `${projects.length * 150}ms`,
          }}
        >
          <p className="text-lg sm:text-xl text-text-secondary mb-6 sm:mb-8">
            Want to see more of my work or discuss a project?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="https://github.com/Arnav10090"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 sm:h-12 min-h-[44px] px-5 sm:px-6 rounded-xl font-medium transition-all duration-300 ease-out bg-transparent text-text-secondary border border-border hover:bg-surface hover:border-primary-500/30 hover:text-text-primary"
              aria-label="View all projects on GitHub"
            >
              View All Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center h-11 sm:h-12 min-h-[44px] px-5 sm:px-6 rounded-xl font-medium transition-all duration-300 ease-out bg-primary-600 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-600/20"
              aria-label="Navigate to contact section"
            >
              Let's Work Together
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};