/**
 * Skills data with categorized skills and strategic emphasis
 * Requirements: 2.4, 8.1
 */

import type { Skill } from '../lib/types';

import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiExpress, SiDjango,
  SiPostgresql, SiMongodb, SiMysql,
  SiDocker, SiKubernetes,
  SiGit, SiGithubactions, SiPostman,
  SiHtml5, SiCss3, SiJavascript, SiSass, SiBootstrap, SiFigma
} from 'react-icons/si';
import { FaJava, FaPuzzlePiece, FaUsers, FaBrain, FaCode } from 'react-icons/fa';

export const skillCategories: Record<string, Skill[]> = {
  frontend: [
    { name: 'React', category: 'frontend', proficiency: 'expert', strategic: true, icon: SiReact },
    { name: 'Next.js', category: 'frontend', proficiency: 'expert', strategic: true, icon: SiNextdotjs },
    { name: 'TypeScript', category: 'frontend', proficiency: 'expert', strategic: true, icon: SiTypescript },
    { name: 'Tailwind CSS', category: 'frontend', proficiency: 'advanced', strategic: false, icon: SiTailwindcss },
    { name: 'HTML5', category: 'frontend', proficiency: 'expert', strategic: false, icon: SiHtml5 },
    { name: 'CSS3', category: 'frontend', proficiency: 'expert', strategic: false, icon: SiCss3 },
    { name: 'JavaScript', category: 'frontend', proficiency: 'expert', strategic: false, icon: SiJavascript },
    { name: 'Figma', category: 'frontend', proficiency: 'advanced', strategic: false, icon: SiFigma }
  ],
  backend: [
    { name: 'Node.js', category: 'backend', proficiency: 'expert', strategic: true, icon: SiNodedotjs },
    { name: 'Express.js', category: 'backend', proficiency: 'advanced', strategic: false, icon: SiExpress },
    { name: 'Django', category: 'backend', proficiency: 'intermediate', strategic: false, icon: SiDjango },
    { name: 'Java', category: 'backend', proficiency: 'intermediate', strategic: false, icon: FaJava }
  ],
  database: [
    { name: 'PostgreSQL', category: 'database', proficiency: 'expert', strategic: true, icon: SiPostgresql },
    { name: 'MongoDB', category: 'database', proficiency: 'advanced', strategic: false, icon: SiMongodb },
    { name: 'MySQL', category: 'database', proficiency: 'advanced', strategic: false, icon: SiMysql }
  ],
  enterprise: [
    { name: 'Docker', category: 'enterprise', proficiency: 'advanced', strategic: true, icon: SiDocker },
    { name: 'Kubernetes', category: 'enterprise', proficiency: 'intermediate', strategic: false, icon: SiKubernetes }
  ],
  tools: [
    { name: 'Git', category: 'tools', proficiency: 'expert', strategic: true, icon: SiGit },
    { name: 'GitHub Actions', category: 'tools', proficiency: 'advanced', strategic: false, icon: SiGithubactions },
    { name: 'Postman', category: 'tools', proficiency: 'advanced', strategic: false, icon: SiPostman }
  ],
  softSkills: [
    { name: 'Problem Solving', category: 'softSkills', proficiency: 'expert', strategic: true, icon: FaPuzzlePiece },
    { name: 'Team Collaboration', category: 'softSkills', proficiency: 'expert', strategic: true, icon: FaUsers },
    { name: 'AI / LLM Integration', category: 'softSkills', proficiency: 'advanced', strategic: true, icon: FaBrain }
  ]
};

// Flattened skills array for easy iteration
export const allSkills: Skill[] = Object.values(skillCategories).flat();

// Strategic skills for emphasis (React and .NET MVC)
export const strategicSkills: Skill[] = allSkills.filter(skill => skill.strategic);

// Skills by proficiency level
export const skillsByProficiency = {
  expert: allSkills.filter(skill => skill.proficiency === 'expert'),
  proficient: allSkills.filter(skill => skill.proficiency === 'proficient'),
  familiar: allSkills.filter(skill => skill.proficiency === 'familiar'),
  learning: allSkills.filter(skill => skill.proficiency === 'learning')
};