/*
  # Add Insert Policy for Blog Posts

  1. Changes
    - Add policy to allow authenticated users to insert their own posts
*/

-- Add policy for inserting posts
CREATE POLICY "Authors can create their own posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);