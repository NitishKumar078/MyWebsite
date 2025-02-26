import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

export default function TestBlogPolicies() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<
    Array<{
      test: string;
      result: "success" | "failure";
      message: string;
    }>
  >([]);

  useEffect(() => {
    // Check auth state when component mounts
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const runTests = async () => {
    if (!user) {
      setTestResults([
        {
          test: "Authentication Check",
          result: "failure",
          message: "Please sign in to run tests",
        },
      ]);
      return;
    }

    const results: Array<{
      test: string;
      result: "success" | "failure";
      message: string;
    }> = [];

    // Log user info
    results.push({
      test: "Auth Check",
      result: "success",
      message: `Authenticated as user: ${user.id}`,
    });

    // Test 1: Create a post as authenticated user
    try {
      const postData = {
        title: "Test Post",
        content: "Test Content",
        author_id: user.id,
        status: "draft",
      };

      // Log the data being inserted
      results.push({
        test: "Insert Data Check",
        result: "success",
        message: `Attempting to insert with data: ${JSON.stringify(postData)}`,
      });

      const { data: post, error } = await supabase
        .from("blog_posts")
        .insert(postData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      results.push({
        test: "Create Post",
        result: "success",
        message: `Successfully created post with ID: ${post.id}`,
      });

      // Test 2: Try to read the created post
      const { data: readPost, error: readError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", post.id)
        .single();

      if (readError) throw readError;

      results.push({
        test: "Read Own Post",
        result: "success",
        message: `Successfully read post: ${JSON.stringify(readPost)}`,
      });

      // Test 3: Try to update the post
      const { error: updateError } = await supabase
        .from("blog_posts")
        .update({ title: "Updated Test Post" })
        .eq("id", post.id);

      if (updateError) throw updateError;

      results.push({
        test: "Update Own Post",
        result: "success",
        message: "Successfully updated own post",
      });

      // Clean up: Delete the test post
      const { error: deleteError } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", post.id);

      if (deleteError) {
        results.push({
          test: "Delete Post",
          result: "failure",
          message: `Failed to delete post: ${deleteError.message}`,
        });
      } else {
        results.push({
          test: "Delete Post",
          result: "success",
          message: "Successfully deleted post",
        });
      }
    } catch (error) {
      results.push({
        test: "Policy Test",
        result: "failure",
        message:
          error instanceof Error
            ? `Error: ${error.message}\nDetails: ${JSON.stringify(error)}`
            : "Test failed",
      });
    }

    setTestResults(results);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg">
            Please sign in to test blog policies
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-[800px] mx-auto px-6">
        <h1 className="text-2xl font-bold mb-6">Test Blog Policies</h1>

        <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-lg">
          <p>
            <strong>Current User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <button
          onClick={runTests}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors mb-6"
        >
          Run Tests
        </button>

        <div className="space-y-4">
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                result.result === "success"
                  ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                  : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200"
              }`}
            >
              <h3 className="font-bold mb-2">{result.test}</h3>
              <p className="whitespace-pre-wrap font-mono text-sm">
                {result.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
