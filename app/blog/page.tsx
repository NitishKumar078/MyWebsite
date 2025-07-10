"use client";
import { useState } from "react";
import { Calendar, Tag as TagIcon } from "lucide-react";
import { BlogFilter, BlogPost } from "../types/blog";
import { useBlogPosts } from "../hooks/useBlogPosts";
import { useRouter } from "next/navigation";
import SearchAndFilter from "../components/SearchAndFilter";

export default function Blog() {
  const router = useRouter();

  const [filter, setFilter] = useState<BlogFilter>({
    sortBy: "newest",
    searchBy: "title",
  });
  const { posts, loading, error } = useBlogPosts(filter);

  const handleNavigation = (data: BlogPost) => {
    router.push(`/blog/${data.id}`);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-8 space-y-4">
          <SearchAndFilter filter={filter} setFilter={setFilter} />
          <div className="flex flex-wrap gap-4">
            <select
              value={filter.sortBy || ""}
              onChange={(e) => {
                const value = e.target.value;
                setFilter({
                  ...filter,
                  sortBy:
                    value === ""
                      ? undefined
                      : (value as "newest" | "oldest" | "popular"),
                });
              }}
              className="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-slate-900 border-blue-500 backdrop-blur-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
              <option value="">All</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post, index) => (
              <article
                key={index}
                className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:border-primary transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>created on :</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <TagIcon className="w-4 h-4" />
                    {JSON.parse(post?.tags || "[]").length || 0} tags
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="text-primary hover:underline"
                    onClick={() => handleNavigation(post)}
                  >
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
