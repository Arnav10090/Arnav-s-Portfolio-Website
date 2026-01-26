# Portfolio Website – Single Source of Truth

This README contains ALL content required to generate and update my portfolio website.
Antigravity should read this file and apply the data to the respective files mentioned in each section.

---

## METADATA & PERSONAL INFO
Target file: src/data/metadata.ts

title: "Arnav Tiwari – Software Engineer | Full Stack, AI Systems"

description: "Software engineering student skilled in full-stack development, AI-powered applications, and scalable systems. Experienced with React, Next.js, Node.js, and cloud-native tools."

keywords:
- Arnav Tiwari
- Software Engineer
- Full Stack Developer
- Next.js Developer
- React Developer
- Node.js
- AI Applications
- LLM Engineering
- PostgreSQL
- MongoDB
- TypeScript
- IIIT Nagpur
- India

ogTitle: "Arnav Tiwari – Software Engineer & Full Stack Developer"

ogDescription: "Full Stack & AI-focused software engineer building production-ready systems using modern web technologies and cloud platforms."

personalInfo:
  role: Software Engineering Student
  location: Nagpur, India
  university: Indian Institute of Information Technology Nagpur
  degree: B.Tech in Computer Science Engineering
  graduationYear: 2026
  email: arnavt292@gmail.com
  phone: +91 83298 46328

---

## HERO SECTION
Target files:
- src/components/sections/HeroSection.tsx
- src/data/metadata.ts

valueProposition:
Software engineering student at Indian Institute of Information Technology Nagpur with expertise in full-stack web development and AI-powered systems. Currently building scalable, production-grade applications using Next.js, Node.js, and LLM integrations across real-world industry projects.

---

## ABOUT SECTION
Target file: src/components/sections/AboutSection.tsx  
Replace text inside existing <p> tags.

paragraph1:
I am a Computer Science undergraduate at the Indian Institute of Information Technology Nagpur, focused on building reliable, real-world software systems. My experience spans full-stack web development, backend engineering, and applied AI, gained through industry internships and hands-on project work.

paragraph2:
I specialize in designing scalable web applications using React, Next.js, Node.js, and modern databases, with a strong emphasis on clean architecture and performance. During my internships, I improved backend response times by up to 40%, reduced frontend load times by 25%, and contributed to production systems used in industrial and security-critical environments.

paragraph3:
As I prepare for placement season 2026, I am actively seeking opportunities where I can work on complex engineering problems, contribute to high-impact products, and continue growing as a software engineer with strong system design and AI integration skills.

---

## PROJECTS
Target file: src/data/projects.ts

projects:

- id: autopilot-ai-project-planner
  title: Autopilot – AI Powered Project Planning Platform
  description: An AI-driven platform that converts high-level ideas into detailed, execution-ready project plans.
  problem: Project planning is time-consuming and error-prone, often lacking structured risk assessment and realistic execution breakdowns.
  solution: Designed a full-stack system using a multi-agent AI architecture with Google Gemini and Groq SDK to analyze requirements, recommend tech stacks, assess risks, and generate task-level plans through RESTful orchestration.
  outcome: Delivered a production-ready system with OAuth authentication, analytics dashboard, multi-format exports, and accessibility support.
  techStack:
    - Next.js
    - TypeScript
    - Node.js
    - Express.js
    - PostgreSQL
    - Google Gemini
    - Groq SDK
    - Tailwind CSS
  featured: true

- id: ai-content-generator
  title: AI-Powered Content Generator Platform
  description: A scalable SaaS platform for fast, high-quality AI content generation.
  problem: Manual content creation workflows are slow and difficult to scale.
  solution: Built an LLM-powered system using Google Gemini API with secure authentication, subscriptions, and optimized prompts.
  outcome: Enabled 70% faster content generation and supported 10,000+ monthly AI generations.
  techStack:
    - Next.js
    - TypeScript
    - PostgreSQL
    - Drizzle ORM
    - Google Gemini API
    - Clerk
    - Razorpay
    - Tailwind CSS
  featured: true

- id: book-store-platform
  title: Book Store – Personalized Book Collection Platform
  description: A full-stack platform for managing and organizing personal book collections.
  problem: Lack of simple and secure systems for managing personalized digital book collections.
  solution: Developed RESTful APIs with JWT-based authentication and a responsive React frontend.
  outcome: Delivered a modular and secure production-style full-stack application.
  techStack:
    - React
    - Vite
    - Node.js
    - Express.js
    - MongoDB
    - JWT
    - Tailwind CSS
  featured: false

---

## EXPERIENCE
Target file: src/data/experience.ts

experience:

- id: hitachi-2024
  company: Hitachi India Pvt Ltd
  role: Software Developer Intern
  duration: 2024 – 2025
  location: Nagpur, India
  description: Worked on industrial-grade software systems for power and manufacturing domains.
  achievements:
    - Developed and optimized Single Line Diagram (SLD) modules improving system analysis efficiency.
    - Evaluated real-time system integration using IntervalZero RTX64 RTOS.
    - Contributed to large-scale industrial platforms including DPS, RCTMS, PTMS, TTMS, and ICQIS.
    - Designed modular components ensuring scalability and maintainability.
  techStack:
    - C++
    - Real-Time Systems
    - Industrial Software
    - Agile
  priority: high

- id: payatu-2024
  company: Payatu Security Consulting Pvt. Ltd.
  role: Full Stack Developer Intern
  duration: 2024
  location: Pune, India
  description: Built and optimized full-stack applications for security analytics platforms.
  achievements:
    - Reduced frontend load time by 25% using optimized Next.js components.
    - Improved backend response time by 40% through REST API optimization.
    - Implemented 10+ interactive data visualizations.
    - Maintained 90% test coverage in production code.
  techStack:
    - Next.js
    - Node.js
    - MySQL
    - REST APIs
    - SCSS
  priority: high

---

## SKILLS
Target file: src/data/skills.ts

Frontend:
- React (expert, strategic)
- Next.js (expert, strategic)
- TypeScript (expert, strategic)
- Tailwind CSS (advanced)

Backend:
- Node.js (expert, strategic)
- Express.js (advanced)
- Django (intermediate)

Database:
- PostgreSQL (expert, strategic)
- MongoDB (advanced)
- MySQL (advanced)

Enterprise / DevOps:
- Docker (advanced, strategic)
- Kubernetes (intermediate)
- Java (intermediate)

Tools:
- Git (expert, strategic)
- GitHub Actions (advanced)
- Postman (advanced)

Soft Skills / Emerging:
- Problem Solving (expert, strategic)
- Team Collaboration (expert, strategic)
- AI / LLM Integration (advanced, strategic)

---

## CONTACT
Target file: src/data/contact.ts

availability:
Available for full-time software engineering roles starting July 2026.
