/*
  # Add sector field to comments

  1. Changes
    - Add `sector` column to `comments` table
    - Update the `comments_with_stats` view to include the new column
    - Maintain all existing data and functionality

  2. Security
    - No changes to RLS policies needed
    - Existing policies will work with the new column
*/

-- Add sector column to comments table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'comments' AND column_name = 'sector'
  ) THEN
    ALTER TABLE comments ADD COLUMN sector text DEFAULT 'ciudadano';
  END IF;
END $$;

-- Update the comments_with_stats view to include the sector column
DROP VIEW IF EXISTS comments_with_stats;

CREATE VIEW comments_with_stats AS
SELECT 
  c.id,
  c.law_id,
  c.article_id,
  c.author_name,
  c.author_email,
  c.content,
  c.is_general,
  c.is_expert,
  c.is_highlighted,
  c.tags,
  c.sector,
  c.created_at,
  c.updated_at,
  COALESCE(like_counts.like_count, 0) as like_count,
  COALESCE(reply_counts.reply_count, 0) as reply_count
FROM comments c
LEFT JOIN (
  SELECT comment_id, COUNT(*) as like_count
  FROM comment_likes
  GROUP BY comment_id
) like_counts ON c.id = like_counts.comment_id
LEFT JOIN (
  SELECT comment_id, COUNT(*) as reply_count
  FROM comment_replies
  GROUP BY comment_id
) reply_counts ON c.id = reply_counts.comment_id;