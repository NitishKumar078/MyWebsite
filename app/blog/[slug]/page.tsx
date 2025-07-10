"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useGetPost } from "@/app/hooks/useGetPost";

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : null;
  const { post, loading, error } = useGetPost(slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Error: {error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Something went wrong. <br /> Post not found
          </h1>
          <Link href="/blog" className="text-blue-500 underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-3">
      <div className="mx-5">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-lg font-medium border border-gray-300 hover:border-blue-500 hover:text-blue-500 dark:border-gray-600 dark:hover:border-blue-500 dark:hover:text-blue-500 transition-colors disabled:opacity-50"
          >
            Back
          </Link>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Created at: {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        <div className="space-y-4">
          {post.content.map((block, index) => {
            switch (block.type) {
              case "paragraph":
                return (
                  <p
                    key={index}
                    className="content-paragraph text-base leading-relaxed"
                  >
                    {block.text}
                  </p>
                );

              case "points": {
                const ListTag = block.format === "numbered" ? "ol" : "ul";
                return (
                  <div key={index}>
                    {block.heading && (
                      <h3 className="points-heading text-lg font-semibold mb-2">
                        {block.heading}
                      </h3>
                    )}
                    <ListTag
                      className={`content-points list-inside ${
                        block.format === "numbered"
                          ? "list-decimal"
                          : "list-disc"
                      } pl-4`}
                    >
                      {block.items.map((item, i) => (
                        <li key={i} className="point-item mb-1">
                          {item}
                        </li>
                      ))}
                    </ListTag>
                  </div>
                );
              }

              case "image":
                return (
                  <div key={index} className="image-container my-4">
                    {block.caption ? (
                      <figure className="image-figure">
                        <Image
                          src={block.src}
                          alt={block.alt || block.caption || "Content image"}
                          className="content-image rounded shadow-md"
                          loading="lazy"
                          width={block.width || 600}
                          height={block.height || 400}
                        />
                        <figcaption className="image-caption text-sm text-gray-500 mt-2 text-center">
                          {block.caption}
                        </figcaption>
                      </figure>
                    ) : (
                      <Image
                        src={block.src}
                        alt={block.alt || "Content image"}
                        className="content-image rounded shadow-md"
                        loading="lazy"
                        width={block.width || 600}
                        height={block.height || 400}
                      />
                    )}
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}
