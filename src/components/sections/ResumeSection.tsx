'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { resumeDownload } from '@/data/contact';
import { trackResumeDownload } from '@/lib/analytics';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { DecorativeBackground } from '@/components/ui/DecorativeBackground';

/**
 * Resume Section Component
 * Requirements: 3.1, 3.2, 3.3, 3.5
 */
export function ResumeSection({ id }: { id?: string }) {
  // Initialize scroll animations
  useScrollAnimation();

  const handleResumeDownload = async () => {
    try {
      const response = await fetch('/api/resume');
      if (!response.ok) throw new Error('Failed to download resume');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = resumeDownload.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      trackResumeDownload('resume_section');
    } catch (error) {
      console.error('Error downloading resume:', error);
      const link = document.createElement('a');
      link.href = resumeDownload.url;
      link.download = resumeDownload.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      trackResumeDownload('resume_section');
    }
  };

  const [formattedDate, setFormattedDate] = React.useState<string>('');

  React.useEffect(() => {
    const date = new Date(resumeDownload.lastUpdated);
    setFormattedDate(date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);



  return (
    <section id={id} className="py-20 sm:py-24 md:py-28 lg:py-30 bg-white dark:bg-background relative" aria-labelledby="resume-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Left side: Decorative Background (30%) */}
          <div className="hidden lg:block lg:w-[30%] relative min-h-[600px]">
            <DecorativeBackground position="left" variant="sidebar" className="!static !w-full !h-full" />
          </div>

          {/* Right side: Resume Content (70%) */}
          <div className="w-full lg:w-[70%] flex flex-col items-center lg:items-start justify-center">
            {/* Center content within this column for better visual balance if needed, or keep top aligned */}
            <div className="max-w-xl w-full">
              <div className="flex flex-col items-center lg:items-start">

                {/* Section heading */}
                <SectionHeading
                  subtitle="Download my complete professional resume"
                  id="resume-heading"
                  className="!text-3xl sm:!text-4xl md:!text-5xl !font-bold text-center lg:text-left mb-8"
                >
                  Resume
                </SectionHeading>

                {/* Resume card */}
                <div className="w-full" data-animate="fade-up">
                  <div className="group relative bg-white dark:bg-[rgba(30,41,59,0.5)] backdrop-blur-xl border border-gray-200 dark:border-[rgba(255,255,255,0.1)] rounded-lg p-6 sm:p-8 flex flex-col items-center text-center shadow-floating transition-all duration-500 hover:translate-y-[-4px] hover:shadow-[0_24px_30px_-5px_rgba(0,0,0,0.15),0_12px_12px_-5px_rgba(0,0,0,0.06)] animate-scale-in">
                    {/* Document icon */}
                    <div className="w-16 h-16 bg-blue-50 dark:bg-primary-600/20 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-primary-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:animate-bounce-subtle">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-text-primary mb-2">{resumeDownload.filename}</h3>

                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleResumeDownload}
                      className="w-full sm:w-auto min-w-[200px] min-h-[48px] bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 flex items-center justify-center rounded-xl transition-all duration-300 transform hover:-translate-y-0.5"
                      aria-label="Download resume as PDF"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download Resume</span>
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}