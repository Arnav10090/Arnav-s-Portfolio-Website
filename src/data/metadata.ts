/**
 * SEO metadata and site configuration
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 */

import type { SEOMetadata } from '../lib/types';

export const siteMetadata: SEOMetadata = {
  title: 'Arnav Tiwari – Software Engineer | Full Stack, AI Systems',
  description: 'Software engineering student skilled in full-stack development, AI-powered applications, and scalable systems. Experienced with React, Next.js, Node.js, and cloud-native tools.',
  keywords: [
    'Arnav Tiwari',
    'Software Engineer',
    'Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'Node.js',
    'AI Applications',
    'LLM Engineering',
    'PostgreSQL',
    'MongoDB',
    'TypeScript',
    'IIIT Nagpur',
    'India'
  ],
  ogTitle: 'Arnav Tiwari – Software Engineer & Full Stack Developer',
  ogDescription: 'Full Stack & AI-focused software engineer building production-ready systems using modern web technologies and cloud platforms.',
  ogImage: '/images/og-image.jpg',
  canonicalUrl: 'https://arnavtiwari.dev'
};

/**
 * Structured data (JSON-LD) for person schema
 * Requirements: 7.3
 */
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arnav Tiwari',
  url: 'https://arnavtiwari.dev',
  image: 'https://arnavtiwari.dev/images/og-image.jpg',
  jobTitle: 'Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Hitachi',
    url: 'https://www.hitachi.com'
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Indian Institute of Information Technology Nagpur',
    url: 'https://iiitn.ac.in'
  },
  knowsAbout: [
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'AI Systems',
    'PostgreSQL',
    'Full Stack Development',
    'System Design'
  ],
  sameAs: [
    'https://linkedin.com/in/arnavtiwari',
    'https://github.com/arnavtiwari',
    'https://twitter.com/arnavtiwari'
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nagpur',
    addressCountry: 'IN'
  }
};

export const personalInfo = {
  name: 'Arnav Tiwari',
  role: 'Software Engineering Student',
  location: 'Nagpur, India',
  university: 'Indian Institute of Information Technology Nagpur',
  degree: 'B.Tech in Computer Science Engineering',
  graduationYear: '2026',
  email: 'arnavt292@gmail.com',
  phone: '+91 83298 46328',
  website: 'https://arnavtiwari.dev',
  resumeUrl: '/resume/Arnav_Tiwari_Resume.pdf'
};

export const socialLinks = {
  linkedin: 'https://linkedin.com/in/arnavtiwari',
  github: 'https://github.com/arnavtiwari',
  twitter: 'https://twitter.com/arnavtiwari',
  email: 'mailto:arnavt292@gmail.com'
};