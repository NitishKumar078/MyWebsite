/*
  # Add read-only policies for blog system

  1. Security Updates
    - Modify existing policies to be more restrictive
    - Add read-only policies for non-author users
    - Ensure proper access control for drafts

  2. Changes
    - Add policies to blog_posts table
    - Add policies to blog_tags table
    - Add policies to blog_posts_tags table
*/

-- Policies for blog_posts
CREATE POLICY "Authors can read all posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = author_id OR
    status = 'published'
  );

-- Policies for blog_tags
CREATE POLICY "Only authors can create tags"
  ON blog_tags
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE blog_posts.author_id = auth.uid()
    )
  );

-- Additional read-only policy for blog_posts_tags
CREATE POLICY "Read-only access for non-authors"
  ON blog_posts_tags
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE blog_posts.id = blog_posts_tags.post_id
      AND (blog_posts.status = 'published' OR blog_posts.author_id = auth.uid())
    )
  );