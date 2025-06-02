import { StaticImageData } from "next/image";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  technologies: string[];
  category: string[];
  demoUrl?: string;
  githubUrl: string;
}

export interface technologies {
  id: string;
  title: string;
  image?: string;
  toUrl: string;
}

export interface Topic {
  id: string;
  title: string;
  topic_contents?: topic_contents[];
  // content?: string;
}

export interface topic_contents {
  sub_heading: string;
  content: string;
}

interface Section {
  sectionTitle: string;
  topics: Topic[];
}

export interface TutorialData {
  sections: Section[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  readTime: number;
  category: string;
  date: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}
