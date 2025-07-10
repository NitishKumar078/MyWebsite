export type PostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  title: string;
  content: BlogPostContent[]; // Assuming content is an object with blocks
  tags?: string;
  created_at: string;
}

type BlogPostContent =
  | { type: "paragraph"; text: string }
  | {
      type: "points";
      heading?: string;
      items: string[];
      format: "numbered" | "bulleted";
    }
  | {
      type: "image";
      src: string;
      alt?: string;
      caption?: string;
      width?: number;
      height?: number;
    };

export interface BlogTag {
  name: string;
  created_at: string;
}

export interface BlogFilter {
  search?: string;
  searchBy?: "title" | "tags";
  tags?: string[];
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  status?: PostStatus;
  sortBy?: "newest" | "oldest" | "popular";
}
