import { useState } from "react";
import {
  Search,
  Calendar,
  Tag as TagIcon,
  SlidersHorizontal,
} from "lucide-react";
import { BlogFilter } from "../types/blog";
import { useBlogPosts } from "../hooks/useBlogPosts";

export default function Blog() {
  const [filter, setFilter] = useState<BlogFilter>({
    sortBy: "newest",
  });
  const { posts, loading, error } = useBlogPosts(filter);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={filter.search || ""}
                onChange={(e) =>
                  setFilter({ ...filter, search: e.target.value || undefined })
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
      </div>
    </div>
  );
}
