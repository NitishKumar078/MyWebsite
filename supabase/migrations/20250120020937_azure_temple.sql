/*
  # Blog Management System Schema

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text)
      - `author_id` (uuid, references auth.users)
      - `status` (enum: draft, published)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `view_count` (int)
    
    - `blog_tags`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamptz)
    
    - `blog_posts_tags`
      - `post_id` (uuid, references blog_posts)
      - `tag_id` (uuid, references blog_tags)
      - Primary key (post_id, tag_id)

  2. Security
    - Enable RLS on all tables
    - Policies for blog_posts:
      - Anyone can read published posts
      - Authors can read/write their own posts
    - Policies for tags:
      - Anyone can read tags
      - Only authenticated users can create tags
    - Policies for posts_tags:
      - Anyone can read
      - Authors can manage their post tags
*/

-- Create post status enum
CREATE TYPE post_status AS ENUM ('draft', 'published');

-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  author_id uuid REFERENCES auth.users NOT NULL,
  status post_status DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  view_count int DEFAULT 0,
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) STORED
);

-- Create blog tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create junction table for posts and tags
CREATE TABLE IF NOT EXISTS blog_posts_tags (
  post_id uuid REFERENCES blog_posts ON DELETE CASCADE,
  tag_id uuid REFERENCES blog_tags ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS blog_posts_author_id_idx ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON blog_posts(status);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS blog_posts_search_idx ON blog_posts USING gin(search_vector);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts_tags ENABLE ROW LEVEL SECURITY;

-- Policies for blog_posts
CREATE POLICY "Anyone can read published posts"
  ON blog_posts
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authors can manage their own posts"
  ON blog_posts
  USING (auth.uid() = author_id);

-- Policies for blog_tags
CREATE POLICY "Anyone can read tags"
  ON blog_tags
  FOR SELECT
  TO PUBLIC;

CREATE POLICY "Authenticated users can create tags"
  ON blog_tags
  FOR INSERT
  TO authenticated;

-- Policies for blog_posts_tags
CREATE POLICY "Anyone can read post tags"
  ON blog_posts_tags
  FOR SELECT
  TO PUBLIC;

CREATE POLICY "Authors can manage their post tags"
  ON blog_posts_tags
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE blog_posts.id = blog_posts_tags.post_id
      AND blog_posts.author_id = auth.uid()
    )
  );

-- Functions
CREATE OR REPLACE FUNCTION increment_view_count(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts
  SET view_count = view_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;