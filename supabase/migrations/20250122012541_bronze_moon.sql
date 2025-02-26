/*
  # Add missing blog policies

  1. Changes
    - Add UPDATE policy for blog_posts
    - Add DELETE policy for blog_posts

  2. Security
    - Authors can update their own posts
    - Authors can delete their own posts
*/

-- Add policy for updating posts
CREATE POLICY "Authors can update their own posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Add policy for deleting posts
CREATE POLICY "Authors can delete their own posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);