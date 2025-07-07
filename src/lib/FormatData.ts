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

export interface TimelineItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

// ---------------- blog post interface ----------------

export type PostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author_id: string;
  status: PostStatus;
  published_at?: string;
  created_at: string;
  updated_at: string;
  view_count: number;
  tags?: BlogTag[];
}

export interface BlogTag {
  id: string;
  name: string;
  created_at: string;
}

export interface BlogFilter {
  search?: string;
  tags?: string[];
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  status?: PostStatus;
  sortBy?: "newest" | "oldest" | "popular";
}
