export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string[];
  demoUrl?: string;
  githubUrl: string;
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
