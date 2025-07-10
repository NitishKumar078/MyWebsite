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
