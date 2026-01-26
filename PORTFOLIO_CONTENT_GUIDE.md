# Portfolio Website Content Generation Guide

This file outlines the sections of your portfolio website. Provide this entire file to ChatGPT along with your **Resume (text or PDF content)** to generate the specific data needed for your website.

---

## Instructions for ChatGPT

"I am building a portfolio website with the following structure. Please use my attached resume to generate the content for each section below in the specified JSON/TypeScript format. Keep the tone professional, impactful, and tailored to a software engineering role."

---

## 1. Metadata & Personal Info
**File:** \`src/data/metadata.ts\`
**Goal:** SEO and core personal details.

**Required Fields:**
- `title`: SEO Title (e.g., "Name - Role | Tech Stack")
- `description`: Short bio for search engines (150-160 chars).
- `keywords`: List of 10-15 relevant keywords (skills, roles, location).
- `ogTitle`: OpenGraph title (social media sharing).
- `ogDescription`: OpenGraph description.
- `personalInfo`:
    - `role`: Your primary title (e.g., "Full Stack Developer").
    - `location`: City, Country.
    - `university`: Your university name.
    - `degree`: Your degree (e.g., "B.Tech in Computer Science").
    - `graduationYear`: Year.
    - `email`: Your professional email.
    - `phone`: Your phone number (format: +91 XXXXX XXXXX).

---

## 2. Hero Section
**File:** \`src/components/sections/HeroSection.tsx\` & \`src/data/metadata.ts\`
**Goal:** First impression.

**Content to Generate:**
- A **Value Proposition** paragraph (2-3 sentences).
    - *Format:* "Software Engineering student at **[University]** with expertise in **[Skill 1]** and **[Skill 2]**. Currently building **[Project/System]** at **[Company/Internship]**."
    - *Tone:* Confident, concise, highlighting your current status and main expertise.

---

## 3. About Section
**File:** \`src/components/sections/AboutSection.tsx\`
**Goal:** Professional narrative.

**Content to Generate:**
- **Paragraph 1 (Intro):** Who you are, education, and current role.
- **Paragraph 2 (Expertise):** Technical focus, problem-solving approach, and key achievements (e.g., specific stats from internship).
- **Paragraph 3 (Looking Ahead):** Career goals (e.g., placement season 2026), passion for growth.

*Note: This text is currently hardcoded in `AboutSection.tsx`. You will need to replace the text inside the `<p>` tags.*

---

## 4. Projects Section
**File:** \`src/data/projects.ts\`
**Goal:** Showcase technical capability using the STAR (Situation, Task, Action, Result) method.

**Required Data Structure (Array of Objects):**
For each top project (3-4 recommended):
```typescript
{
  id: 'project-slug-id',
  title: 'Project Name',
  description: 'One-line high-level summary.',
  problem: 'The specific problem this project solves (Situation/Task).',
  solution: 'How you solved it (Action) - mention specific features and architecture.',
  outcome: 'The results (Result) - quantitative metrics, user count, or skills gained.',
  techStack: ['React', 'Node.js', '...'], // List 5-8 relevant technologies
  githubUrl: 'https://github.com/yourusername/project',
  liveUrl: 'https://project-demo.com', // Optional
  featured: true // Set true for top 2 projects
}
```

---

## 5. Experience Section
**File:** \`src/data/experience.ts\`
**Goal:** Professional work history.

**Required Data Structure (Array of Objects):**
For each role (Internships, Freelance, Core Team positions):
```typescript
{
  id: 'company-year',
  company: 'Company Name',
  companyUrl: 'https://company.com',
  role: 'Your Job Title',
  duration: 'Start Date - End Date',
  location: 'City, Country',
  description: 'One sentence overview of your role.',
  achievements: [
    'Bullet point 1: Action verb + Quantifiable result (e.g., Reduced latency by 40%)',
    'Bullet point 2: Specific technology used + Outcome',
    'Bullet point 3: Leadership or collaboration achievement',
    'Bullet point 4: Additional technical win'
  ],
  techStack: ['Skill 1', 'Skill 2', '...'],
  priority: 'high' // 'high' for most relevant, 'medium' for others
}
```

---

## 6. Skills Section
**File:** \`src/data/skills.ts\`
**Goal:** Categorized technical proficiency.

**Categories to Fill:**
- **Frontend:** (e.g., React, Next.js, Tailwind, TypeScript)
- **Backend:** (e.g., Node.js, Express, .NET, Python)
- **Database:** (e.g., MongoDB, PostgreSQL, SQL Server)
- **Enterprise:** (e.g., Java, C#, Docker, Kubernetes - *if applicable*)
- **Tools:** (e.g., Git, VS Code, Postman)
- **Soft Skills/Emerging:** (e.g., Leadership, Teamwork, AI/ML)

*Mark your strongest skills as `proficiency: 'expert'` and `strategic: true`.*

---

## 7. Contact Info
**File:** \`src/data/contact.ts\`
**Goal:** Availability and contact channels.

**Content to Generate:**
- `availability`: A clear statement of when you are available (e.g., "Available for full-time roles starting July 2026").
