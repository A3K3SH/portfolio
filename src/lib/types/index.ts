import { ReactNode } from 'react';

export type Direction = 'up' | 'down';

export enum Sections {
  Home = 0,
  Projects = 1,  // New section
  About = 2,     // New section
  Experience = 3, // Moved down
  Contact = 4,    // Moved down
}

export type Section = {
  content: ReactNode;
  title: string;
};

export type SectionContextType = {
  sectionIndex: number;
  subsectionIndex: number;
  setSectionIndex: (index: number) => void;
  navigationDirection: Direction;
  setSubsectionIndex: (index: number) => void;
  isTransitioning: boolean;
};

export type SectionColors = {
  background: string;
  primary: string;
  secondary: string;
  accent: string;
};

export type SectionWithIndex = {
  title: string;
  index: number;
};

export type PostMetadata = {
  title: string;
  description: string;
  date: string | Date;
  cover: string;
  slug: string;
  readingTime: string;
  keywords: string[];
};

export type PostContent = {
  content: string;
  metadata: PostMetadata;
};

export type Project = {
  cover: string;
  title: string;
  subject: string;
  description: string;
  link: string; 
  demoLink?: string;
  techStack: string[];
};

export type SkillItem = {
  name: string;
  icon?: string;
};

export type SkillCategory = {
  category: string;
  items: SkillItem[];
};