import { useState, useEffect } from "react";
import { supabase } from "@/app/SupaBase/serverCli";
import { BlogPost } from "../types/blog";

/**
 * Custom hook to fetch a single blog post by its ID.
 * @param postId The ID of the post to fetch.
 * @returns An object containing the post, loading state, and error state.
 */
export const useGetPost = (postId: string | null) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("Post")
          .select("id,title,created_at,tags,content")
          .eq("id", postId)
          .single();

        if (fetchError) {
          throw fetchError;
        }
        console.log(`Fetched post with id ${postId}:`, data);
        setPost(data);
      } catch (err) {
        console.error(`Error fetching post with id ${postId}:`, err);
        setError(err instanceof Error ? err.message : "Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, loading, error };
};
