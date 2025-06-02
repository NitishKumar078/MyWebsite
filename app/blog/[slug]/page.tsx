import Link from "next/link";

// Dummy function: Replace with your real data fetching logic
async function getBlogPost(slug: string) {
  // Example: fetch from your database or API
  // const res = await fetch(`/api/blog/${slug}`);
  // return await res.json();

  // Placeholder data for demonstration
  if (slug === "example-post") {
    return {
      title: "Example Post",
      created_at: "2024-06-01T12:00:00Z",
      content: "<p>This is an example blog post content.</p>",
    };
  }
  return null;
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params?.slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
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
            created at : {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div
          className="prose dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
