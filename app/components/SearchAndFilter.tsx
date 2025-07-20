"use client";

import { BlogFilter } from "../types/blog";

type SearchMode = "title" | "tags";

const popularTags = ["JavaScript", "Python", "React", "CSS"];

interface SearchAndFilterProps {
  filter: BlogFilter;
  setFilter: (filter: BlogFilter) => void;
}

export default function SearchAndFilter({
  filter,
  setFilter,
}: SearchAndFilterProps) {
  const handleTagClick = (tag: string) => {
    setFilter({ ...filter, search: tag, searchBy: "tags" });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder={`Search by ${filter.searchBy}...`}
          value={filter.search || ""}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className="border rounded-l px-4 py-2 w-full"
        />
        <div className="relative">
          <select
            value={filter.searchBy}
            onChange={(e) =>
              setFilter({ ...filter, searchBy: e.target.value as SearchMode })
            }
            className="border-t border-b border-r rounded-r px-4 py-2 appearance-none bg-white"
          >
            <option value="title">Title</option>
            <option value="tags">Tags</option>
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span>Popular Tags:</span>
        {popularTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter.search === tag && filter.searchBy === "tags"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
