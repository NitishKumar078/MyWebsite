import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/app/SupaBase/serverCli";
import { BlogPost, BlogFilter } from "../types/blog";

// Global cache for blog posts
let allPosts: BlogPost[] = [];
let hasFetched = false;

const fetchAllPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("Post")
    .select("id,title,created_at,tags,content");

  if (error) throw error;
  return data || [];
};

/**
 * A pure function to filter an array of blog posts based on filter criteria.
 */
const applyFilters = (posts: BlogPost[], filter: BlogFilter): BlogPost[] => {
  let filtered = [...posts];

  if (!filter) return filtered;

  // Filter by search
  if (filter.search) {
    const term = filter.search.toLowerCase();
    filtered = filtered.filter((post) =>
      filter.searchBy === "tags"
        ? post.tags?.toLowerCase().includes(term)
        : post.title.toLowerCase().includes(term)
    );
  }

  // Sort
  if (filter.sortBy) {
    filtered.sort((a, b) => {
      switch (filter.sortBy) {
        case "newest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "popular":
          return (
            (b.tags?.split(",").length || 0) - (a.tags?.split(",").length || 0)
          );
        default:
          return 0;
      }
    });
  }

  return filtered;
};

/**
 * Custom hook to fetch blog posts only once and apply filters locally.
 */
export const useBlogPosts = (filter: BlogFilter) => {
  const [allData, setAllData] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!hasFetched) {
          const fetched = await fetchAllPosts();
          allPosts = fetched;
          hasFetched = true;
        }
        setAllData(allPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = useMemo(
    () => applyFilters(allData, filter),
    [filter, allData]
  );

  return {
    posts: filteredPosts,
    totalCount: filteredPosts.length,
    loading,
    error,
  };
};
