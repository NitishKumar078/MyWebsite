import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Tag as TagIcon,
  SlidersHorizontal,
} from "lucide-react";
import { BlogFilter, BlogPost } from "../types/blog";
import { useBlogPosts } from "../hooks/useBlogPosts";
import BlogEditor from "../components/BlogEditor";
import Auth from "../components/Auth";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

export default function Blog() {
  const [filter, setFilter] = useState<BlogFilter>({
    sortBy: "newest",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { posts, loading, error, totalCount } = useBlogPosts(filter);

  useEffect(() => {
    // Check current auth status
    supabase.auth.getUser().then(({ data: { user } }) => {
      return setUser(user || null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSave = async (postData: Partial<BlogPost>) => {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("Please sign in to create or edit posts");
      }

      // Validate required fields
      if (!postData.title?.trim()) {
        throw new Error("Title is required");
      }

      if (!postData.content?.trim()) {
        throw new Error("Content is required");
      }

      const postToSave = {
        title: postData.title.trim(),
        content: postData.content.trim(),
        excerpt: postData.content.slice(0, 200).trim(),
        author_id: user.id,
        status: postData.status || "draft",
        published_at:
          postData.status === "published" ? new Date().toISOString() : null,
      };

      let response;

      if (postData.id) {
        // Update existing post
        response = await supabase
          .from("blog_posts")
          .update({
            ...postToSave,
            updated_at: new Date().toISOString(),
          })
          .eq("id", postData.id)
          .select()
          .single();
      } else {
        // Create new post
        response = await supabase
          .from("blog_posts")
          .insert({
            ...postToSave,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();
      }

      if (response.error) {
        console.error("Database error:", response.error);
        throw new Error(response.error.message);
      }

      if (!response.data) {
        throw new Error("No data returned from database");
      }

      // Handle tags if provided
      if (postData.tags?.length && response.data.id) {
        // First, remove existing tags
        if (postData.id) {
          const { error: deleteError } = await supabase
            .from("blog_posts_tags")
            .delete()
            .eq("post_id", response.data.id);

          if (deleteError) {
            console.error("Error deleting existing tags:", deleteError);
          }
        }

        // Then insert new tags
        const tagsToInsert = postData.tags.map((tag) => ({
          post_id: response.data.id,
          tag_id: tag.id,
        }));

        const { error: tagError } = await supabase
          .from("blog_posts_tags")
          .insert(tagsToInsert);

        if (tagError) {
          console.error("Error inserting tags:", tagError);
        }
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving post:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to save post. Please try again."
      );
    }
  };

  // Show auth component if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <Auth />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {isEditing ? (
          <BlogEditor
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold">Blog</h1>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                New Post
              </button>
            </div>

            <div className="mb-8 space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={filter.search}
                    onChange={(e) =>
                      setFilter({ ...filter, search: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                  />
                </div>

                <button
                  onClick={() => {
                    /* Toggle filter panel */
                  }}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-4">
                <select
                  value={filter.sortBy}
                  onChange={(e) =>
                    setFilter({ ...filter, sortBy: e.target.value as any })
                  }
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <div className="grid gap-6">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:border-primary transition-all duration-300"
                  >
                    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <TagIcon className="w-4 h-4" />
                        {post.tags?.length || 0} tags
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {post.excerpt || post.content.slice(0, 200)}...
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="text-primary hover:underline">
                        Read More
                      </button>
                      {post.status === "draft" && (
                        <span className="px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                          Draft
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
