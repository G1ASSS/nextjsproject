-- Add category_id foreign key to blogs table
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_category_id ON blogs(category_id);

-- Update existing blogs to have default categories (optional)
UPDATE blogs 
SET category_id = (
  SELECT id FROM categories 
  WHERE slug = CASE 
    WHEN LOWER(category) LIKE '%html%' THEN 'html'
    WHEN LOWER(category) LIKE '%css%' THEN 'css'
    WHEN LOWER(category) LIKE '%javascript%' OR LOWER(category) LIKE '%js%' THEN 'javascript'
    WHEN LOWER(category) LIKE '%react%' THEN 'react'
    WHEN LOWER(category) LIKE '%nextjs%' OR LOWER(category) LIKE '%next.js%' THEN 'nextjs'
    WHEN LOWER(category) LIKE '%typescript%' OR LOWER(category) LIKE '%ts%' THEN 'typescript'
    WHEN LOWER(category) LIKE '%security%' THEN 'security'
    WHEN LOWER(category) LIKE '%devops%' THEN 'devops'
    WHEN LOWER(category) LIKE '%database%' OR LOWER(category) LIKE '%sql%' THEN 'database'
    WHEN LOWER(category) LIKE '%api%' THEN 'api'
    ELSE 'javascript' -- default category
  END
  LIMIT 1
)
WHERE category_id IS NULL AND category IS NOT NULL;
