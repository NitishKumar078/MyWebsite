// filepath: /e:/git_repo/MyWebsite/src/lib/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  status: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  view_count: number;
}

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<BlogPost, "id" | "created_at" | "updated_at">>;
      };
    };
  };
}
