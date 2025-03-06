import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { BlogPost, BlogFilter } from "../types/blog";

export const useBlogPosts = (filter: BlogFilter) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        let query = supabase.from("blog_posts").select(
          `
            *,
            tags:blog_posts_tags(
              tag:blog_tags(*)
            )
          `,
          { count: "exact" }
        );

        // Apply filters
        if (filter.search) {
          query = query.textSearch("search_vector", filter.search);
        }

        if (filter.tags?.length) {
          query = query.contains("tags.tag.id", filter.tags);
        }

        if (filter.dateRange?.start) {
          query = query.gte("created_at", filter.dateRange.start.toISOString());
        }

        if (filter.dateRange?.end) {
          query = query.lte("created_at", filter.dateRange.end.toISOString());
        }

        if (filter.status) {
          query = query.eq("status", filter.status);
        }

        // Apply sorting
        switch (filter.sortBy) {
          case "newest":
            query = query.order("created_at", { ascending: false });
            break;
          case "oldest":
            query = query.order("created_at", { ascending: true });
            break;
          case "popular":
            query = query.order("view_count", { ascending: false });
            break;
          default:
            query = query.order("created_at", { ascending: false });
        }

        const { data, error, count } = await query;

        if (error) throw error;

        setPosts(data as BlogPost[]);
        if (count !== null) setTotalCount(count);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filter]);

  return { posts, loading, error, totalCount };
};
