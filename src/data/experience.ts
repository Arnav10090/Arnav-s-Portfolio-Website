/**
 * Experience data with Hitachi internship details and achievements
 * Requirements: 2.2, 2.3, 2.4, 8.1
 */

import type { Experience } from '../lib/types';

export const experiences: Experience[] = [
  {
    id: 'hitachi-2024',
    company: 'Hitachi India Pvt Ltd',
    companyUrl: 'https://www.hitachi.com',
    role: 'Software Developer Intern',
    duration: 'July 2025 - Present',
    location: 'Nagpur, India',
    description: 'Worked on industrial-grade software systems for power and manufacturing domains.',
    achievements: [
      'Developed an optimized web application for visualizing Single Line Diagrams (SLD) to improve system analysis efficiency.',
      'Evaluated real-time system integration using IntervalZero RTX64 RTOS for running Hitachi softwares.',
      'Developed web based software solutions for Steel processing industries including Digital Permit System, Roll Coolant Tank Monitoring System, Pickling Tank Monitoring System, Truck Turnaround Monitoring System, and Intelligent Coating Quality Improvement System.',
      'Collaborated with senior engineers to analyze requirements and implement production-grade software solutions.'
    ],
    techStack: [
      'C++',
      'Real-Time Systems',
      'Industrial Software',
      'Agile'
    ],
    logo: '/images/companies/hitachi-logo.png', // Placeholder
    priority: 'high'
  },
  {
    id: 'payatu-2024',
    company: 'Payatu Security Consulting Pvt. Ltd.',
    companyUrl: 'https://payatu.com', // Placeholder
    role: 'Full Stack Developer Intern',
    duration: 'May 2025 - July 2025',
    location: 'Pune, India',
    description: 'Built and optimized full-stack applications for security analytics platforms.',
    achievements: [
      'Built responsive Next.js + SCSS interfaces, reducing page load time by 25% and improving UI maintainability.',
      'Developed and optimized MySQL-backed REST APIs, improving backend response time by 40%.',
      'Implemented 10+ interactive data visualizations to support real-time security analytics and reporting.',
      'Contributed to production-level code with 90% test coverage, following agile development practices.'
    ],
    techStack: [
      'Next.js',
      'Node.js',
      'MySQL',
      'REST APIs',
      'SCSS'
    ],
    logo: '/images/companies/payatu-logo.png', // Placeholder
    priority: 'high'
  }
];