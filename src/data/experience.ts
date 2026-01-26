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
    duration: '2024 – 2025',
    location: 'Nagpur, India',
    description: 'Worked on industrial-grade software systems for power and manufacturing domains.',
    achievements: [
      'Developed and optimized Single Line Diagram (SLD) modules improving system analysis efficiency.',
      'Evaluated real-time system integration using IntervalZero RTX64 RTOS.',
      'Contributed to large-scale industrial platforms including DPS, RCTMS, PTMS, TTMS, and ICQIS.',
      'Designed modular components ensuring scalability and maintainability.'
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
    duration: '2024',
    location: 'Pune, India',
    description: 'Built and optimized full-stack applications for security analytics platforms.',
    achievements: [
      'Reduced frontend load time by 25% using optimized Next.js components.',
      'Improved backend response time by 40% through REST API optimization.',
      'Implemented 10+ interactive data visualizations.',
      'Maintained 90% test coverage in production code.'
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