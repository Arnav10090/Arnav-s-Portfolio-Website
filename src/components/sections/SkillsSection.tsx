import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { skillCategories } from '@/data/skills';
import { DecorativeBackground } from '@/components/ui/DecorativeBackground';
import { cn } from '@/lib/utils';

export function SkillsSection({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="py-16 sm:py-20 md:py-24 bg-slate-50 dark:bg-background"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric layout: Content Left (85%), Visual Right (15%) */}
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Main Content (85%) */}
          <div className="w-full lg:w-[85%]">
            <h2
              id="contact-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 dark:from-blue-300 dark:via-blue-400 dark:to-blue-500 bg-clip-text text-transparent leading-tight text-center"
            >
              Technical Skills
            </h2>
            <p
              className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto text-center"
            >
              Technical expertise across the full development stack
            </p>

            {/* 3-row x 2-column grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 md:gap-8 animate-fade-up">
              {/* Row 1 Left: Programming Languages */}
              {skillCategories.languages && (
                <Card variant="base" className="p-5 sm:p-6 hover:border-primary-500/30 transition-colors">
                  <h3 className="text-lg font-semibold text-text-primary mb-4 sm:mb-5">
                    Programming Languages
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {skillCategories.languages.map((skill) => {
                      const brandColors: Record<string, string> = {
                        'JavaScript': '#F7DF1E',
                        'TypeScript': '#3178C6',
                        'Python': '#3776AB',
                        'Java': '#007396',
                        'C++': '#00599C',
                        'C': '#A8B9CC',
                      };

                      return (
                        <div
                          key={skill.name}
                          className="group flex flex-col items-center gap-3 p-3 rounded-lg transition-colors justify-center"
                        >
                          {skill.icon ? (
                            <skill.icon
                              className="w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-300"
                              style={{ color: brandColors[skill.name] || 'var(--text-secondary)' }}
                            />
                          ) : (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-elevated" />
                          )}
                          <span className="text-sm sm:text-base font-medium text-text-secondary group-hover:text-text-primary transition-colors text-center">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}

              {/* Row 1 Right: Frontend Engineering */}
              {skillCategories.frontend && (
                <Card variant="base" className="p-5 sm:p-6 hover:border-primary-500/30 transition-colors">
                  <h3 className="text-lg font-semibold text-text-primary mb-4 sm:mb-5">
                    Frontend Engineering
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {skillCategories.frontend.map((skill) => {
                      const brandColors: Record<string, string> = {
                        'React': '#61DAFB',
                        'Next.js': 'var(--text-primary)',
                        'Tailwind CSS': '#06B6D4',
                        'HTML5': '#E34F26',
                        'CSS3': '#1572B6',
                        'Figma': '#F24E1E',
                      };

                      return (
                        <div
                          key={skill.name}
                          className="group flex flex-col items-center gap-3 p-3 rounded-lg transition-colors justify-center"
                        >
                          {skill.icon ? (
                            <skill.icon
                              className="w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-300"
                              style={{ color: brandColors[skill.name] || 'var(--text-secondary)' }}
                            />
                          ) : (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-elevated" />
                          )}
                          <span className="text-sm sm:text-base font-medium text-text-secondary group-hover:text-text-primary transition-colors text-center">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}

              {/* Row 2 Left: Backend & API Engineering */}
              {skillCategories.backend && (
                <Card variant="base" className="p-5 sm:p-6 hover:border-primary-500/30 transition-colors">
                  <h3 className="text-lg font-semibold text-text-primary mb-4 sm:mb-5">
                    Backend & API Engineering
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {skillCategories.backend.map((skill) => {
                      const brandColors: Record<string, string> = {
                        'Node.js': '#339933',
                        'Express.js': 'var(--text-primary)',
                        'Django': '#092E20',
                        'RESTful API Design': '#FF6C37',
                        'Authentication & Authorization': '#8B5CF6',
                      };

                      return (
                        <div
                          key={skill.name}
                          className="group flex flex-col items-center gap-3 p-3 rounded-lg transition-colors justify-center"
                        >
                          {skill.icon ? (
                            <skill.icon
                              className="w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-300"
                              style={{ color: brandColors[skill.name] || 'var(--text-secondary)' }}
                            />
                          ) : (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-elevated" />
                          )}
                          <span className="text-sm sm:text-base font-medium text-text-secondary group-hover:text-text-primary transition-colors text-center">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}

              {/* Row 2 Right: Databases & Data Layer */}
              {skillCategories.database && (
                <Card variant="base" className="p-5 sm:p-6 hover:border-primary-500/30 transition-colors">
                  <h3 className="text-lg font-semibold text-text-primary mb-4 sm:mb-5">
                    Databases & Data Layer
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {skillCategories.database.map((skill) => {
                      const brandColors: Record<string, string> = {
                        'PostgreSQL': '#336791',
                        'MySQL': '#4479A1',
                        'MongoDB': '#47A248',
                        'ORM / ODM': '#10B981',
                      };

                      return (
                        <div
                          key={skill.name}
                          className="group flex flex-col items-center gap-3 p-3 rounded-lg transition-colors justify-center"
                        >
                          {skill.icon ? (
                            <skill.icon
                              className="w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-300"
                              style={{ color: brandColors[skill.name] || 'var(--text-secondary)' }}
                            />
                          ) : (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-elevated" />
                          )}
                          <span className="text-sm sm:text-base font-medium text-text-secondary group-hover:text-text-primary transition-colors text-center">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}

              {/* Row 3 Left: Cloud, DevOps & Delivery */}
              {skillCategories.devops && (
                <Card variant="base" className="p-5 sm:p-6 hover:border-primary-500/30 transition-colors">
                  <h3 className="text-lg font-semibold text-text-primary mb-4 sm:mb-5">
                    Cloud, DevOps & Delivery
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {skillCategories.devops.map((skill) => {
                      const brandColors: Record<string, string> = {
                        'Docker': '#2496ED',
                        'Kubernetes': '#326CE5',
                        'Git': '#F05032',
                        'GitHub Actions': '#2088FF',
                        'CI/CD Pipelines': '#FF6C37',
                        'Postman': '#FF6C37',
                      };

                      return (
                        <div
                          key={skill.name}
                          className="group flex flex-col items-center gap-3 p-3 rounded-lg transition-colors justify-center"
                        >
                          {skill.icon ? (
                            <skill.icon
                              className="w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-300"
                              style={{ color: brandColors[skill.name] || 'var(--text-secondary)' }}
                            />
                          ) : (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-elevated" />
                          )}
                          <span className="text-sm sm:text-base font-medium text-text-secondary group-hover:text-text-primary transition-colors text-center">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}

              {/* Row 3 Right: AI & Engineering Practices */}
              {skillCategories.aiPractices && (
                <Card variant="base" className="p-5 sm:p-6 hover:border-primary-500/30 transition-colors">
                  <h3 className="text-lg font-semibold text-text-primary mb-4 sm:mb-5">
                    AI & Engineering Practices
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {skillCategories.aiPractices.map((skill) => {
                      const brandColors: Record<string, string> = {
                        'AI / LLM Integration': '#F59E0B',
                        'Prompt Engineering': '#8B5CF6',
                        'System Thinking': '#3B82F6',
                        'Problem Solving': '#8B5CF6',
                        'Team Collaboration': '#10B981',
                      };

                      return (
                        <div
                          key={skill.name}
                          className="group flex flex-col items-center gap-3 p-3 rounded-lg transition-colors justify-center"
                        >
                          {skill.icon ? (
                            <skill.icon
                              className="w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-300"
                              style={{ color: brandColors[skill.name] || 'var(--text-secondary)' }}
                            />
                          ) : (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-elevated" />
                          )}
                          <span className="text-sm sm:text-base font-medium text-text-secondary group-hover:text-text-primary transition-colors text-center">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}
            </div>

            {/* Strategic Focus Area */}
            <div className="mt-12 sm:mt-16 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="relative rounded-xl overflow-hidden p-[1px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-500/20 dark:to-purple-500/20 opacity-50" />
                <div className="relative bg-white dark:bg-[#0a0e1a] border border-transparent dark:border-white/10 rounded-xl p-6 sm:p-8 text-center shadow-sm">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Strategic Focus Areas</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-4 leading-relaxed">
                    Specializing in <span className="text-blue-600 dark:text-blue-400 font-medium">AI enabled Full Stack </span> ecosystems and <span className="text-blue-600 dark:text-blue-400 font-medium">Multi AI Agentic applications</span>.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['React', 'Next.js', 'Node.js', 'LLM APIs', 'Django'].map(skill => (
                      <span key={skill} className="px-3 py-1 text-xs sm:text-sm rounded-lg bg-blue-50 dark:bg-white/5 text-blue-700 dark:text-blue-100 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Decorative Background (15%) */}
          <div className="hidden lg:block lg:w-[15%] relative min-h-[600px]">
            <DecorativeBackground position="right" variant="compact" className="!static !w-full !h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}