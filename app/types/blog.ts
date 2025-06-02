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
